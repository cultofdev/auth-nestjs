import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/types/user';

@Injectable()
export class UserService {

    constructor(@InjectModel('User') private userModel: Model<User>) {}

    private sanitize(user: User) {
        return user.depopulate('password');
    }

    create(userDto: any) {
        
    }

    findByLogin(userDto: any) {

    }
}
