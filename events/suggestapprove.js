const { ActivityType, ActionRowBuilder, EmbedBuilder, ActionRow, ButtonBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
let config = require('../config.json');
const client = require('..');
const { QuickDB } = require('quick.db');
const db = new QuickDB()
client.on("interactionCreate", async(interaction) => {
    if(!interaction.isButton) return;
    await interaction.deferUpdate;

    if(interaction.customId == 'discord-accept-suggestion') {
        if(!interaction.member.roles.cache.some((r) => r.id == config.suggest.SUGGEST_MODERATOR_ROLE)) return;

        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('discord-accept-suggestion')
            .setEmoji('✔')
            .setLabel('مقبول')
            .setStyle('Success')
            .setDisabled(true)
        )

        const embed = new EmbedBuilder()
        .setTitle("🈸  - DISCORD SUGGESTION")
        .addFields(
            { name: 'المقترح', value: `<@${await db.get(`suggestions-memberId-${interaction.message.id}`)}>`, inline: false },
            { name: 'الاقتراح', value: '```' + `${await db.get(`suggestions-suggestion-${interaction.message.id}`)}` + '```', inline: false },
            { name: 'حالة الاقتراح', value: `مقبول`, inline: false },
        )
        .setThumbnail(interaction.member.displayAvatarURL())
        .setTimestamp()
        .setColor('Green')

        interaction.message.edit({
            embeds: [embed],
            components: [row]
        })
    }



    



});