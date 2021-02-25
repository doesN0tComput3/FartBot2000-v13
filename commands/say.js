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

			// If message has image AND text
			if (message.attachments.size > 0 && sayText) {
				let image = message.attachments.first();

				const imageUrl = image.url;

				channel.send(sayText, {
					files: [imageUrl]
				});
				message.channel.send('✅ ok');
			// If message has image ONLY
			} else if (message.attachments.size > 0) {
				let image = message.attachments.first();

				const imageUrl = image.url;

				channel.send({
					files: [imageUrl]
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
