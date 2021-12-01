const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("anonmessage")
        .setDescription("Set a discreet message using BonkBot:tm: as a medium")
        .addStringOption(message =>
            message
                .setName("message")
                .setDescription("message to be sent")
                .setRequired(true)
        ),

    async execute(client, interaction) {
        interaction.channel.send(interaction.options.getString("message"))
        interaction.reply({content: "Sending...", ephemeral: true})
    }
}