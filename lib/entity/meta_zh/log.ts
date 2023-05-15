import { Entity, Column, BaseEntity, PrimaryColumn, Generated } from "typeorm"

@Entity({ database: "zh_erp", name: "log" })//访问以及操作日志
export class Log extends BaseEntity {
    @PrimaryColumn({ type: 'int', name: "log_id" })//主键注解
    @Generated('increment')
    logId: number

    @Column({ type: 'datetime', name: 'create_time', })
    createtime: Date

    @Column({ type: 'varchar', name: 'create_by', comment: '用户openid或者管理员的sysid', nullable: true })
    createby: string

    @Column({ type: 'varchar', name: 'method', length: 6 })
    method: 'GET' | 'POST' | 'PUT' | 'DELETE'

    @Column({ type: 'varchar', name: 'path', length: 64, comment: '访问的路径' })
    path: string

}