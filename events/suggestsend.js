const { ActivityType, ActionRowBuilder, EmbedBuilder, ActionRow, ButtonBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
let config = require('../config.json');
const client = require('..');
const { default: mongoose } = require('mongoose');
const SuggestionSchema = require('../Schema/suggestModel');
const { QuickDB } = require('quick.db');
const db = new QuickDB()


client.on("interactionCreate", async(interaction) => {
    if(!interaction.isModalSubmit()) return;
    await interaction.deferUpdate;

    if(interaction.customId == 'discord-suggestion-modal') {
        const Suggestion = interaction.fields.getTextInputValue('discordsuggestionmessage');

        const suggestionembed = new EmbedBuilder()
        .setTitle('🈸  - DISCORD SUGGESTION')
        .addFields(
            {
                name: 'المقترح',
                value: `${interaction.member}`,
                inline: false
            },
            {
                name: 'الاقتراح',
                value: '```' + Suggestion + '```',
                inline: false
            },
            {
                name: 'حالة الاقتراح',
                value: `في انتظار الإجابة`,
                inline: false
            },
        )
        .setThumbnail(interaction.member.displayAvatarURL())
        .setTimestamp()
        .setColor('Orange')


        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('discord-accept-suggestion')
            .setEmoji('✔')
            .setLabel('قبول')
            .setStyle('Success')
        )
        .addComponents(
            new ButtonBuilder()
            .setCustomId('discord-deny-suggestion')
            .setEmoji('❌')
            .setLabel('رفض')
            .setStyle('Danger')
        )

        let suggestionmessage = await interaction.guild.channels.cache.find((c) => c.id == config.suggest.SUGGEST_CHANNEL).send({
            embeds: [suggestionembed],
            components: [row]
        });


        await db.delete(`suggestions-suggestion-${suggestionmessage.id}`);
        await db.delete(`suggestions-messageId-${suggestionmessage.id}`); 
        await db.delete(`suggestions-memberId-${suggestionmessage.id}`, `${interaction.member.id}`);

        await db.set(`suggestions-messageid-${suggestionmessage.id}`, suggestionmessage.id);
        await db.set(`suggestions-suggestion-${suggestionmessage.id}`, Suggestion);
        await db.set(`suggestions-memberId-${suggestionmessage.id}`, `${interaction.member.id}`);

       
    } 


});