const { MessageAttachment } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("stickdance")
        .setDescription("DAE?"),

    async execute(client, interaction) {
        interaction.reply({
            files: [new MessageAttachment('./resources/stick_dance.gif')]
        })
    }
}