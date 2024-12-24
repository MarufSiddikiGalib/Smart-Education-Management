import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
import * as sgMail from '@sendgrid/mail';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '../auth.guard';
import { Student } from '../entity/student.entity';



@Injectable()
export class UserService {

  private tokenBlacklist: Set<string> = new Set(); 

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
     
    private jwtService: JwtService, // Repository for database operations

     @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  // Parent Signup Logic 
  async signup(data: any) {
    const { email, password, name, phoneNumber, studentId } = data;


   // Check if the student exists
   const student = await this.studentRepository.findOne({ where: { id: studentId } });
   if (!student) {
     throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
   }
  
    // Check if email is already registered
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user and save it to the database
    const newUser = this.userRepository.create({
      email,
      password: hashedPassword,
      name,
      phoneNumber,
      role: 'parent', 
      child:student,
    });

    return this.userRepository.save(newUser);
  }

  // Parent Login Logic
  async login(data: any) {
    const { email, password } = data;

    // Find the user by email
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user || user.role !== 'parent') {
      throw new HttpException('Invalid user', HttpStatus.UNAUTHORIZED);
    }

    // Validate the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new HttpException('Invalid information', HttpStatus.UNAUTHORIZED);
    }



    //JWT token
    const token = this.jwtService.sign({ userId: user.id }, { secret: 'mySuperSecretKey123!@#', expiresIn: '1h' });

    return { message: 'Login successful', user: { id: user.id, name: user.name, token:token } };
  }


//logout
async logout(token: string): Promise<{ message: string }> {
  if (this.tokenBlacklist.has(token)) {
    throw new Error('Token already invalidated');
  }

  
  this.tokenBlacklist.add(token);
  return { message: 'Logout successful' };
}


isTokenBlacklisted(token: string): boolean {
  return this.tokenBlacklist.has(token);
}
  





    // //Generate and send OTP
    // async sendOtp(email: string) {
    // // Check if the user exists
    // const user = await this.userRepository.findOne({ where: { email } });
    // if (!user) {
    //   throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    // }



      async sendOtp(email: string) {
      // Check if the user exists
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }




    //Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // OTP expires in 5 minutes

    // Update user with OTP and expiration
    user.otp = otp;
    user.otpExpiresAt = otpExpiresAt;
    await this.userRepository.save(user);

    // Configure the mail transporter
    // const transporter = nodemailer.createTransport({
    //   service: 'gmail', // Use your email provider
    //   auth: {
    //     user: 'noreply06969@gmail.com', // Replace with your email
    //     pass: '', // Replace with your email password or app password
    //   },
    // });




    // const transporter = nodemailer.createTransport({
    //   host: "", // SMTP host
    //   port: , // SMTP port
    //   secure: false, // Use TLS
    //   auth: {
    //     user: 'noreply06969@gmail.com', // Your email address
    //     pass: '', // Your app password
    //   },
    // });






    //Send the OTP email
    // await transporter.sendMail({
    //   from: 'noreply06969@gmail.com', // Sender address
    //   to: email, // Receiver's email
    //   subject: 'Your OTP Code', // Subject line
    //   text: `Your OTP code is ${otp}. It will expire in 5 minutes.`, // Email content
    // });



    sgMail.setApiKey('your-sendgrid-api-key');
    await sgMail.send({
      to: email,
      from: 'noreply06969@gmail.com',
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
    });



    return { message: 'OTP sent to your email' };
  }

  // Verify OTP
   async verifyOtp(email: string, otp: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (user.otp !== otp) {
      throw new HttpException('Invalid OTP', HttpStatus.UNAUTHORIZED);
    }

    if (user.otpExpiresAt < new Date()) {
      throw new HttpException('OTP expired', HttpStatus.BAD_REQUEST);
    }

    // OTP is valid, clear it from the database
    user.otp = null;
    user.otpExpiresAt = null;
    await this.userRepository.save(user);

    return { message: 'OTP verified successfully' };
  }



    
}
