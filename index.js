// FartBot2000
// Define variables
const fs = require('fs');
const Discord = require('discord.js');
const configuration = require('./config.json');
const { config } = require('dotenv');
const mySecret = process.env['TOKEN'];
const statuses = require('./statuses.json');
require('discord-reply');
const unscramble = require('unscramble');
// const mongo = require('./mongo');
// const levels = require('./levels');
const myIntents = new Discord.Intents(8067);
const client = new Discord.Client({ intents: myIntents });
const channel = client.channels.cache.find(channel => channel.id === '749084221024239717');
const developing = false;

config();

// Find our commands
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}
// When the bot is on, log it in the console and set status
client.once('ready', async () => {
	console.log('hey i returned');

	/* await mongo().then(mongoose => {
		try {
			console.log('connected to mongo');
		} finally {
			mongoose.connection.close();
		}
	});

	levels(client); */

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
		.setTimestamp(member.joinedAt)
		.setFooter('FartBot2000 | !help', client.user.avatarURL());

	channel.send({ embeds: [welcomeEmbed] });
});

// Goodbye message
client.on('guildMemberRemove', member => {
	const goodbyeEmbed = new Discord.MessageEmbed()
		.setColor('RANDOM')
		.setTitle(`Bye ${member.username}...`)
		.setDescription('What did ya\'ll do to make them leave 😭🤦‍♂️\nThey we\'re probably kicked/banned lmao 💀')
		.setThumbnail(member.avatarURL())
		.setFooter('FartBot2000 | !help', client.user.avatarURL());

	channel.send({ embeds: [goodbyeEmbed] });
});

// Deleted message
client.snipes = new Map();
client.on('messageDelete', message => {
	if (message.author.bot) return;
	if (message.content.startsWith(configuration.prefix)) return;
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
	channel.send({ embeds: [embed] });
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

	channel.send({ embeds: [embed] });
});

// Where it all happens 😏
client.on('message', async message => {
	// Unscrambler for Dank Memer
	if (message.author.id === '270904126974590976' && message.content.includes('Scramble')) {
		const wordFirstIndex = message.content.search('`');
		if (!wordFirstIndex) return;

		const word = message.content.substr(wordFirstIndex);

		const unscrambledWords = unscramble(word);

		if (unscrambledWords.includes('No results found.')) {
			return;
		} else {
			const embed = new Discord.MessageEmbed()
				.setColor('RANDOM')
				.setTitle('Match(es) Found!')
				.setDescription(`I found a match for a \`pls work\`.\nMatches: ${unscrambledWords.toString().replace(/,/g, ', ')}`)
				.setTimestamp(message.createdAt)
				.setFooter('FartBot2000 | !help', message.client.user.avatarURL());

			const channel = message.client.channels.cache.find(channel => channel.id === '828696824038555718');
			channel.send({ content: '<@295016772245913600>', embeds: [embed] });
		}
	}

	// Return if the message is from a bot
	if (message.author.bot) return;

	// Commands
	// If the message doesn't start with a prefix, return
	if (!message.content.startsWith(configuration.prefix)) return;

	// Args handler
	// Get args and command
	const args = message.content.slice(configuration.prefix.length).trim().split(/ +/);
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
			return message.lineReply(`❌ You don't have the required permissions, ${message.author}!\nTry again when you're a kitten 🙄`);
		}
	}

	// Return if command doesn't have all the required args
	if (command.args && !args.length && !command.name === 'say') {
		let reply = `❌ You didn't provide all the required info, ${message.author}`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${configuration.prefix}${command.name} ${command.usage}\``;
		}

		return message.lineReply(reply);
	}

	// Try to execute the command, logs it, catches if theres an error
	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.lineReply(`❌ ${message.author} there was an error trying to do that :(`);
	}
});

// Finally, log into the bot
client.login(process.env.TOKEN);
