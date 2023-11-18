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
    private use<T = any>(entity: new () => T) {
      
        const targetRepository = Object.keys(this)
            .find(repositoryName => String(this[repositoryName].target).split(" ")[1] === entity.name)

        return this[targetRepository]
    }

    public async find<T = any>(entity: new () => T, options?: FindManyOptions<T>) {
        return await this.use(entity).find(options)
    }
    public async insert<T = any>(entity: new () => T, data: T) {
        return await this.use(entity).insert(data)
    }
    public async update<T = any>(entity: new () => T, ...args: any[]) {
        return await this.use(entity).update(...args)
    }
    public async delete<T = any>(entity: new () => T, data: FindOptionsWhere<Fy>) {
        return await this.use(entity).delete(data)
    }
}