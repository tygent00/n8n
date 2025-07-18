import type { AuthenticatedRequest, IWorkflowDb } from '@n8n/db';
import { Body, Post, RestController } from '@n8n/decorators';

import { TygentService } from '@/services/tygent.service';

@RestController('/tygent')
export class TygentController {
	constructor(private readonly tygentService: TygentService) {}

	@Post('/optimize')
	async optimizeWorkflow(req: AuthenticatedRequest, @Body body: { workflow: IWorkflowDb }) {
		return await this.tygentService.optimize(body.workflow);
	}
}
