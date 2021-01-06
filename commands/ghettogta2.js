const fs = require('fs');

module.exports = {
    name: 'ghettogta2',
    description: 'Ghetto gta 2!',
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
                    // Play
                    const dispatcher = connection.play(fs.createReadStream('./audio/ghettogta2.mp3'));
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
