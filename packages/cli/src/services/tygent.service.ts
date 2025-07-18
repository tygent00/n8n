import { Service } from '@n8n/di';
import { accelerate } from 'tygent-js';
import type { IWorkflowDb } from 'n8n-workflow';

@Service()
export class TygentService {
	/**
	 * Run tygent-js acceleration on the workflow DAG to minimize latency.
	 * Uses the local `tygent-js` package which reorders trigger nodes first.
	 */
	async optimize(workflow: IWorkflowDb): Promise<IWorkflowDb> {
		const triggerNode = workflow.nodes.find((n) => n.type.toLowerCase().includes('trigger'));
		const dag = this.extractDag(triggerNode, workflow);
		const optimized = await accelerate(dag);
		return this.buildWorkflow(optimized, workflow);
	}

	private extractDag(_trigger: any, workflow: IWorkflowDb) {
		return { nodes: workflow.nodes, connections: workflow.connections };
	}

	private buildWorkflow(dag: any, workflow: IWorkflowDb): IWorkflowDb {
		return { ...workflow, nodes: dag.nodes, connections: dag.connections } as IWorkflowDb;
	}
}
