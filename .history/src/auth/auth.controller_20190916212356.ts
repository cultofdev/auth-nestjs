import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from '../shared/user.service';

@Controller('auth')
export class AuthController {

    constructor(
        private userServicce: UserService,
    ) {}

    @Post('login')
    login(@Body() loginDto: any) {
        return this.userServicce.findByLogin(loginDto);
    }

    @Post('register')
    register(@Body() createDto: any) {
        return this.userServicce.create(createDto);
    }
}
