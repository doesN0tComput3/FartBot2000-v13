/* const Discord = require('discord.js');
const levels = require('../levels');

module.exports = {
	name: 'stats',
	aliases: ['xp', 'level', 'currentlevel'],
	usage: '[@user]',
	description: 'Shows your current level and XP.',
	category: 'info',
	async execute(message) {
		const user = message.mentions.users.first() || message.author;
		const userId = user.id;
		const guildId = message.guild.id;

		const stats = await levels.getStats(guildId, userId);

		const userXp = stats.xp;
		const userLevel = stats.level;

		const nextLevelUp = userLevel * 100;
		const difference = nextLevelUp - userXp;

		const embed = new Discord.MessageEmbed()
			.setTitle(`${user}'s Stats`)
			.setColor('RANDOM')
			.addField('Level', `**${userLevel}**`, true)
			.addField('XP', `**${userXp} XP**`, true)
			.setThumbnail(user.avatarURL())
			.setTimestamp(message.createdAt)
			.setFooter('FartBot2000 | !help', message.client.user.avatarURL());

		if (user === message.mentions.users.first()) {
			embed.setDescription(`They need **${difference} XP** until they can level up.`);

		} else {
			embed.setDescription(`You need **${difference} XP** until your next level up.`);
		}
		message.lineReply({ embeds: [embed] });
	}
}; */