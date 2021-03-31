const Discord = require('discord.js');
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
			.setColor('RANDOM')
			.setTitle(`${message.author.username}'s Stats`)
			.setDescription(`You need **${difference} XP** until your next level up.`)
			.addField('Level', `**${userLevel}**`, true)
			.addField('XP', `**${userXp} XP**`, true)
			.setThumbnail(message.author.avatarURL())
			.setTimestamp(message.createdAt)
			.setFooter('FartBot2000 | !help', message.client.user.avatarURL());

		message.lineReply(embed);
	}
};