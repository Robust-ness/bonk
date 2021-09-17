const {CommandInteraction, Client} = require("discord.js")

module.exports = {
    name: "anonmessage",
    description: "Set a discreet message using BonkBot:tm: as a medium.",
    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(client, interaction) {
        await interaction.reply({content: "Sending...", ephemeral: true})
        interaction.channel.send(interaction.options.getString("message"))
    },
    options: [
        {
            "name": "message",
            "description": "Nope",
            "type": 3,
            "required": true
        }
    ]
}