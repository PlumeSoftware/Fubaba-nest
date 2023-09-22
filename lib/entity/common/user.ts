import { Entity, Column, BaseEntity, PrimaryColumn, Generated, AfterLoad } from "typeorm"

@Entity({ database: "fbb_cp", name: "fubaba_user" })//访问以及操作日志
export class FubabaUser extends BaseEntity {
    @PrimaryColumn({ type: 'varchar', name: "fb_user_id" })//主键注解
    userId: string
    @Column({ type: 'varchar', name: 'wx_openid' })
    openid: string
    @Column({ type: 'varchar', name: 'unionid' })
    unionid: string
    @Column({ type: 'varchar', name: 'phone' })
    phone: string
    @Column({ type: 'varchar', name: 'agent_user_id', comment: '绑定的经纪人id' })
    agentId: number
    @Column({ type: 'varchar', name: 'city', comment: '绑定的经纪人所在城市' })
    agentCity: string
    @Column({ type: 'int', name: 'question_flag', comment: '拉黑标志，0为不拉黑' })
    questionFlag: number
    @AfterLoad()
    trim() {
        this.phone = this.phone?.replaceAll(' ', '');
        this.agentId = Number(this.agentId)
    }
}