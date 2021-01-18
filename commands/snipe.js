const Discord = require('discord.js');

module.exports = {
	name: 'snipe',
	description: 'Send the last deleted message in the channel',
	category: 'fun',
	execute(message) {
		// Get last deleted message
		const msg = message.client.snipes.get(message.channel.id);
		if (!msg) return message.channel.send('❌ there wasn\'t any messages to snipe sorry broski');

		const embed = new Discord.MessageEmbed()
			.setColor('RANDOM')
			.setAuthor(msg.author, msg.authorAvatar)
			.setDescription(msg.content)
			.setTimestamp(msg.timestamp)
			.setFooter('FartBot2000 | !help', message.client.user.avatarURL());
		if (msg.image) {
			embed.setImage(msg.image);
		}

		message.channel.send(embed);
	}
};