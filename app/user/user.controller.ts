import { Controller, Get, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) { }
    @Get('login')
    public async login(@Query() query: { code: string }): Promise<any> {
        return this.userService.login(query.code);
    }
}
