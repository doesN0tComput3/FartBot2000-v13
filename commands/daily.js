const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'daily',
    description: 'Use this command to recieve 100 FartCoins a day!\n**Note: you can only use this command once a day.**',
    category: 'economy',
    execute(message) {
        const UserJSON = JSON.parse(fs.readFileSync('./DB/users.json'));
            if (Math.floor(new Date().getTime() - UserJSON[message.author.id].lastclaim) / (1000 * 60 * 60 * 24) < 1) {
                const errorEmbed = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('**Error!**')
                    .setDescription('You have already claimed money today! Try again tomorrow...')
                    .setThumbnail(message.author.avatarURL())
                    .setFooter('FartBot2000 | !help', message.client.user.avatarURL());

                message.channel.send(errorEmbed);
            } else {
                UserJSON[message.author.id].bal += 500;
                UserJSON[message.author.id].lastclaim = new Date().getTime();
                fs.writeFileSync('./DB/users.json', JSON.stringify(UserJSON));

                const successEmbed = new Discord.MessageEmbed()
                    .setTitle('**SUCCESS**')
                    .setDescription('You have claimed a daily reward of 500 FartCoins!')
                    .setThumbnail(message.author.avatarURL())
                    .setFooter('FartBot2000 | !help', message.client.user.avatarURL());

                message.channel.send(successEmbed);
            }
    }
};
