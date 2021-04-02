const Discord = require('discord.js')
// dotenv = require('dotenv').config(),
// client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] }),
const axios = require('axios').default
// fs = require('fs'),
// path = require('path')

module.exports = {
    name: "anonmessage",
    description: "Set a discreet message using BonkBot:tm: as a medium.",
    async execute(client, interaction) {
        let channel = client.channels.cache.find(channel => channel.id == interaction.channel_id)
        //channel.send('gamer')
        //console.log(interaction.data.options[0].value)
        channel.send(interaction.data.options[0].value)
        return
    },
    responseType: 4,
    options: [
        {
            "name": "message",
            "description": "Nope",
            "type": 3,
            "required": true
        }
    ],
    response: 'sending gamer',
    flags: 64
}