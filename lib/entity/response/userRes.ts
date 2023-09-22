import { Agent } from "../common/agent";
import { FubabaUser } from "../common/user";


export interface WxAuthRes {
    openid: string;
    session_key: string;
    unionid: string;
}
/**
 * WxAuth
 */
export class UserInfoRes {
    openid: string;
    unionid?: string;
    phone: string;
    token: string;
    agent_token?: string;
    agentInfo?: null | Agent;
    bindInfo?: null | Agent;

    ban?: boolean;

    constructor(fubabaUser: FubabaUser, agentInfo?: Agent, bindInfo?: Agent) {
        this.openid = fubabaUser.openid;
        if (fubabaUser.unionid) {
            this.unionid = fubabaUser.unionid;
        }
        this.phone = fubabaUser?.phone || null;
        if (agentInfo) {
            this.agentInfo = agentInfo;
        }
        if (bindInfo) {
            this.bindInfo = bindInfo;
        }
    }
}
