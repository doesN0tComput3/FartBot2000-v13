module.exports = {
	name: 'userclear',
	aliases: ['userdelete'],
	description: 'Deletes messages from a person',
	category: 'mod',
	usage: '[@member] [number < 100]',
	guildOnly: true,
	permissions: 'MANAGE_MESSAGES',
	args: true,
	async execute(message, args) {
		// Returns
		// Return if amount isn't a number
		if (isNaN(args[1])) return message.channel.send('❌ thats not a number idiot');

		// Return if number is greater than 100
		if(args[1] > 100) return message.channel.send(`❌ ${message.author} you can't delete more than 100 messages sorry`);

		// Return if number is less than 1
		if(args[1] < 1) return message.channel.send(`❌ ${message.author} you have to delete at least one!`);

		// Define target
		const target = message.mentions.users.first();
		if (!target) return message.channel.send('❌ couldn\'t find that person');

		// Delete messages
		message.channel.messages.fetch({
			limit: 100
		}).then((messages) => {
			if (target) {
				const filterBy = target ? target.id : message.client.target.id;

				messages = messages.filter(m => m.author.id === filterBy).array().slice(0, args[1]);
			}
			message.channel.bulkDelete(messages).then(() => {
				message.channel.send(`✅ Successfully deleted ${args[1]} message(s) from ${target}!`);
			});
		});
	}
};