import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';  // Your controller
import { UserService } from './user.service';       // Your service
import { User } from './user.entity';               // Your entity (replace `Photo` with `User`)
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../auth.guard';
import { Student } from '../entity/student.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User,Student]), // Import the User entity for database operations
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'Smart Education Management System',
      entities: [
        __dirname + '/../**/*.entity{.ts,.js}', // Automatically load all entity files
      ],
      synchronize: true, // Make sure this is true to sync the database schema
    }),



    JwtModule.register({
      secret: 'mySuperSecretKey123!@#', // Ensure this matches everywhere
      signOptions: { expiresIn: '1h' },
    }),

  ],
  controllers: [UserController], 
  providers: [UserService,AuthGuard ],     
  exports: [UserService],
})
export class UserModule {}
