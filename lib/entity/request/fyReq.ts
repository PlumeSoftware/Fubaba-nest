export interface FyInfoReq {
    page?: number, // 分页

    name?: string, // 搜索内容
    type: string, // 房源类型 1-二手房 0-租房
    price?: string, // 价格代号（逗号分隔）
    area?: string, // 面积代号（逗号分隔）
    room?: string, // 房间数（逗号分隔）
    expose?: string, // 朝向代号（逗号分隔）
    floor?: string, // 楼层（高低中）代号（逗号分隔）
    build_year?: number, // 建造年份
    fitment?: string, // 装修情况代号（逗号分隔）
    usage?: string, // 用途代号（逗号分隔）
    construct?: string, // 结构代号（逗号分隔）
    sort?: string, // 排序代号
}