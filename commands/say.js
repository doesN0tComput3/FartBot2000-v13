const Discord = require('discord.js');
const config = require('../config.json');
const channel = config.channel;


module.exports = {
    name: 'say',
    description: 'Repeats what you say',
    category: 'fun',
    usage: '[message]',
    args: true,
    execute(message, args) {
        if (!message.channel.type === 'dm') message.delete();
        const sayText = args.join(' ');

        channel.send(sayText);

        const embed = new Discord.MessageEmbed()
            .setColor('#39ff14')
            .setTitle(`Message sent to #${channel.name}!`)
            .setDescription('Your message was successfully sent.')
            .addField('**Message**', sayText, true)
            .setThumbnail(message.author.avatarURL())
            .setFooter('FartBot2000 | !help', message.client.user.avatarURL());

        message.author.send(embed);
    }
};
