const fs = require('fs'),
{ CommandInteraction, Client, MessageAttachment } = require('discord.js')

module.exports = {
    name: "stickdance",
    description: "dsadsa9fhs8u9fhsdf",
    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(client, interaction) {
        interaction.reply({
            files: [new MessageAttachment("image0.gif")]
        })
    },
    options: []
}