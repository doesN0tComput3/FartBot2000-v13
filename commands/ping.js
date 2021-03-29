module.exports = {
	name: 'ping',
	category: 'info',
	description: 'Pong!',
	execute(message) {
		message.lineReply(`🏓 Pong!\nLatency is ${Date.now() - message.createdTimestamp}ms`);
	}
};