const Discord = require('discord.js');

module.exports = {
	name: 'ilove',
	description: 'How much do YOU love *that* person?\nBasically !love but in reverse.',
	category: 'fun',
	usage: '[person]',
	args: true,
	execute(message, args) {
		const person = args.join(' ');

		const love = Math.random() * 100;
		const loveIndex = Math.floor(love / 10);
		const loveLevel = '💖'.repeat(loveIndex) + '💔'.repeat(10 - loveIndex);

		const embed = new Discord.MessageEmbed()
			.setColor('RANDOM')
			.setTitle(`**How much does ${message.author.username} love ${person}?**`)
			.setDescription(`**${message.author.username}** loves **${person}** this much:\n\n**${Math.floor(love)}%\n${loveLevel}**`)
			.setThumbnail(message.author.avatarURL())
			.setFooter('FartBot2000 | !help', message.client.user.avatarURL());

		message.lineReply(embed);
	}
};
