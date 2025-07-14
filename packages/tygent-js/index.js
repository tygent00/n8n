class Agent {
	constructor(options = {}) {
		this.model = options.model || 'gpt-4';
	}
	async run(prompt) {
		return `Result for ${prompt} using model ${this.model}`;
	}
}
module.exports = { Agent };
