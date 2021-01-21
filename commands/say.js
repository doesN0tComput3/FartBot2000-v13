module.exports = {
	name: 'say',
	description: 'Repeats what you say',
	category: 'fun',
	usage: '[message]',
	args: true,
	execute(message, args) {
		if (message.channel.type === 'dm') {
			const sayText = args.join(' ');
			const channel = message.client.channels.cache.find(channel => channel.id === '749084221024239717');

			channel.send(sayText);
			message.channel.send('✅ ok');
		} else {
			message.delete();
			const sayText = args.join(' ');
			message.channel.send(sayText);
		}
	}
};
