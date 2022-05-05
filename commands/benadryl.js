const fs = require('fs')
const { MessageAttachment } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("benadryl")
        .setDescription("benadryl"),

    async execute(client, interaction) {
        let benadrylDir = './resources/benadryl'
        interaction.reply(
            {
                files: [new MessageAttachment(benadrylDir + '/' + fs.readdirSync(benadrylDir)[getRandomIntInclusive(0, fs.readdirSync(benadrylDir).length - 1)])]
            }
        )
    }
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}
