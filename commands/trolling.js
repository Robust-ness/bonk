const fs = require('fs')
const {CommandInteraction, Client, Message, MessageAttachment} = require("discord.js")

module.exports = {
    name: "trolling",
    description: "we do a little trolling",
    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(client, interaction) {
        interaction.reply(
            {
                files: [new MessageAttachment('./trolling/' + fs.readdirSync('./trolling')[getRandomIntInclusive(0, fs.readdirSync('./trolling').length - 1)])]
            }
        )
    },
    options: []
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}