const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const xp = require('./xp.json');
const channel = client.channels.cache.find(channel => channel.id === '749084221024239717');

const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('hey i returned');

	client.user.setPresence({
		activity: {
			name: 'you fart 😋 | !help',
			type: 'LISTENING'
		}
	});
});

client.on('guildMemberAdd', (member) => {
	const welcomeEmbed = new Discord.MessageEmbed()
		.setColor('RANDOM')
		.setTitle(`Welcome, ${member.username}!`)
		.setDescription('Give them a warm welcome ig 🙄')
		.setThumbnail(member.avatarURL())
		.setFooter('FartBot2000 | !help', client.user.avatarURL());

	channel.send(welcomeEmbed);
});

client.on('guildMemberRemove', (member) => {
	const goodbyeEmbed = new Discord.MessageEmbed()
		.setColor('RANDOM')
		.setTitle(`Bye ${member.username}...`)
		.setDescription('What did ya\'ll do to make them leave 😭🤦‍♂️\nThey we\'re probably kicked/banned lmao 💀')
		.setThumbnail(member.avatarURL())
		.setFooter('FartBot2000 | !help', client.user.avatarURL());

	channel.send(goodbyeEmbed);
});

client.on('message', message => {
	if (message.author.bot) return;

	const xpAdd = Math.floor(Math.random() * 15) + 25;

	if (!xp[message.author.id]) {
		xp[message.author.id] = {
			xp: 0,
			level: 1
		};
	}

	const currentXp = xp[message.author.id].xp;
	const getNeededXP = (level) => level * 200;
	const currentLevel = xp[message.author.id].level;
	xp[message.author.id].xp = currentXp + xpAdd;
	const needed = getNeededXP(currentLevel);

	if (xp[message.author.id].xp >= needed) {
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

	fs.writeFile('./xp.json', JSON.stringify(xp), (err) => {
		if (err) console.log(err);
	});

	if (!message.content.startsWith(prefix)) return;

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

client.login(token);
