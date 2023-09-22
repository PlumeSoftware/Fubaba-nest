import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Fy } from '../../lib/entity/common/fy';
import { House } from 'lib/entity/common/house';
import { Equal, FindManyOptions, FindOptionsWhere, In, Repository } from 'typeorm';
import { Agent } from "lib/entity/common/agent";

@Injectable()
export class AgentRepository {
    constructor(
        @InjectRepository(Agent, "fmj")
        private readonly agentRepository: Repository<Agent>,
    ) { }

    //参数为字符串，允许的值为Object.keys(this)
    private use<T = any>(city: string, entity: new () => T) {
        switch (city) {
            case 'dl':
                city = 'fmj'
                break;
            case 'zh':
                city = 'zh_erp'
                break;
            default:
                break;
        }
        const targetRepository = Object.keys(this)
            .filter(repositoryName => String(this[repositoryName].target).split(" ")[1] === entity.name)
            .find(repositoryName => String(this[repositoryName].manager.connection.name) === city)
        return this[targetRepository]
    }

    public async find<T = any>(city: string, entity: new () => T, options?: FindManyOptions<T>) {
        return await this.use(city, entity).find(options)
    }
    public async insert<T = any>(city: string, entity: new () => T, data: T) {
        return await this.use(city, entity).insert(data)
    }
    public async update<T = any>(city: string, entity: new () => T, ...args: any[]) {
        return await this.use(city, entity).update(...args)
    }
    public async delete<T = any>(city: string, entity: new () => T, data: FindOptionsWhere<Fy>) {
        return await this.use(city, entity).delete(data)
    }
}