/* const mongo = require('./mongo');
const Discord = require('discord.js');
const profileSchema = require('./schemas/profileschema');
module.exports = (client) => {
	client.on('message', (message) => {
		if (message.channel.type === 'dm') return;
		const { guild, member } = message;
		addXP(guild.id, member.id, Math.floor(Math.random() * 15) + 25, message);
	});
};
const getNeededXP = (level) => level * 100;

const addXP = async (guildId, userId, xpToAdd, message) => {
	if (message.author.bot) return;
	if (message.channel.type === 'dm') return;
	await mongo().then(async (mongoose) => {
		try {
			const result = await profileSchema.findOneAndUpdate(
				{
					guildId,
					userId
				},
				{
					guildId,
					userId,
					$inc: {
						xp: xpToAdd
					}
				},
				{
					upsert: true,
					new: true
				}
			);

			let { xp, level } = result;
			const needed = getNeededXP(level);

			if (xp >= needed) {
				++level;

				const levelUpEmbed = new Discord.MessageEmbed()
					.setColor('#39ff14')
					.setTitle('**LEVEL UP!**')
					.setDescription(`${message.author} just leveled up to **level ${level}!**\nThey now need **${getNeededXP(level)} XP** to level up.`)
					.addField('XP', xp)
					.setThumbnail(`${message.author.avatarURL()}`)
					.setTimestamp(message.createdAt)
					.setFooter('FartBot2000 | !help', message.client.user.avatarURL());

				const xpChannel = message.client.channels.cache.find(channel => channel.id === '777761493285732362');
				xpChannel.send({ embeds: [levelUpEmbed] });

				await profileSchema.updateOne(
					{
						guildId,
						userId
					},
					{
						level,
						xp
					}
				);
			}
		} finally {
			mongoose.connection.close();
		}
	});
};

module.exports.addXP = addXP;

module.exports.getStats = async (guildId, userId) => {
	return await mongo().then(async mongoose=> {
		try {
			const result = await profileSchema.findOne({
				guildId,
				userId
			});

			console.log('RESULT:', result);

			let xp = 0;
			let level = 1;

			if (result) {
				xp = result.xp;
				level = result.level;
			} else {
				console.log('Inserting a document');

				await new profileSchema({
					guildId,
					userId,
					xp,
					level
				}).save();
			}

			return { xp, level };
		} finally {
			//
		}
	});
}; */