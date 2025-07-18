class Agent {
	constructor(options = {}) {
		this.model = options.model || 'gpt-4';
	}
	async run(prompt) {
		return `Result for ${prompt} using model ${this.model}`;
	}
}

async function accelerate(dag, _options = {}) {
	// Simplistic optimization: move trigger nodes to the start
	const triggerNodes = dag.nodes.filter((n) => n.type.toLowerCase().includes('trigger'));
	const otherNodes = dag.nodes.filter((n) => !n.type.toLowerCase().includes('trigger'));
	return {
		nodes: [...triggerNodes, ...otherNodes],
		connections: dag.connections,
	};
}

module.exports = { Agent, accelerate };
