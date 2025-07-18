export interface AgentOptions {
	model?: string;
}
export declare class Agent {
	model?: string;
	constructor(options?: AgentOptions);
	run(prompt: string): Promise<string>;
}
export declare function accelerate(dag: any, options?: Record<string, any>): Promise<any>;
