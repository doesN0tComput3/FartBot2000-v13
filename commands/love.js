const Discord = require('discord.js');

module.exports = {
	name: 'love',
	aliases: ['loveaffinity'],
	description: 'How much does this person love you?\nYou don\'t have to @ someone, but you can if you want!',
	category: 'fun',
	usage: 'person',
	args: true,
	execute(message, args) {
		const person = args.join(' ');

		const love = Math.random() * 100;
		const loveIndex = Math.floor(love / 10);
		const loveLevel = '💖'.repeat(loveIndex) + '💔'.repeat(10 - loveIndex);

		const embed = new Discord.MessageEmbed()
			.setColor('RANDOM')
			.setTitle(`**How much does ${person} love ${message.author.username}?**`)
			.setDescription(`**${person}** loves **${message.author.username}** this much:\n\n**${Math.floor(love)}%\n${loveLevel}**`)
			.setThumbnail(message.author.avatarURL())
			.setTimestamp(message.createdAt)
			.setFooter('FartBot2000 | !help', message.client.user.avatarURL());

		message.lineReply(embed);
	}
};
