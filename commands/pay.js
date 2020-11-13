const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'pay',
    description: 'Pay\'s someone money!',
    category: 'economy',
    usage: '[amount] [person]',
    args: true,
    execute(message, args) {
        const UserJSON = JSON.parse(fs.readFileSync('./DB/users.json'));
        const amount = args[2];
        const receiver = message.mentions.users.first();

        if (!receiver) {
            const errorEmbed = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle('**Error!**')
                .setDescription('Please mention a user to send money to.')
                .setThumbnail(message.author.avatarURL())
                .setFooter('FartBot2000 | !help', message.client.user.avatarURL());

            return message.channel.send(errorEmbed);
        }

        if (!UserJSON[receiver.id]) {
            const errorEmbed = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle('**Error!**')
                .setDescription(`${receiver} isn't registered in the economy.\n${receiver}, to register, run \`!register\`.`)
                .setThumbnail(message.author.avatarURL())
                .setFooter('FartBot2000 | !help', message.client.user.avatarURL());

            return message.channel.send(errorEmbed);
        }

        if (!UserJSON[message.author.id]) {
            const errorEmbed = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle('**Error!**')
                .setDescription('You\'re not registered in the economy! How are you gonna pay someone...\nTo register yourself, run `!register`.')
                .setThumbnail(message.author.avatarURL())
                .setFooter('FartBot2000 | !help', message.client.user.avatarURL());

            return message.channel.send(errorEmbed);
        }

        if (UserJSON[message.author.id].bal < amount) {
            const errorEmbed = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle('**Error!**')
                .setDescription(`You don't have enough money!\nYou currently have ${amount - UserJSON[message.author.id].bal} more...`)
                .setThumbnail(message.author.avatarURL())
                .setFooter('FartBot2000 | !help', message.client.user.avatarURL());

            return message.channel.send(errorEmbed);
        }

        if (isNaN(amount)) {
            const errorEmbed = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle('**Error!**')
                .setDescription('You entered an invalid amount.')
                .setThumbnail(message.author.avatarURL())
                .setFooter('FartBot2000 | !help', message.client.user.avatarURL());

            return message.channel.send(errorEmbed);
        }

        if (amount.indexOf('.') != -1 || amount.indexOf('-') != -1) {
            const errorEmbed = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle('**Error!**')
                .setDescription('Please don\'t put a number less than 0.')
                .setThumbnail(message.author.avatarURL())
                .setFooter('FartBot2000 | !help', message.client.user.avatarURL());

            return message.channel.send(errorEmbed);
        }

        UserJSON[message.author.id].bal -= parseInt(amount);
        UserJSON[receiver.id].bal += parseInt(amount);

        fs.writeFileSync('./DB/users.json', JSON.stringify(UserJSON));

        const successEmbed = new Discord.MessageEmbed()
                .setColor('#39ff14')
                .setTitle('**Success!**')
                .setDescription(`Successfully transferred **${amount} FartCoins** to ${receiver}!`)
                .addField('Current Balance', `**${UserJSON[message.author.id].bal} FartCoins**`)
                .setThumbnail(message.author.avatarURL())
                .setFooter('FartBot2000 | !help', message.client.user.avatarURL());

        message.channel.send(successEmbed);
    }
};
