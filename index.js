const Discord = require('discord.js');
const fs = require('fs');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const {
    prefix,
    token,
    fart_facts
} = require('./config.json');

client.once('ready', () => {
    console.log('i\'m back lol');
    client.user.setPresence({
        activity: { name: 'BAKI BAKI' },
    });
});

client.login(token);

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.comands.set(command.name, command);

    if (!client.commands.has(command)) return;
    try {
        client.commands.get(command).execute(message, args);
    } catch (error) {
        console.error(error)
        message.channel.send(`Sorry ${message.author}, something went wrong :(`);
    }
}

client.on('message', message => {
    if (message.content === 'i love you tendou') {
        message.channel.send(`i love you too ${message.author} :kissing_heart:`);
    } else if (message.content === 'you\'re so amazing tendou') {
        message.channel.send(`you look even better ${message.author}`);
    } else if (message.content === 'what are ur thoughts on oikawa') {
        message.channel.send('oikawa shouldve came to shiratorizawa');
    } else if (message.content === 'fart fact') {
        message.channel.send(`Fart fact: ${fart_facts[Math.floor(Math.random() * fart_facts.length)]}`);
    } else if (message.content === 'hey tendou' || message.content === 'hi tendou') {
        message.channel.send(`hey ${message.author} :smirk:`);
    } else if (message.content === 'tendou where can i buy drugs') {
        message.channel.send(`don't buy drugs ${message.author}`);
    } else if (message.content === 'tendou are you a doctor') {
        message.channel.send('no, but you should go to one');
    } else if (message.content === 'baki baki ni ore') {
        message.channel.send('nani wo? kokoro wo da yo');
    }
});
