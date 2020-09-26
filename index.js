// Tendoubot!
// Get variables
const Discord = require('discord.js');
const client = new Discord.Client();
const {
    prefix,
    token,
    fart_facts
} = require('./config.json');
const mainChannel = client.channels.cache.get('749084221024239717');

// These commands run on startup
client.once('ready', () => {
    // Log in console that I've returned
    console.log('i\'m back lol');

    // Set activity to my song
    client.user.setActivity('BAKI BAKI', { type: 'LISTENING'})

    // Send message in server to let others know I'm back
    mainChannel.send('i\'m back bitches :stuck_out_tongue_winking_eye:');
});

// Login to bot (duh)
client.login(token);

// THE COMMANDS!!!
client.on('message', message => {
    // Ping command
    if (message.content === 'ping') {
        message.channel.send(`pong bitch\nLatency is ${m.createdTimestamp - message.createdTimestamp}ms\nAPI latency is ${Math.round(client.ping)}ms`);
    // Regular message commands
    } else if (message.content === 'i love you tendou') {
        message.channel.send(`i love you too ${message.author} :kissing_heart:`);
    } else if (message.content === 'you\'re so amazing tendou') {
        message.channel.send(`you look even better ${message.author}`);
    } else if (message.content === 'what are ur thoughts on oikawa') {
        message.channel.send('oikawa shouldve came to shiratorizawa');
    } else if (message.content === 'hey tendou' || message.content === 'hi tendou') {
        message.channel.send(`hey ${message.author} :smirk:`);
    } else if (message.content === 'tendou where can i buy drugs') {
        message.channel.send(`don't buy drugs ${message.author}`);
    } else if (message.content === 'tendou are you a doctor') {
        message.channel.send('no, but you should go to one');
    } else if (message.content === 'baki baki ni ore') {
        message.channel.send('nani wo? kokoro wo da yo');
    // Fart facts!
    } else if (message.content === 'fart fact') {
        message.channel.send(`Fart fact: ${fart_facts[Math.floor(Math.random() * fart_facts.length)]}`);
    }
});
