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
    releaseTime: Date;
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
  * 房评备注
  */
    adRemark: string;

    agentInfo: AgentRes;

    houseInfo: HouseRes;

    constructor(fy: Fy, agent: Agent, house: House, extra: HouseExtra) {
        this.releaseTime=fy.releaseTime;
        this.reqId=fy.reqId;
        this.reqStatus=fy.reqStatus;
        this.reqType=fy.reqType;
        this.adRemark=fy.remark;
        this.reqAmt=fy.reqAmt;
        this.reqAmt2=fy.reqAmt2;
        this.reqAmt3=fy.reqAmt3;
        this.agentInfo = new AgentRes(agent);
        this.houseInfo = new HouseRes(house, extra);
    }
}
