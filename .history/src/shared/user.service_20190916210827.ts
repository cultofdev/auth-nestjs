import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../auth/types/user';
import { LoginDto, RegisterDto } from '../auth/dto/auth.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

    constructor(@InjectModel('User') private userModel: Model<User>) {}

    private sanitize(user: User) {
        const sanitized = user.toObject();
        delete sanitized['password'];
        return sanitized;
        // return user.depopulate('password');
    }

    async create(createDto: RegisterDto) {
        const {username} = createDto;
        const user = await this.userModel.findOne({username});

        if(user) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }

        const createdUser = new this.userModel(createDto);
        await createdUser.save();
        return this.sanitize(createdUser);
    }

    async findByLogin(loginDto: LoginDto) {
        const {username, password} = loginDto;
        const user = await this.userModel.findOne({username});

        if(!user) {
            throw new HttpException('Invalid Credentials!', HttpStatus.UNAUTHORIZED);
        }

        if(await bcrypt.compare(password, user.password)) {
            return this.sanitize(user);
        } else {
            throw new HttpException('Invalid Credentials!', HttpStatus.UNAUTHORIZED);
        }
    }
}
