import { Agent } from "../meta/agent"

/**
 * Agent
 */
export class AgentRes {
    agentId: number
    realName: string
    agentTel: string
    avatar: string
    agentQr: string

    constructor(agent: Agent) {
        this.agentId = agent.agentId
        this.realName = agent.realName
        this.agentTel = agent.agentTel
        this.avatar = agent.avatar
        this.agentQr = agent.agentQr
    }
}