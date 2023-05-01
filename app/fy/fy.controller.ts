import { Controller, Get, Query } from '@nestjs/common';
// import { Fy } from 'lib/entity/response/fyRes';
import { UsualRes } from '../../lib/entity/response/usualRes';
import { FyService } from './fy.service';

@Controller('fy')
export class FyController {
    constructor(
        private readonly fyService: FyService,
    ) { }

    @Get('getFyInfo')
    public async getFyInfo(@Query('page') page: number): Promise<UsualRes<Array<any>>> {
        const fyInfo = await this.fyService.getFyInfo(page);
        return new UsualRes(0, 'success',fyInfo);
    }

    @Get('getFyInfoById')
    public async getFyInfoById(@Query('id') id: string): Promise<UsualRes<any>> {
        const fyInfo = await this.fyService.getFyInfoById(id);
        return new UsualRes(0, 'success',fyInfo);
    }
}
