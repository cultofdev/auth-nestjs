import { Controller } from '@nestjs/common';
import { UserService } from 'src/shared/user.service';

@Controller('auth')
export class AuthController {

    constructor(
        private userServicce: UserService,
    ) {}

    
}
