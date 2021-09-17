const fs = require('fs')
const {CommandInteraction, Client, Message, MessageAttachment} = require("discord.js")

module.exports = {
    name: "lisa",
    description: "lisa",
    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(client, interaction) {
        interaction.reply(
            {
                files: [new MessageAttachment('./lisa/' + fs.readdirSync('./lisa')[getRandomIntInclusive(0, fs.readdirSync('./lisa').length - 1)])]
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