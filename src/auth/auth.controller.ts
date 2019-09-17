import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { UserService } from '../shared/user.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(
        private userServicce: UserService,
        private authService: AuthService,
    ) {}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    auth() {
        return 'AUTH WORKS!!';
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        const user = await this.userServicce.findByLogin(loginDto);

        const payload = {
            username: user.username,
            password: user.password,
        };

        const token = await this.authService.signPayload(payload);
        return { user, token };
    }

    @Post('register')
    async register(@Body() createDto: RegisterDto) {
        const user = await this.userServicce.create(createDto);

        const payload = {
            username: user.username,
            password: user.password,
        };

        const token = await this.authService.signPayload(payload);
        return { user, token };
    }
}
