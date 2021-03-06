const config = require('../config.json');
const prefix = config.prefix;

module.exports = {
	name: 'help',
	aliases: 'commands',
	description: 'List all of my commands or info about a specific command',
	category: 'info',
	usage: '<command name>',
	execute(message, args) {
		const data = [];
		const { commands } = message.client;

		if (!args.length) {
			if (message.content === '!') return;
			data.push('Here\'s a list of all my commands:\n');
			data.push(commands.map(command => command.name).join('\n'));
			data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);

			return message.author.send(data, { split: true })
				.then(() => {
					if (message.channel.type === 'dm') return;
					message.lineReply(`✅ ${message.author} i've sent you a DM with all my commands!`);
				})
				.catch(error => {
					console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
					message.lineReply(`❌ ${message.author} it seems like I can't DM you! Do you have DMs disabled?`);
				});
		}
		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.lineReply(`❌ ${message.author} that's not a valid command!`);
		}

		data.push(`**Name:** ${command.name}`);

		if (command.category) data.push(`**Category:** ${command.category}`);
		if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
		if (command.description) data.push(`**Description:** ${command.description}`);
		if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

		message.lineReply(data, { split: true });
	}
};