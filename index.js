// Tendoubot!
// Get variables
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

// These commands run on startup
client.once('ready', () => {
    // Log in console that I've returned
    console.log('i\'m back lol');

    // Set activity to my song
    client.user.setActivity('BAKI BAKI', { type: 'LISTENING' });
});

// Login to bot (duh)
client.login(config.token);

// THE COMMANDS!!!
client.on('message', async message => {
    const responses = {
        // Love you tendou
        'i love you tendou': `i love you too ${message.author} :kissing_heart:`,
        'I love you tendou': `i love you too ${message.author} :kissing_heart:`,
        'I love you Tendou': `i love you too ${message.author} :kissing_heart:`,
        // Amazing tendou
        'you\'re so amazing tendou': `you look even better ${message.author}`,
        'You\'re so amazing tendou': `you look even better ${message.author}`,
        'You\'re so amazing Tendou': `you look even better ${message.author}`,
        // Thoughts on Oikawa?
        'what are ur thoughts on oikawa': 'oikawa shouldve came to shiratorizawa',
        'What are your thoughts on oikawa': 'oikawa shouldve came to shiratorizawa',
        'What are your thoughts on Oikawa': 'oikawa shouldve came to shiratorizawa',
        // Heyyyy tendou
        'hey tendou': `hey ${message.author} :smirk:`,
        'Hey Tendou': `hey ${message.author} :smirk:`,
        'Hey tendou': `hey ${message.author} :smirk:`,
        'hey Tendou': `hey ${message.author} :smirk:`,
        'hi tendou': `hey ${message.author} :smirk:`,
        'Hi Tendou': `hey ${message.author} :smirk:`,
        'Hi tendou': `hey ${message.author} :smirk:`,
        'hi Tendou': `hey ${message.author} :smirk:`,
        // I need drugs lol
        'tendou where can i buy drugs': `don't buy drugs ${message.author}`,
        'Tendou where can I buy drugs': `don't buy drugs ${message.author}`,
        'where can i buy drugs tendou': `don't buy drugs ${message.author}`,
        // Doctor tendou?
        'tendou are you a doctor': 'no, but you should go to one',
        'are you a doctor tendou': 'no, but you should go to one',
        // Baki baki something idk
        'baki baki ni ore': 'nani wo? kokoro wo da yo',
        // Do you love me
        'tendou do you love me': `of course my love ${message.author} :pleading_face:`,
        'Tendou do you love me': `of course my love ${message.author} :pleading_face:`,
        'do you love me tendou': `of course my love ${message.author} :pleading_face:`,
        // Fart facts!
        'fart fact': `Fart fact: ${config.fart_facts[Math.floor(Math.random() * config.fart_facts.length)]}`
    };
    // Ping command
    if (message.content === `${config.prefix}ping`) {
        const m = await message.channel.send('pong bitch');
        m.edit(`pong bitch\nLatency is ${m.createdTimestamp - message.createdTimestamp}ms`);
    // Reply (inputs and outputs)
    } else if (responses[message.content]) {
        message.channel.send(responses[message.content]);
    }
});