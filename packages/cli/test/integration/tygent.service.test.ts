import { TygentService } from '@/services/tygent.service';
import type { INode, IConnections, IWorkflowDb } from 'n8n-workflow';
import { accelerate } from 'tygent-js';

jest.mock('tygent-js');

describe('TygentService', () => {
	test('optimize() should pass workflow DAG to accelerate and return its result', async () => {
		const triggerNode: INode = {
			id: '1',
			name: 'Trigger',
			type: 'webhook.trigger',
			typeVersion: 1,
			position: [0, 0],
			parameters: {},
		};
		const otherNode: INode = {
			id: '2',
			name: 'Set',
			type: 'n8n-nodes-base.set',
			typeVersion: 1,
			position: [0, 0],
			parameters: {},
		};
		const connections: IConnections = {};

		const workflow = {
			id: '1',
			name: 'test',
			active: false,
			isArchived: false,
			createdAt: new Date(),
			updatedAt: new Date(),
			nodes: [otherNode, triggerNode],
			connections,
			triggerCount: 1,
		} as unknown as IWorkflowDb;

		const expectedDag = { nodes: [otherNode, triggerNode], connections };
		const accelerateMock = accelerate as jest.MockedFunction<typeof accelerate>;
		accelerateMock.mockResolvedValue({ nodes: [triggerNode, otherNode], connections });

		const service = new TygentService();
		const optimized = await service.optimize(workflow);

		expect(accelerateMock).toHaveBeenCalledTimes(1);
		expect(accelerateMock).toHaveBeenCalledWith(expectedDag);
		expect(optimized.nodes).toEqual([triggerNode, otherNode]);
	});
});
