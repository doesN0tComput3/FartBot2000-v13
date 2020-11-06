const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'beep',
    category: 'fun',
	description: 'Boop!',
	cooldown: 10,
	execute(message, args) {
		message.channel.send(`boop!`);
	},
};