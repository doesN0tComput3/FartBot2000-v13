const Discord = require('discord.js');

module.exports = {
    name: 'say',
    description: 'Repeats what you say',
    category: 'fun',
    usage: '[message]',
    args: true,
    execute(message, args) {
        if (!message.channel.type === 'dm') {
            message.delete();
            const sayText = args.join(' ');
            message.channel.send(sayText);
        } else {
            const sayText = args.join(' ');
            message.channel.send(sayText)
        }
    }
};
