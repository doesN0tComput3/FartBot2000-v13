module.exports = {
	name: 'say',
    description: 'Repeats what you say.',
    category: 'fun',
    args: true,
	execute(message, args) {
        message.delete();
        const sayText = args.join(" ");

        message.channel.send(sayText);
	},
};