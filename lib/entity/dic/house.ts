import { Entity, Column, BaseEntity, PrimaryColumn, AfterLoad } from "typeorm"
import { ConfigService } from '@nestjs/config';

@Entity({ database: "fbb", name: "FY_JIEGOU" })
export class HouseConstruction extends BaseEntity {
    @PrimaryColumn({ type: 'int', name: 'id', comment: '结构id' })
    constructionId: number
    @Column({ type: 'int', name: 'jiegou_no', comment: '结构' })
    constructionNo: number
    @Column({ type: 'varchar', name: 'jiegou', comment: '结构名称' })
    construction: string
}

@Entity({ database: "fbb", name: "FY_TYPE" })
export class HouseType extends BaseEntity {
    @PrimaryColumn({ type: 'int', name: 'id', comment: '类型id' })
    typeId: number
    @Column({ type: 'varchar', name: 'house_type', comment: '房源类型名称' })
    type: string
}

@Entity({ database: "fbb", name: "FY_YONGTU" })
export class HouseUsage extends BaseEntity {
    @PrimaryColumn({ type: 'smallint', name: 'HERP_USAGE', comment: '用途id' })
    usageId: number
    @Column({ type: 'int', name: 'yongtu_no', comment: '用途' })
    usageNo: number
    @Column({ type: 'varchar', name: 'yongtu', comment: '用途名称' })
    usage: string
}

@Entity({ database: "fbb", name: "FY_ZHUANGXIU" })
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

@Entity({ database: "fbb", name: "FY_CHAOXIANG" })
export class HouseExpose extends BaseEntity {
    @PrimaryColumn({ type: 'smallint', name: 'HERP_EXPOSE', comment: '朝向id' })
    exposeId: number
    @Column({ type: 'int', name: 'chaoxiang_no', comment: '朝向' })
    exposeNo: number
    @Column({ type: 'varchar', name: 'chaoxiang', comment: '朝向名称' })
    expose: string
}

//字典表 内部设施 字典类型87
@Entity({ database: "fbb", name: "SYS_PUBLIC_DETAIL" })
export class HouseInnerPlant extends BaseEntity {
    @PrimaryColumn({ type: 'numeric', name: 'PUBLIC_DETAIL_ID', comment: '字典id' })
    dicId: string
    @Column({ type: 'varchar', name: 'PUBLIC_ID', comment: '字典类型，88' })
    type: 88
    @Column({ type: 'varchar', name: 'PUBLIC_DETAIL_CODE', comment: '设施id' })
    plantId: string
    @Column({ type: 'varchar', name: 'PUBLIC_DETAIL_NAME', comment: '设施名称' })
    plant: string
}

//字典表 房源特色
@Entity({ database: "fbb", name: "FENLEI_TYPE" })
export class HouseFeature extends BaseEntity {
    @PrimaryColumn({ type: 'int', name: 'id', comment: '字典id' })
    dicId: number
    @Column({ type: 'varchar', name: 'type', comment: '特色id' })
    featureId: string
    @Column({ type: 'varchar', name: 'type_name', comment: '特色名称' })
    feature: string
    @AfterLoad()
    trim() {
        this.featureId = this.featureId.replaceAll(' ', '');
    }
}



