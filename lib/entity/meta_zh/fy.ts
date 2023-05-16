import { Entity, Column, BaseEntity, PrimaryColumn, Generated } from "typeorm"

@Entity({ database: "zh_erp", name: "FY_REQOUT" })
export class Fy extends BaseEntity {
    @PrimaryColumn({ type: 'varchar', name: 'REQ_ID', comment: '主键，查询唯一id' })
    reqId: string
    @Column({ type: 'int', name: 'REQ_TYPE', comment: '出售类型，1--二手房，0--租房' })
    reqType: number
    @Column({ type: 'int', name: 'REQ_HUS_ID', comment: '房源id，用于匹配房源信息' })
    reqHusId: number
    @Column({ type: 'money', name: 'REQ_AMT', comment: '房源单价' })
    reqAmt: number
    @Column({ type: 'money', name: 'REQ_AMT2', comment: '租房价格' })
    reqAmt2: number
    @Column({ type: 'varchar', name: 'REQ_EMP_CODE', comment: '经纪人id' })
    agentId: number
    @Column({ type: 'int', name: 'REQ_STATUS', comment: '出售信息状态，0--可用' })
    reqStatus: number
    @Column({ type: 'money', name: 'REQ_AMT3', comment: '房源总价' })
    reqAmt3: number
    @Column({ type: 'varchar', name: 'VR_FLAG', comment: '是否存在vr，1--存在' })
    vrFlag: string
    @Column({ type: 'datetime', name: 'REQ_NEW_DATE', comment: '发布时间' })
    releaseTime: Date
    @Column({ type: 'nchar', name: 'ad_remark', comment: '房评备注' })
    remark: string
}