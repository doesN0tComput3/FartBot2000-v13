module.exports = {
	name: 'beep',
	category: 'fun',
	description: 'Boop!',
	cooldown: 10,
	execute(message) {
		message.lineReply('boop!');
	}
};