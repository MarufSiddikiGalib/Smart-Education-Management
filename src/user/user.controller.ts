import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth.guard';
import { Req, HttpException, HttpStatus } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';

@Controller('user') // Base route for this controller
export class UserController {
  constructor(private readonly userService: UserService,
    private readonly jwtService: JwtService,) {}

  // Endpoint for Parent Signup
  @Post('signup')
  async signup(@Body() body: any) {
    // Call the signup method in UserService
    return this.userService.signup(body);
  }

  // Endpoint for Parent Login
  @Post('login')
  async login(@Body() body: any) {
    // Call the login method in UserService
    return this.userService.login(body);
  }




  // @Post('login')
  // async login(@Body() body: { email: string; password: string }) {
  //   const { email, password } = body;
  // }

 //Endpoint to Send OTP
 @Post('send-otp')
 async sendOtp(@Body('email') email: string) {
   return this.userService.sendOtp(email);
 }

 // Endpoint to Verify OTP
 @Post('verify-otp')
 async verifyOtp(@Body() body: any) {
   const { email, otp } = body;
   return this.userService.verifyOtp(email, otp);
 }


 @UseGuards(AuthGuard) // Protect with AuthGuard
 @Post('protected-endpoint')
 async protectedEndpoint(@Req() req: Request) {
   const user = req['user']; // User details from the token
   return { message: `Hello ${user.name}, you are authenticated!` };
 }



 @UseGuards(AuthGuard) // Ensure only authenticated users can log out
 @Post('logout')
 async logout(@Req() req: Request): Promise<{ message: string }> {
  const authHeader = req.headers['authorization'];
   
  if (!authHeader) {
    throw new HttpException('Authorization header is missing', HttpStatus.UNAUTHORIZED);
  }

  const token = authHeader.split(' ')[1]; // Extract the token after "Bearer"
  if (!token) {
    throw new HttpException('Token is missing in Authorization header', HttpStatus.UNAUTHORIZED);
  }

  return await this.userService.logout(token);
 }

 
}



  

