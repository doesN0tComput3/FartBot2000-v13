const Discord = require('discord.js');

module.exports = {
	name: 'happybirthday',
	category: 'fun',
	description: 'Happy Birthday!!!',
	args: true,
	execute(message, args) {
		const text = args.join(' ');

		const embed = new Discord.MessageEmbed()
			.setTitle('HAPPY BIRTHDAY BESTIE!!!')
			.setColor('RANDOM')
			.setDescription(`HERE IS A MESSAGE FROM ${message.author}:`)
			.addField('**Message:**', text)
			.setThumbnail(`${message.client.users.cache.find(user => user.id === '653103452326723595').avatarURL()}`)
			.setFooter('FartBot2000 | !help', message.client.user.avatarURL());

		const channel = message.client.channels.cache.find(channel => channel.id === '749084221024239717');

		channel.send('<@653103452326723595>');
		channel.send(embed);
	}
};