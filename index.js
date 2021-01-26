// FartBot2000
// Define variables
const fs = require('fs');
const Discord = require('discord.js');
const config = require('./config.json');
const xp = require('./xp.json');
const statuses = require('./statuses.json');
const client = new Discord.Client();
const channel = client.channels.cache.find(channel => channel.id === '749084221024239717');
const developing = true;

// Find our commands
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}
// When the bot is on, log it in the console and set status
client.once('ready', () => {
	console.log('hey i returned');

	if (developing === true) {
		client.user.setPresence({ activity: { name: 'Orion fix me | !help', type: 'WATCHING' }, status: 'idle' });
	} else {
		setInterval(function () {
			let statusType = Math.floor(Math.random() * (6 - 1 + 1) + 1);

			// Playing statuses
			if (statusType >= 1 && statusType <= 2) {
				let status = Math.floor(Math.random() * statuses.playingStatus.length);
				client.user.setPresence({
					activity: {
						name: `${statuses.playingStatus[status]} | !help`,
						type: 'PLAYING'
					}
				});
				// Listening statuses
			} else if (statusType >= 3 && statusType <= 4) {
				let status = Math.floor(Math.random() * statuses.listeningStatus.length);
				client.user.setPresence({
					activity: {
						name: `${statuses.listeningStatus[status]} | !help`,
						type: 'LISTENING'
					}
				});
				// Watching statuses
			} else if (statusType >= 5 && statusType <= 6) {
				let status = Math.floor(Math.random() * statuses.watchingStatus.length);
				client.user.setPresence({
					activity: {
						name: `${statuses.watchingStatus[status]} | !help`,
						type: 'WATCHING'
					}
				});
			}
		}, 10000);
	}
}
);

// Welcome message
client.on('guildMemberAdd', member => {
	const welcomeEmbed = new Discord.MessageEmbed()
		.setColor('RANDOM')
		.setTitle(`Welcome, ${member.username}!`)
		.setDescription('Give them a warm welcome ig 🙄')
		.setThumbnail(member.avatarURL())
		.setFooter('FartBot2000 | !help', client.user.avatarURL());

	channel.send(welcomeEmbed);
});

// Goodbye message
client.on('guildMemberRemove', member => {
	const goodbyeEmbed = new Discord.MessageEmbed()
		.setColor('RANDOM')
		.setTitle(`Bye ${member.username}...`)
		.setDescription('What did ya\'ll do to make them leave 😭🤦‍♂️\nThey we\'re probably kicked/banned lmao 💀')
		.setThumbnail(member.avatarURL())
		.setFooter('FartBot2000 | !help', client.user.avatarURL());

	channel.send(goodbyeEmbed);
});

// Deleted message
client.snipes = new Map();
client.on('messageDelete', message => {
	if (message.author.bot) return;
	if (message.content.startsWith(config.prefix)) return;
	// Save message info
	client.snipes.set(message.channel.id, {
		content: message.content,
		author: message.author.tag,
		authorAvatar: message.author.avatarURL(),
		timestamp: message.createdAt,
		image: message.attachments.first() ? message.attachments.first().proxyURL : null
	});
	// Logs into channel
	const embed = new Discord.MessageEmbed()
		.setTitle('Message Deleted')
		.setColor('RED')
		.setThumbnail(message.author.avatarURL())
		.addField('Author', message.author, true)
		.setFooter('FartBot2000 | !help', message.client.user.avatarURL())
		.setTimestamp(message.createdAt);

	if (message.content) {
		embed.setDescription(`A message was deleted in ${message.channel}!`);
		embed.addField('Message', message.content, true);
	}
	// Adds image in if one exists
	const image = client.snipes.get(message.channel.id).image;
	if (image) {
		embed.setDescription(`A message was deleted in ${message.channel}!`);
		embed.setImage(image);
	}
	const channel = message.client.channels.cache.find(channel => channel.id === '800815475822821436');
	channel.send(embed);
});

