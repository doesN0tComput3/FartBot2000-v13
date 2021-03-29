module.exports = {
	name: 'clear',
	aliases: ['delete'],
	description: 'Deletes messages, or from a specific person',
	category: 'mod',
	usage: '[number < 100], [@member] [number < 100]',
	guildOnly: true,
	permissions: 'MANAGE_MESSAGES',
	args: true,
	async execute(message, args) {
		if (message.mentions.users.first()) {
			// Returns
			// Return if amount isn't a number
			if (isNaN(args[1])) return message.lineReply('❌ thats not a number idiot');

			// Return if number is greater than 100
			if(args[1] > 100) return message.lineReply(`❌ ${message.author} you can't delete more than 100 messages sorry`);

			// Return if number is less than 1
			if(args[1] < 1) return message.lineReply(`❌ ${message.author} you have to delete at least one!`);

			// Define target
			const target = message.mentions.users.first();
			if (!target) return message.lineReply('❌ couldn\'t find that person');

			// Delete messages
			message.channel.messages.fetch({
				limit: 100
			}).then((messages) => {
				if (target) {
					const filterBy = target ? target.id : message.client.target.id;

					messages = messages.filter(m => m.author.id === filterBy).array().slice(0, args[1]);
				}
				message.channel.bulkDelete(messages).then(() => {
					message.lineReply(`✅ Successfully deleted ${args[1]} message(s) from ${target}!`);
				});
			});
		} else {
			// Returns
			// Return if amount isn't a number
			if (isNaN(args[0])) return message.lineReply('❌ thats not a number idiot');

			// Return if number is greater than 100
			if(args[0] > 100) return message.lineReply(`❌ ${message.author} you can't delete more than 100 messages sorry`);

			// Return if number is less than 1
			if(args[0] < 1) return message.lineReply(`❌ ${message.author} you have to delete at least one!`);

			// Delete messages
			message.channel.bulkDelete(args[0]).then(() => {
				message.lineReply(`✅ Successfully deleted ${args[0]} message(s)!`);
			});
		}
	}
};