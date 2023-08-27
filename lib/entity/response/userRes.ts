import { Agent as AgentDL } from "../meta_dl/agent";
import { Agent as AgentZH } from "../meta_zh/agent";
import { FubabaUser } from "../meta_dl/user";

type Agent = AgentDL | AgentZH;


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
    agent_info?: null | Agent;
    bind_info?: null | Agent;

    constructor(fubabaUser: FubabaUser, agentInfo?: Agent, bindInfo?: Agent) {
        this.openid = fubabaUser.openid;
        if(fubabaUser.unionid) {
            this.unionid = fubabaUser.unionid;
        }
        this.phone = fubabaUser?.phone || null;
        if (agentInfo) {
            this.agent_info = agentInfo;
        }
        if (bindInfo) {
            this.bind_info = bindInfo;
        }
    }
}
