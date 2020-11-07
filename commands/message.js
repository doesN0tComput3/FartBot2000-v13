const Discord = require('discord.js');

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
        if (!receiver) return message.author.send('i couldn\'t find that user :(');

        const receiverId = receiver.id;
        const text = args.slice(1).join(' ');

        const textEmbed = new Discord.MessageEmbed()
            .setColor('#00FFFF')
            .setTitle('1 new message!')
            .setDescription('You have one new message...')
            .addField('Message', text, true)
            .setFooter('FartBot2000', message.client.user.avatarURL());

        message.client.users.cache.get(receiverId).send(textEmbed)
            .catch(error => {
                message.author.send(`I couldn't send ${receiver} a message, most likely their dm's are off`);
                console.log(error);
            });

        const senderEmbed = new Discord.MessageEmbed()
            .setColor('#39ff14')
            .setTitle('Message sent!')
            .setDescription(`Your message to ${receiver} has been sent.`)
            .addField('**Message**', `${text}`, true)
            .setThumbnail(`${receiver.avatarURL()}`)
            .setFooter('FartBot2000', message.author.avatarURL());

        message.author.send(senderEmbed);
    }
};
