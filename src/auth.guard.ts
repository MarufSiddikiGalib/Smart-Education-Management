import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user/user.service';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  // async canActivate(context: ExecutionContext): Promise<boolean> {
  //   const request = context.switchToHttp().getRequest();
  //   const { url } = request;


  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'];
    const { url } = request;

    if (!authHeader) {
      throw new HttpException('Authorization header is missing', HttpStatus.UNAUTHORIZED);
    }

    const token = authHeader.split(' ')[1];


    // Allow public routes
    if (url.includes('login') || url.includes('signup')) {
      return true;
    }

   //   const authHeader = request.headers.authorization;

   //   if (!authHeader || !authHeader.startsWith('Bearer ')) {
   //     throw new UnauthorizedException('Unauthorized: No token provided');
   //   }

    //    if (!authHeader.startsWith('Bearer ')) {
   //     throw new UnauthorizedException('Unauthorized: Invalid token format');
   //   }

    
   


   //   // Check if token is blacklisted
   //   if (this.userService.isTokenBlacklisted(token)) {
   //   throw new HttpException('Unauthorized: Token is invalidated', HttpStatus.UNAUTHORIZED);
   // }


    try {
      // Verify the token using the secret key
      const decoded = this.jwtService.verify(token, {
        secret: 'mySuperSecretKey123!@#' // Ensure this matches in JwtModule configuration
      });

      request['user'] = decoded; // Attach decoded token to the request object
      return true; // Grant access
    } catch (error) {
      throw new HttpException('Invalid or expired token', HttpStatus.UNAUTHORIZED);
    }
  }
}

