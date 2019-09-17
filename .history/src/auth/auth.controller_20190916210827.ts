import { Controller, Post } from '@nestjs/common';
import { UserService } from '../shared/user.service';

@Controller('auth')
export class AuthController {

    constructor(
        private userServicce: UserService,
    ) {}

    @Post('login')
    login(loginDto: any) {
        return this.userServicce.findByLogin(loginDto);
    }

    @Post('register')
    register(createDto: any) {
        return this.userServicce.create(createDto);
    }
}
