const { CommandInteraction, Client } = require('discord.js')
const fs = require('fs')

module.exports = {
    name: "listnerdwords",
    description: "List all words that are in the nerd word dictionary.",
    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(client, interaction) {
        interaction.reply(
            {
                content: "Current List: `" + fs.readFileSync("nerd-dictionary.txt").toString().replace(/,/g, ", ") + "`",
                ephemeral: true
            }
        )    
        },
    options: []
}