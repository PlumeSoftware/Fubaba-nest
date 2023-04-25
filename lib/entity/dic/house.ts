import { Entity, Column, BaseEntity, PrimaryColumn, Generated } from "typeorm"

@Entity({ name: "FY_JIEGOU" })
export class HouseConstruction extends BaseEntity {
    @PrimaryColumn({ type: 'int', name: 'id', comment: '结构id' })
    constructionId: number
    @Column({ type: 'int', name: 'jiegou_no', comment: '结构' })
    constructionNo: number
    @Column({ type: 'varchar', name: 'jiegou', comment: '结构名称' })
    construction: string
}

@Entity({ name: "FY_TYPE" })
export class HouseType extends BaseEntity {
    @PrimaryColumn({ type: 'int', name: 'id', comment: '类型id' })
    typeId: number
    @Column({ type: 'varchar', name: 'house_type', comment: '房源类型名称' })
    type: string
}

@Entity({ name: "FY_YONGTU" })
export class HouseUsage extends BaseEntity {
    @PrimaryColumn({ type: 'smallint', name: 'HERP_USAGE', comment: '用途id' }) usageId: number
    @Column({ type: 'int', name: 'yongtu_no', comment: '用途' }) usageNo: number
    @Column({ type: 'varchar', name: 'yongtu', comment: '用途名称' }) usage: string
}

@Entity({ name: "FY_ZHUANGXIU" })
export class HouseFitment extends BaseEntity {
    @PrimaryColumn({ type: 'smallint', name: 'HERP_FITMENT', comment: '装修id' })
    fitmentId: number
    @Column({ type: 'int', name: 'zhuangxiu_no', comment: '装修' })
    fitmentNo: number
    @Column({ type: 'char', name: 'zhuangxiu', comment: '装修名称' })
    fitment: string
}

// @Entity({ name: "FY_HUXING" })
// export class HouseType extends BaseEntity {

// }

@Entity({ name: "FY_CHAOXIANG" })
export class HouseExpose extends BaseEntity {
    @Column({ type: 'smallint', name: 'HERP_EXPOSE', comment: '朝向id' })
    exposeId: number
    @Column({ type: 'int', name: 'chaoxiang_no', comment: '朝向' })
    exposeNo: number
    @Column({ type: 'varchar', name: 'chaoxiang', comment: '朝向名称' })
    expose: string
}