const fs = require('fs')
const { MessageAttachment } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("lisa")
        .setDescription("lisa"),

    async execute(client, interaction) {
        let lisaDir = './resources/lisa'
        interaction.reply(
            {
                files: [new MessageAttachment(lisaDir + '/' + fs.readdirSync(lisaDir)[getRandomIntInclusive(0, fs.readdirSync(lisaDir).length - 1)])]
            }
        )
    }
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}