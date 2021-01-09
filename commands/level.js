const Discord = require('discord.js');
const xp = require('../xp.json');

module.exports = {
	name: 'level',
	aliases: ['xp', 'currentlevel'],
	description: 'Shows your current level and XP.',
	category: 'info',
	execute(message) {
		if (!xp[message.author.id]) {
			xp[message.author.id] = {
				xp: 0,
				level: 1
			};
		}

		const currentXp = xp[message.author.id].xp;
		const currentLevel = xp[message.author.id].level;
		const nextLevelUp = currentLevel * 100;
		const difference = nextLevelUp - currentXp;

		const embed = new Discord.MessageEmbed()
			.setColor('RANDOM')
			.setTitle(`${message.author.username}'s Stats`)
			.setDescription(`You need **${difference} XP** until your next level up.`)
			.addField('Level', `**${currentLevel}**`, true)
			.addField('XP', `**${currentXp} XP**`, true)
			.setThumbnail(message.author.avatarURL())
			.setFooter('FartBot2000 | !help', message.client.user.avatarURL());
		message.channel.send(embed);
	}
};
