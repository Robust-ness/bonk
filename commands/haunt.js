const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("haunt")
        .setDescription("Go fuck yourself")
	.addUserOption(user =>
            user
                .setName("user")
                .setDescription("figure it the fuck out")
                .setRequired(true)
        )
        .addStringOption(message =>
            message
                .setName("message")
                .setDescription("figure it the fuck out")
                .setRequired(true)
        ),

    async execute(client, interaction) {
	const user = interaction.options.getUser("user")
	const message = interaction.options.getString("message")
        user.send(message)
        interaction.reply({content: "Sent!", ephemeral: true})
    }
}
