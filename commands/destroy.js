const {CommandInteraction, Client} = require("discord.js")

module.exports = {
    name: "destroy",
    description: "Shut down the bot",
    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(client, interaction) {
        let channel = client.channels.cache.find(channel => channel.id == interaction.channel_id)
        if (interaction.member.id != "234529409694957569")
            channel.send("Not authorized.")
        await interaction.reply({ content: "Shutting Down Bot...", ephemeral: true })
        client.destroy()
    },
    options: []
}