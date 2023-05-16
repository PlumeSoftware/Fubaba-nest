import { FubabaUser } from "../meta_dl/user";

export interface WxAuthRes {
    openid: string;
    session_key: string;
    unionid: string;
}

export class UserInfoRes {
    unionId: string;
    phone?: string;
    agentCity?: string;
    agentId?: number;
    nickName?: string;
    avatarUrl?: string;
    ban: boolean;

    constructor(fubabaUser: FubabaUser) {
        this.unionId = fubabaUser.openId;
        this.phone = fubabaUser?.phone || null;
        this.agentCity = fubabaUser?.agentCity || null;
        this.agentId = fubabaUser?.agentId || null;
        this.nickName = decodeURIComponent(fubabaUser.openId).slice(0, 6);
        this.avatarUrl = null;
        this.ban = fubabaUser.questionFlag != 0 ? true : false;
    }
}