// Edited message logger
client.on('messageUpdate', (oldMessage, newMessage) => {
	if (oldMessage.author.bot) return;
	if (oldMessage.content.includes('https://') || oldMessage.content.includes('http://') || oldMessage.content.includes('www.')) return;
	if (newMessage.content.includes('https://') || newMessage.content.includes('http://') || newMessage.content.includes('www.')) return;
	if (!oldMessage.guild) return;
	if (!oldMessage.content) return;

	const embed = new Discord.MessageEmbed()
		.setTitle('Message Edited')
		.setColor('YELLOW')
		.setDescription(`${oldMessage.author} edited their message in ${oldMessage.channel}.\n\n[Link to Message](https://discord.com/channels/${newMessage.guild.id}/${newMessage.channel.id}/${newMessage.id})`)
		.setThumbnail(oldMessage.author.avatarURL())
		.addField('Old Message', oldMessage.content, true)
		.addField('New Message', newMessage.content, true)
		.setTimestamp(newMessage.createdAt)
		.setFooter('FartBot2000 | !help', oldMessage.client.user.avatarURL());

	const image = newMessage.attachments.first() ? newMessage.attachments.first().proxyURL : null;

	if (image) {
		embed.setImage(image);
	}

	const channel = oldMessage.client.channels.cache.find(channel => channel.id === '800865975015833660');

	channel.send(embed);
});

// Where it all happens 😏
client.on('message', message => {
	// Return if the message is from a bot
	if (message.author.bot) return;

	// XP system
	const xpAdd = Math.floor(Math.random() * 15) + 25;

	if (!xp[message.author.id]) {
		xp[message.author.id] = {
			xp: 0,
			level: 1
		};
	}

	const currentXp = xp[message.author.id].xp;
	const getNeededXP = (level) => level * 100;
	const currentLevel = xp[message.author.id].level;
	xp[message.author.id].xp = currentXp + xpAdd;
	const needed = getNeededXP(currentLevel);

	// Level up message
	if (xp[message.author.id].xp >= needed) {
		if (developing === true) {
			// Do nothing
		} else {
			xp[message.author.id].level = currentLevel + 1;
			const levelUpEmbed = new Discord.MessageEmbed()
				.setColor('#39ff14')
				.setTitle('**LEVEL UP!**')
				.setDescription(`${message.author} just leveled up to **level ${currentLevel + 1}!**\nThey now need **${getNeededXP(currentLevel + 1)} XP** to level up.`)
				.addField('XP', xp[message.author.id].xp)
				.setThumbnail(`${message.author.avatarURL()}`)
				.setFooter('FartBot2000 | !help', message.client.user.avatarURL());

			const xpChannel = message.client.channels.cache.find(channel => channel.id === '777761493285732362');
			xpChannel.send(levelUpEmbed);
		}
	}

	// Save stats to XP file
	fs.writeFile('./xp.json', JSON.stringify(xp), (err) => {
		if (err) console.log(err);
	});

	// Commands
	// If the message doesn't start with a prefix, return
	if (!message.content.startsWith(config.prefix)) return;

	// Args handler
	// Get args and command
	const args = message.content.slice(config.prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	// Return if no command
	if (!command) return;

	// Return if message is in dm
	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('❌ I can\'t do that command inside DMs!');
	}

	if (command.permissions) {
		const authorPerms = message.channel.permissionsFor(message.author);
		if (!authorPerms || !authorPerms.has(command.permissions)) {
			return message.channel.send(`❌ You don't have the required permissions, ${message.author}!\nTry again when you're a kitten 🙄`);
		}
	}

	// Return if command doesn't have all the required args
	if (command.args && !args.length) {
		let reply = `❌ You didn't provide all the required info, ${message.author}`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${config.prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	// Try to execute the command, logs it, catches if theres an error
	try {
		command.execute(message, args);

		const embed = new Discord.MessageEmbed()
			.setTitle(`${command.name} log`)
			.setColor('GREEN')
			.setDescription(`The ${command.name} command was used in ${message.channel}`)
			.setThumbnail(message.author.avatarURL())
			.setTimestamp(message.createdAt)
			.addField('Command', command.name, true)
			.setFooter('FartBot2000 | !help', message.client.user.avatarURL());

		if (args.length) {
			embed.addField('Args', args, true);
		}
		const channel = client.channels.cache.find(channel => channel.name === command.name);
		if (!channel) {
			const logServer = client.guilds.cache.find(guild => guild.id === '615328890285457409');

			logServer.channels.create(command.name, {
				type: 'text',
				topic: `Logs for ${command.name} command`
			});

			const logChannel = client.channels.cache.find(channel => channel.name === command.name);
			logChannel.send(embed);
		} else {
			channel.send(embed);
		}
	} catch (error) {
		console.error(error);
		message.channel.send(`❌ ${message.author} there was an error trying to do that :(`);
	}
});

// Finally, log into the bot
client.login(config.token);
