module.exports = {
    name: 'doyouloveme',
    category: 'fun',
	description: 'Do you love me, FartBot2000?',
	execute(message) {
		message.channel.send(`of course I do, ${message.author}`);
	}
};