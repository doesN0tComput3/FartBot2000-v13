module.exports = {
	name: 'clear',
	aliases: ['delete'],
	description: 'Deletes messages',
	category: 'mod',
	usage: '[number]',
	args: true,
	async execute(message, args) {
		// Returns
		// Return if author isn't a mod/server owner
		if (!message.member.id === '697506619545747569') return message.reply('you not kitten/broey so no');

		if (!message.member.roles.cache.some(r => r.id === '773966213171642379')) return message.reply('you not kitten/broey so no');
		// Return if no number
		if (!args[0]) return message.reply('HOW MUCH BITCH');

		// Return if amount isn't a number
		if (isNaN(args[0])) return message.reply('thats not a number idiot');

		// Return if number is greater than 100
		if(args[0] > 100) return message.reply('you can\'t delete more than 100 messages');

		// Return if number is less than 1
		if(args[0] < 1) return message.reply('you have to delete at least one!');

		// Delete messages
		message.channel.bulkDelete(args[0]).then(() => {
			message.channel.send(`Successfully deleted ${args[0]} message(s)!`);
		});
	}
};