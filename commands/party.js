const { CommandInteraction, Client } = require('discord.js')

module.exports = {
    name: "party",
    description: "PARTY AT KERYN'S HOUSE",
	/**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(client, interaction) {
		let sleepTime = getRandomIntInclusive(100, 1000)
		let sendAmount = getRandomIntInclusive(5, 20)
		await interaction.reply("PARTY AT KERYN'S HOUSE - PARTY AT KERYN'S HOUSE - PARTY AT KERYN'S HOUSE")
		for (let i = 0; i < sendAmount; i++) {
			await sleep(sleepTime)
			await interaction.followUp("PARTY AT KERYN'S HOUSE - PARTY AT KERYN'S HOUSE - PARTY AT KERYN'S HOUSE")
		}
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