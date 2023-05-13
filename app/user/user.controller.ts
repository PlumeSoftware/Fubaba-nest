import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) { }
    @Get('login')
    public async login(@Param() code: string): Promise<any> {
        this.userService.login(code);
    }
}
