const Discord = require('discord.js');
const config = require('../config.json');
const ytdl = require('ytdl-core');

module.exports = {
    name: 'lovesosa',
    description: 'these bitches love sosa',
    category: 'voice',
    execute(message) {
        // Define vc
        const vc = message.member.voice.channel;

        if (vc) {
            // Join vc
            const connection = vc.join()
                .then(connection => {
                    // Self deafen so we don't recieve audio
                    connection.voice.setDeaf(true);
                    // Get our video
                    const stream = ytdl('https://www.youtube.com/watch?v=RdrC-FrtwMI', { filter: 'audioonly' });
                    // Play
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
