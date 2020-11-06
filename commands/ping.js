const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'ping',
    category: 'info',
	description: 'Pong!',
	execute(message, args) {
		message.channel.send(`🏓 Pong!\nLatency is ${Date.now() - message.createdTimestamp}ms`);
	},
};