module.exports = {
	name: 'say',
	description: 'Repeats what you say',
	category: 'fun',
	usage: '[message]',
	args: true,
	execute(message, args) {
		// DM only
		if (message.channel.type === 'dm') {
			const sayText = args.join(' ');
			const channel = message.client.channels.cache.find(channel => channel.id === '749084221024239717');

			// If message has file AND text
			if (message.attachments.size === 1 && sayText) {
				const file = message.attachments.first();

				const fileUrl = file.url;

				channel.send(sayText, {
					files: [fileUrl]
				});
				message.channel.send('✅ ok');
			// If message has file ONLY
			} else if (message.attachments.size === 1) {
				const file = message.attachments.first();

				const fileUrl = file.url;

				channel.send({
					files: [fileUrl]
				});
				message.channel.send('✅ ok');
			// If message only has text
			} else {
				channel.send(sayText);
				message.channel.send('✅ ok');
			}
		// Non-dm
		} else {
			message.delete();
			const sayText = args.join(' ');
			message.channel.send(sayText);
		}
	}
};
