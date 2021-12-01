const fs = require('fs')
const { MessageAttachment } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("mitch")
        .setDescription("mitch"),

    async execute(client, interaction) {
        let mitchDir = './resources/mitch'
        interaction.reply(
            {
                files: [new MessageAttachment(mitchDir + '/' + fs.readdirSync(mitchDir)[getRandomIntInclusive(0, fs.readdirSync(mitchDir).length - 1)])]
            }
        )
    }
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}