import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { cacheSql, recordSheet } from '../../lib/tools/cache';
import { Observable } from 'rxjs';
import { LogService } from '../../ops/log/log.service';
import path from 'path';
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly logService: LogService
    ) { }
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const { method, headers, route } = context.switchToHttp().getRequest();

        return true;
    }
}