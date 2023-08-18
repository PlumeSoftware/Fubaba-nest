import { Entity, Column, BaseEntity, PrimaryColumn, Generated, AfterLoad } from "typeorm"

@Entity({ database: "fmj", name: "FY_HOUSE" })
export class House extends BaseEntity {
    @PrimaryColumn({ type: 'int', name: 'hus_id', comment: '房源id' })
    houseId: number
    @Column({ type: 'nvarchar', name: 'hus_build_name', comment: '房源名称' })
    houseName: string
    @Column({ type: 'int', name: 'hus_low_floor', comment: '房源楼层' })
    houseInFloor: number
    @Column({ type: 'int', name: 'hus_floors', comment: '总层数' })
    houseTotalFloor: number
    @Column({ type: 'decimal', name: 'hus_area', comment: '面积' })
    houseArea: number
    @Column({ type: 'int', name: 'hus_build_year', comment: '建成年份' })
    houseBuildYear: number
    @Column({ type: 'decimal', name: 'hus_rooms', comment: '房间（室）数量' })
    houseRooms: number
    @Column({ type: 'int', name: 'hus_halls', comment: '厅数量' })
    houseHalls: number
    @Column({ type: 'int', name: 'hus_kitchens', comment: '厨房数量' })
    houseKitchens: number
    @Column({ type: 'int', name: 'hus_toilets', comment: '卫生间数量' })
    houseToilets: number
    @Column({ type: 'nchar', name: 'hus_fitment', comment: '装修情况 ' })
    houseFitment: string
    @Column({ type: 'int', name: 'hus_expose', comment: '房屋朝向' })
    houseExposeCode: number
    @Column({ type: 'int', name: 'hus_usage', comment: '房屋用途' })
    houseUsageCode: number
    @Column({ type: 'nvarchar', name: 'hus_memo', comment: '房评' })
    houseMemo: string
    @Column({ type: 'nvarchar', name: 'hus_address', comment: '房源地址' })
    houseAddress: string
    @Column({ type: 'int', name: 'hus_jiegou', comment: '房屋结构' })
    houseConstructionCode: number
    @Column({ type: 'varchar', name: 't1', comment: '房源特色，逗号分割' })
    houseFeatureCode: string
    @Column({ type: 'varchar', name: 't2', comment: '房源内部设施，逗号分割' })
    houseInnerPlantCode: string

    @AfterLoad()
    trim() {
        if (this.houseFeatureCode) {
            this.houseFeatureCode = this.houseFeatureCode.replaceAll(' ', '');
        }
        if (this.houseInnerPlantCode) {
            this.houseInnerPlantCode = this.houseInnerPlantCode.replaceAll(' ', '');
        }
        if (this.houseFitment) {
            this.houseFitment = this.houseFitment.replaceAll(' ', '');
        }
        if (!this.houseMemo) {
            this.houseMemo = ''
        }
    }
}

