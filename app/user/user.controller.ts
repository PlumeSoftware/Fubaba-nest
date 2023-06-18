import { Controller, Get, Headers, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) { }
    @Get('login')
    public async login(@Query() query: { code: string }, @Headers() header: { city: string }): Promise<any> {
        return this.userService.login(header.city, query.code);
    }
}
