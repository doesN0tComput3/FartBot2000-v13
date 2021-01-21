module.exports = {
	name: 'clear',
	aliases: ['delete'],
	description: 'Deletes messages',
	category: 'mod',
	usage: '[number < 100]',
	guildOnly: true,
	permissions: 'MANAGE_MESSAGES',
	args: true,
	async execute(message, args) {
		// Returns
		// Return if amount isn't a number
		if (isNaN(args[0])) return message.channel.send('❌ thats not a number idiot');

		// Return if number is greater than 100
		if(args[0] > 100) return message.channel.send(`❌ ${message.author} you can't delete more than 100 messages sorry`);

		// Return if number is less than 1
		if(args[0] < 1) return message.channel.send(`❌ ${message.author} you have to delete at least one!`);

		// Delete messages
		message.channel.bulkDelete(args[0]).then(() => {
			message.channel.send(`✅ Successfully deleted ${args[0]} message(s)!`);
		});
	}
};