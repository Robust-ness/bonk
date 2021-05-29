const fs = require('fs')
const Discord = require('discord.js')

module.exports = {
    name: "stickdance",
    description: "dsadsa9fhs8u9fhsdf",
    async execute(client, interaction) {
        let channel = client.channels.cache.find(channel => channel.id == interaction.channel_id)
        let attach = new Discord.MessageAttachment('image0.gif')
        channel.send(attach)
        return
    },
    responseType: 4,
    options: [],
    response: "funky"
}