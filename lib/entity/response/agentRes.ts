import { Agent } from "../common/agent"

/**
 * Agent
 */
export class AgentRes {
    agentId: number
    realName: string
    agentTel: string
    agentInnerTel: string
    avatar: string
    agentQr: string

    constructor(agent: Agent) {
        this.agentId = agent.agentId
        this.realName = agent.realName
        this.agentTel = agent.agentTel
        this.agentInnerTel = agent.agentInnerTel
        this.avatar = agent.avatar
        this.agentQr = agent.agentQr
    }
}