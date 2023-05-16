import { Entity, Column, BaseEntity, PrimaryColumn, Generated } from "typeorm"

@Entity({ database: "zh_erp", name: "FY_CHENGQU" })
export class HouseUrban extends BaseEntity {
    @PrimaryColumn({ type: 'int', name: 'id', comment: '城区id' })
    urbanid: number
    @Column({ type: 'varchar', name: 'chengqu_no', comment: '城区拼音' })
    urbanLetter: string
    @Column({ type: 'varchar', name: 'chengqu', comment: '城区名称' })
    urbanName: string
}

@Entity({ database: "zh_erp", name: "FY_JIEQU" })
export class HouseBlock extends BaseEntity {
    @PrimaryColumn({ type: 'int', name: 'jiequ_no', comment: '街区id' })
    blockId: number
    @Column({ type: 'varchar', name: 'jiequ', comment: '街区名称' })
    blockName: string
    @Column({ type: 'varchar', name: 'chengqu_no', comment: '所在城区拼音' })
    urbanLetter: string
    @Column({ type: 'nvarchar', name: 'jiequ_zm', comment: '街区首字母' })
    blockInitial: string
}