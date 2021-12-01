const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("redditkarma")
    .setDescription("UPVOTE ME")
    .addStringOption(message =>
        message
            .setName("message")
            .setDescription("message")
            .setRequired(true)
    ),

    async execute(client, interaction) {
        let message = await interaction.reply({
            content: interaction.options.getString("message"),
            fetchReply: true
        })
        
        await message.react("👍")
        await message.react("👎")
    }
}