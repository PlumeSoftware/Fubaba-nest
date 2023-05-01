import { Agent } from "../meta/agent";
import { Fy } from "../meta/fy";
import { House } from "../meta/house";
import { AgentRes } from "./agentRes";
import { HouseExtra, HouseRes } from "./houseRes";

export class FyRes {

    /**
     * 支付方法
     */
    paywayCode?: number;
    /**
     * 发布时间
     */
    releaseTime: string;
    /**
     * 出售单价
     */
    reqAmt?: number;
    /**
     * 出售租价
     */
    reqAmt2?: number;
    /**
     * 出售总价
     */
    reqAmt3?: number;
    /**
     * 房源id
     */
    reqHusId: number;
    /**
     * 出售信息id
     */
    reqId: string;
    /**
     * 信息状态
     */
    reqStatus: number;
    /**
     * 房源类型
     */
    reqType: number;
    /**
     * 分享码
     */
    sharingCode: string;

    /**
  * 房评备注
  */
    adRemark: string;

    agentInfo: AgentRes;

    houseInfo: HouseRes;

    constructor(fy: Fy, agent: Agent, house: House, extra: HouseExtra) {
        const attrs = Object.keys(fy)
        attrs.forEach(attr => {
            this[attr] = fy[attr]
        })
        this.agentInfo = new AgentRes(agent);
        this.houseInfo = new HouseRes(house, extra);
    }
}
