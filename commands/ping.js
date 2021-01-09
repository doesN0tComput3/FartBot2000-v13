module.exports = {
	name: 'ping',
	category: 'info',
	description: 'Pong!',
	execute(message) {
		message.channel.send(`🏓 Pong!\nLatency is ${Date.now() - message.createdTimestamp}ms`);
	}
};