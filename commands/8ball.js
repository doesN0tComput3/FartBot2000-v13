const Discord = require('discord.js');
const config = require('../config.json');

module.exports = {
	name: '8ball',
	description: 'Ask the magic 8-ball!',
	category: 'fun',
	usage: '[question]',
	args: true,
	execute(message, args) {
		if (!args) return message.reply('ask a question you dumbass');

		const result = Math.floor((Math.random() * config.responses.length));

		const question = args.join(' ');

		const embed = new Discord.MessageEmbed()
			.setTitle('8-Ball')
			.addField('**Question**', question, true)
			.addField('**Answer**', config.responses[result])
			.setThumbnail(message.author.avatarURL())
			.setFooter('FartBot2000 | !help', message.client.user.avatarURL());
		if (result === 0 || result === 1 || result === 2 || result === 3 || result === 4 || result === 5 || result === 6 || result === 7 || result === 8 || result === 9) {
			embed.setColor('#39ff14');
		} else if (result === 10 || result === 11 || result === 12 || result === 13 || result === 14) {
			embed.setColor('#ffff00');
		} else {
			embed.setColor('#ff0000');
		}

		message.channel.send(embed);
	}
};