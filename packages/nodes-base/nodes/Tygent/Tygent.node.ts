import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionTypes } from 'n8n-workflow';
import { Agent } from 'tygent-js';

export class Tygent implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Tygent',
		name: 'tygent',
		icon: 'fa:robot',
		group: ['transform'],
		version: 1,
		description: 'Interact with a Tygent agent',
		defaults: {
			name: 'Tygent',
		},
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		properties: [
			{
				displayName: 'Prompt',
				name: 'prompt',
				type: 'string',
				default: '',
				required: true,
				description: 'Prompt to send to the agent',
			},
			{
				displayName: 'Model',
				name: 'model',
				type: 'string',
				default: 'gpt-4',
				description: 'Model to use',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const prompt = this.getNodeParameter('prompt', 0) as string;
		const model = this.getNodeParameter('model', 0) as string;
		const agent = new Agent({ model });
		const result = await agent.run(prompt);
		return [[{ json: { result } }]];
	}
}
