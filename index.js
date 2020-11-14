const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const xp = require('./xp.json');

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

client.on('message', message => {
	if (message.author.bot) return;

	const xpAdd = Math.floor(Math.random() * 7) + 8;
	console.log(xpAdd);

	if (!xp[message.author.id]) {
		xp[message.author.id] = {
			xp: 0,
			level: 0
		};
	}

	const currentXp = xp[message.author.id].xp;
	const currentLevel = xp[message.author.id].level;
	const nextLevel = xp[message.author.id].level * 150;
	xp[message.author.id].xp = currentXp + xpAdd;

	if (nextLevel <= xp[message.author.id].xp) {
		xp[message.author.id].level = currentLevel + 1;
		const levelUpEmbed = new Discord.MessageEmbed()
			.setColor('#39ff14')
			.setTitle('**LEVEL UP!**')
			.setDescription(`You just leveled up to **level ${currentLevel + 1}!**`)
			.setThumbnail(`${message.author.avatarURL()}`)
			.setFooter('FartBot2000 | !help', message.client.user.avatarURL());
		message.channel.send(levelUpEmbed);
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