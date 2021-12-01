const fs = require('fs')
const { MessageAttachment } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("trolling")
        .setDescription("we do a little trolling"),

    async execute(client, interaction) {
        let trollingDir = './resources/trolling'
        interaction.reply(
            {
                files: [new MessageAttachment(trollingDir + '/' + fs.readdirSync(trollingDir)[getRandomIntInclusive(0, fs.readdirSync(trollingDir).length - 1)])]
            }
        )
    }
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}