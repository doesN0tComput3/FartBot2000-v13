const Discord = require('discord.js');

module.exports = {
    name: 'poll',
    description: 'Sends a message to a person',
    category: 'fun',
    usage: '[question]',
    args: true,
    execute(message, args) {
        const question = args.join(' ');

        const pollEmbed = new Discord.MessageEmbed()
            .setColor('#00FFFF')
            .setTitle('Poll')
            .addField('**Question**', question, true)
            .addField('**Poll Started By**', message.author)
            .setThumbnail(message.author.avatarURL)
            .setFooter('FartBot2000', message.client.user.avatarURL());

        const channel = message.client.channels.cache.find(channel => channel.id === '749084221024239717');
        channel.send(pollEmbed).then(messageReaction => {
            messageReaction.react('👍');
            messageReaction.react('👎');
        });

        const embed = new Discord.MessageEmbed()
            .setColor('39ff14')
            .setTitle('Poll created!')
            .setDescription('Your poll was created.')
            .addField('**Question**', question, true)
            .setFooter('FartBot2000', message.client.user.avatarURL());

        message.author.send(embed);
    }
};
