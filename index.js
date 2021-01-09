// FartBot2000
// Define variables
const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const xp = require('./xp.json');
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
		client.user.setPresence({ activity: { name: 'orion fix me | !help', type: 'WATCHING' }, status: 'idle' })
	} else {
		client.user.setPresence({
			activity: {
				name: 'you fart 😋 | !help',
				type: 'LISTENING'
			}
		});
	}


});

// Welcome message
client.on('guildMemberAdd', (member) => {
	const welcomeEmbed = new Discord.MessageEmbed()
		.setColor('RANDOM')
		.setTitle(`Welcome, ${member.username}!`)
		.setDescription('Give them a warm welcome ig 🙄')
		.setThumbnail(member.avatarURL())
		.setFooter('FartBot2000 | !help', client.user.avatarURL());

	channel.send(welcomeEmbed);
});

// Goodbye message
client.on('guildMemberRemove', (member) => {
	const goodbyeEmbed = new Discord.MessageEmbed()
		.setColor('RANDOM')
		.setTitle(`Bye ${member.username}...`)
		.setDescription('What did ya\'ll do to make them leave 😭🤦‍♂️\nThey we\'re probably kicked/banned lmao 💀')
		.setThumbnail(member.avatarURL())
		.setFooter('FartBot2000 | !help', client.user.avatarURL());

	channel.send(goodbyeEmbed);
});

// Snipe command
client.snipes = new Map();
client.on('messageDelete', message => {
	client.snipes.set(message.channel.id, {
		content: message.content,
		author: message.author.tag,
		authorAvatar: message.author.avatarURL(),
		image: message.attachments.first() ? message.attachments.first().proxyURL : null
	});
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
	if (!message.content.startsWith(prefix)) return;

	// Snipe command
	if (message.content === '!snipe') {
		// Get last deleted message
		const msg = client.snipes.get(message.channel.id);
		if (!msg) return message.reply('there wasn\'t any messages to snipe sorry broski');

		const embed = new Discord.MessageEmbed()
			.setColor('RANDOM')
			.setAuthor(msg.author, msg.authorAvatar)
			.setDescription(msg.content)
			.setFooter('FartBot2000 | !help', message.client.user.avatarURL());
		if (msg.image) {
			embed.setImage(msg.image);
		}

		message.channel.send(embed);
	}

	// Args handler
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	if (!client.commands.has(commandName)) return;

	const command = client.commands.get(commandName);

	if (command.args && !args.length) {
		return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
	}

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

// Finally, log into the bot
client.login(token);