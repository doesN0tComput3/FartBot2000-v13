const Discord = require('discord.js');

module.exports = {
	name: 'message',
	aliases: ['dm', 'send'],
	description: 'Sends a message to a person',
	category: 'fun',
	usage: '[@user] [message]',
	args: true,
	execute(message, args) {
		message.delete();
		const receiver = message.mentions.users.first();
		if (!receiver) return message.author.send('i couldn\'t find that user :(');

		const receiverId = receiver.id;
		const text = args.slice(1).join(' ');

		if (message.attachments.size === 1) {
			const file = message.attachments.first();

			const fileUrl = file.url;

			if (text) {
				const textEmbed = new Discord.MessageEmbed()
					.setColor('RANDOM')
					.setTitle('1 new message!')
					.setDescription('You have one new message...')
					.addField('**Message**', text, true)
					.setImage(fileUrl)
					.setTimestamp(message.createdAt)
					.setFooter('FartBot2000 | !help', message.client.user.avatarURL());

				message.client.users.cache.get(receiverId).send({ embeds: [textEmbed] })
					.catch(error => {
						message.author.send(`I couldn't send ${receiver} a message, most likely their dm's are off`);
						console.log(error);
					});

				const senderEmbed = new Discord.MessageEmbed()
					.setColor('#39ff14')
					.setTitle('Message sent!')
					.setDescription(`Your message to ${receiver} has been sent.\n\n**Message:**\n${text}`)
					.setImage(fileUrl)
					.setThumbnail(`${receiver.avatarURL()}`)
					.setTimestamp(message.createdAt)
					.setFooter('FartBot2000 | !help', message.client.user.avatarURL());

				message.author.send({ embeds: [senderEmbed] });
			} else {
				const textEmbed = new Discord.MessageEmbed()
					.setColor('RANDOM')
					.setTitle('1 new message!')
					.setDescription('You have one new message...')
					.setImage(fileUrl)
					.setTimestamp(message.createdAt)
					.setFooter('FartBot2000 | !help', message.client.user.avatarURL());

				message.client.users.cache.get(receiverId).send({ embeds: [textEmbed] })
					.catch(error => {
						message.author.send(`I couldn't send ${receiver} a message, most likely their dm's are off`);
						console.log(error);
					});

				const senderEmbed = new Discord.MessageEmbed()
					.setColor('#39ff14')
					.setTitle('Message sent!')
					.setDescription(`Your message to ${receiver} has been sent.\n\n**Message:**`)
					.setImage(fileUrl)
					.setThumbnail(`${receiver.avatarURL()}`)
					.setTimestamp(message.createdAt)
					.setFooter('FartBot2000 | !help', message.client.user.avatarURL());

				message.author.send({ embeds: [senderEmbed] });
			}
		} else {
			const textEmbed = new Discord.MessageEmbed()
				.setColor('RANDOM')
				.setTitle('1 new message!')
				.setDescription('You have one new message...')
				.addField('**Message**', text, true)
				.setTimestamp(message.createdAt)
				.setFooter('FartBot2000 | !help', message.client.user.avatarURL());

			message.client.users.cache.get(receiverId).send({ embeds: [textEmbed] })
				.catch(error => {
					message.author.send(`I couldn't send ${receiver} a message, most likely their dm's are off`);
					console.log(error);
				});

			const senderEmbed = new Discord.MessageEmbed()
				.setColor('#39ff14')
				.setTitle('Message sent!')
				.setDescription(`Your message to ${receiver} has been sent.\n\n**Message:**\n${text}`)
				.setThumbnail(`${receiver.avatarURL()}`)
				.setTimestamp(message.createdAt)
				.setFooter('FartBot2000 | !help', message.client.user.avatarURL());

			message.author.send({ embeds: [senderEmbed] });
		}
	}
};
