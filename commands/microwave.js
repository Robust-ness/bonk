const { CommandInteraction, Client } = require('discord.js')

module.exports = {
    name: "microwave",
    description: "MMM",
    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(client, interaction) {
        let mmm = ""
        for (let i = 0; i < getRandomIntInclusive(700, 2000); i++) {
            mmm += "M"
        }
        await interaction.reply("MICROWAVE")
        await sleep(1000)
        await interaction.followUp("GO")
        await sleep(1000)
        interaction.followUp(mmm)
    },
    options: []
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}