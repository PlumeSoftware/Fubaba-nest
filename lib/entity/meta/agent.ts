import { Entity, Column, BaseEntity, PrimaryColumn, Generated } from "typeorm"

@Entity({ name: "SYS_USER" })
export class Agent extends BaseEntity {
    @PrimaryColumn({type:'int',name:'USER_ID',comment:'经纪人id'})
    userId: number
    @Column({type:'varchar',name:'REAL_NAME',comment:'经纪人真实姓名'})
    realName: string
    @Column({type:'char',name:'TEL',comment:'经纪人电话'})
    agentTel: string
    @Column({type:'int',name:'STATUS',comment:'经纪人状态，0--正常'})
    status: number
    @Column({type:'nvarchar',name:'photo',comment:'经纪人照片1'})
    avatar: string
    @Column({type:'nvarchar',name:'photo2',comment:'经纪人二维码'})
    agentQr: string
}