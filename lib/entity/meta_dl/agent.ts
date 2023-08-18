import { Entity, Column, BaseEntity, PrimaryColumn, Generated, AfterLoad } from "typeorm"

@Entity({ database: "fmj", name: "SYS_USER" })
export class Agent extends BaseEntity {
    @PrimaryColumn({ type: 'int', name: 'USER_ID', comment: '经纪人id' })
    agentId: number
    @Column({ type: 'varchar', name: 'REAL_NAME', comment: '经纪人真实姓名' })
    realName: string
    @Column({ type: 'char', name: 'TEL', comment: '经纪人电话' })
    agentTel: string
    @Column({ type: 'int', name: 'STATUS', comment: '经纪人状态，0--正常' })
    status: number
    @Column({ type: 'nvarchar', name: 'photo', comment: '经纪人照片1' })
    avatar: string
    @Column({ type: 'nvarchar', name: 'photo2', comment: '经纪人二维码' })
    agentQr: string
    agentInnerTel: string
    @AfterLoad()
    trim() {
        const agentTel = this.agentTel?.replaceAll(' ', '').slice(0, 11);
        const agentInnerTel = this.agentTel?.replaceAll(' ', '').slice(12, 16)

        this.agentTel = agentTel
        this.agentInnerTel = agentInnerTel
        
        if (this.agentInnerTel === '') {
            this.agentInnerTel = null
        }
    }
}