const Discord = require('discord.js');
const config = require('../config.json');
const ytdl = require('ytdl-core');

module.exports = {
    name: 'fart',
    description: 'fart (must be in vc)',
    category: 'voice',
    execute(message) {
        // Define vc and fart video(s)
        const vc = message.member.voice.channel;
        const fart = Math.floor((Math.random() * config.farts.length));

        if (vc) {
            // Join vc
            const connection = vc.join()
                .then(connection => {
                    // Self deafen so we don't recieve audio
                    connection.voice.setDeaf(true);
                    // Get our fart video
                    const stream = ytdl(fart, { filter: 'audioonly' });
                    // Play fart
                    const dispatcher = connection.play(stream);
                    // Leave once it's over
                    dispatcher.on('finish', () => {
                        vc.leave();
                    });
                })
                .catch();
        } else {
            // They aren't in vc so I'm not wasting my time
            return message.reply('bro you\'re not in vc i can\'t')
        };


    }
}