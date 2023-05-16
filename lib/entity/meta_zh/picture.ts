import { Entity, Column, BaseEntity, PrimaryColumn, Generated, AfterLoad } from "typeorm"

@Entity({ database: "zh_erp", name: "FY_PICTURE" })
export class Picture extends BaseEntity {
    @PrimaryColumn({ type: 'int', name: 'pic_id', comment: '图片主键' })
    picId: number
    @Column({ type: 'char', name: 'info_type', comment: '1--图片 2--视频' })
    picType: string
    @Column({ type: 'int', name: 'hus_id', comment: '绑定的房源husid' })
    houseId: number
    @Column({ type: 'nvarchar', name: 'picture_name', comment: '图片路径' })
    picPath: string
    @Column({ type: 'datetime', name: 'upload_date', comment: '上传时间' })
    uploadDate: Date
}

@Entity({ database: "zh_erp", name: "FY_VR_PICTURE" })
export class PictureVr extends BaseEntity {
    @PrimaryColumn({ type: 'int', name: 'vr_id', comment: 'vr图片主键id' })
    picVrId: number
    @Column({ type: 'int', name: 'hus_id', comment: '绑定的房源husid' })
    houseId: number
    @Column({ type: 'varchar', name: 'picture', comment: '图片路径' })
    picPath: string
    @Column({ type: 'varchar', name: 'name', comment: '对应房间名称' })
    room: string
    @Column({ type: 'varchar', name: 'connect_position', comment: '连接信息' })
    connectInfo: string
    @Column({ type: 'nchar', name: 'chaoxiang', comment: '朝向' })
    expose: string
    @AfterLoad()
    trim() {
        this.expose = this.expose.replaceAll(' ', '');
    }
}