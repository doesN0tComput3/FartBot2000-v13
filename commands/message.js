module.exports = {
    name: 'message',
    aliases: ['dm', 'send'],
	description: 'Sends a message to a person',
	category: 'fun',
	usage: '[@user] [message]',
	args: true,
	execute(message, args) {
        message.delete();
        const receiver = message.mentions.users.first();
        if(!receiver) return message.author.send('i couldn\'t find that user :(');

        const receiverId = receiver.id;
        const text = args.slice(1).join(' ');

        message.client.users.cache.get(receiverId).send(text)
            .catch(error => {
                message.author.send(`I couldn't send ${receiver} a message, most likely their dm's are off`);
                console.log(error);
            });
        message.author.send(`ok, i sent ${receiver} this message:\n${text}`);
	}
};
