const Discord = require('discord.js');

module.exports = {
	name: 'poll',
	description: 'Sends a message to a person',
	category: 'fun',
	usage: '[question]',
	args: true,
	execute(message, args) {
		message.delete();
		const question = args.join(' ');

		const pollEmbed = new Discord.MessageEmbed()
			.setColor('RANDOM')
			.setTitle('Poll')
			.addField('**Question**', question, true)
			.addField('**Poll Started By**', message.author)
			.setThumbnail(message.author.avatarURL())
			.setTimestamp(message.createdAt)
			.setFooter('FartBot2000 | !help', message.client.user.avatarURL());

		if (message.channel.type === 'dm') {
			const channel = message.client.channels.cache.find(channel => channel.id === '749084221024239717');

			channel.send(pollEmbed).then(messageReaction => {
				messageReaction.react('👍');
				messageReaction.react('👎');
			});
		} else {
			message.channel.send(pollEmbed).then(messageReaction => {
				messageReaction.react('👍');
				messageReaction.react('👎');
			});
		}
	}
};
