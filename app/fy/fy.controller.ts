import { Controller, Get, Query, Req } from '@nestjs/common';
import { FyInfoReq } from 'lib/entity/request/fyReq';
import { UsualRes } from '../../lib/entity/response/usualRes';
import { FyService } from './fy.service';

@Controller('fy')
export class FyController {
    constructor(
        private readonly fyService: FyService,
    ) { }

    @Get('getFyInfo')
    public async getFyInfo(@Req() req: { query: FyInfoReq }): Promise<UsualRes<Array<any>>> {
        const fyInfo = await this.fyService.getFyInfo(req.query.page, req.query, req.query.sort);
        return new UsualRes(0, 'success', fyInfo);
    }

    @Get('getFyInfoById')
    public async getFyInfoById(@Query('id') id: string): Promise<UsualRes<any>> {
        const fyInfo = await this.fyService.getFyInfoById(id);
        return new UsualRes(0, 'success', fyInfo);
    }
}
