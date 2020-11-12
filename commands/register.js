const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'register',
    aliases: ['start'],
    description: 'Registers you into the economy!',
    category: 'economy',
    execute(message) {
        const UserJSON = JSON.parse(fs.readFileSync('./DB/users.json'));

        UserJSON[message.author.id] = {
            bal: 50,
            lastclaim: 0
        };

        fs.writeFileSync('./DB/users.json', JSON.stringify(UserJSON));

        const embed = new Discord.MessageEmbed()
            .setColor('#39ff14')
            .setTitle('**Success!**')
            .setDescription('Successfully registered you into the economy.\nAs a reward, you start of with **50 FartCoins!**')
            .addField('Current Balance', `**${UserJSON[message.author.id].bal} FartCoins**`)
            .setThumbnail(message.author.avatarURL())
            .setFooter('FartBot2000 | !help', message.client.user.avatarURL());

        message.channel.send(embed);
    }
};
