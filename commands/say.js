module.exports = {
	name: 'say',
	description: 'Repeats what you say',
	category: 'fun',
	usage: '[message]',
	args: true,
	execute(message, args) {
		message.delete();
		if (message.channel.type === 'dm') {
			const sayText = args.join(' ');
			const channel = message.client.channels.cache.find(channel => channel.id === '749084221024239717');

			channel.send(sayText);
		} else {
			const sayText = args.join(' ');
			message.channel.send(sayText);
		}
	}
};
