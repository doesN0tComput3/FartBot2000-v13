module.exports = {
    name: 'say',
    description: 'Repeats what you say.',
    category: 'fun',
    args: true,
	execute(message, args) {
	    const sayText = args.join(" ");
	
	    const channel = message.client.channels.cache.find(channel => channel.id === '749084221024239717');
	    channel.send(sayText)
	},
};
