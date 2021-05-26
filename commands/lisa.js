const fs = require('fs')
const Discord = require('discord.js')

module.exports = {
    name: "lisa",
    description: "lisa",
    async execute(client, interaction) {
        let channel = client.channels.cache.find(channel => channel.id == interaction.channel_id)
        let arr = [];
        fs.readdirSync('./lisa').forEach(r => {
            arr.push(r);
        })
        let attach = new Discord.MessageAttachment('./lisa/' + arr[getRandomIntInclusive(0, arr.length - 1)])
        channel.send(attach)
        return
    },
    responseType: 4,
    options: [],
    response: "lisa"
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}