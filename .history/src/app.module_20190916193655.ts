import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './shared/user.service';
import { SharedModule } from './shared/shared/shared.module';
import { SharedModule } from './shared/shared.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [SharedModule, AuthModule],
  controllers: [AppController, AuthController],
  providers: [AppService, UserService],
})
export class AppModule {}
