const mongo = require('./mongo');
const Discord = require('discord.js');
const profileSchema = require('./schemas/profileschema');

module.exports = (client) => {
	client.on('message', (message) => {
		const { guild, member } = message;

		addXP(guild.id, member.id, Math.floor(Math.random() * 15) + 25, message);
	});
};

const getNeededXP = (level) => level * 100;

const addXP = async (guildId, userId, xpToAdd, message) => {
	if (message.author.bot) return;
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
					.setFooter('FartBot2000 | !help', message.client.user.avatarURL());

				const xpChannel = message.client.channels.cache.find(channel => channel.id === '777761493285732362');
				xpChannel.send(levelUpEmbed);

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