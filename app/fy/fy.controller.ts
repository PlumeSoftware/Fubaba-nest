import { Controller } from '@nestjs/common';
import { FyService } from './fy.service';

@Controller('fy')
export class FyController {
    constructor(
        private readonly fyService:FyService,
    ){}
}
