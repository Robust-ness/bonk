const { CommandInteraction, Client } = require('discord.js')

module.exports = {
    name: "redditkarma",
    description: "Upvote from me",
    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(client, interaction) {
        let message = await interaction.reply({
            content: interaction.options.getString("message"),
            fetchReply: true
        })
        await message.react("👍")
        await message.react("👎")
        // if (client.channels.cache.find(channel => channel.id == interaction.data.options[0].value).isText()) {
        //     if (!client.wingsofredemption.find(search => search.id == interaction.data.options[0].value)) {
        //         client.wingsofredemption.push({id: interaction.data.options[0].value, reddit: true})
        //     } else {
        //         client.wingsofredemption[client.wingsofredemption.findIndex(search => search.id == interaction.data.options[0].value)].reddit = !client.wingsofredemption[client.wingsofredemption.findIndex(search => search.id == interaction.data.options[0].value)].reddit
        //     }
        // }

        //console.log(client.wingsofredemption)
    },
    options: [
        {
            "name": "message",
            "description": "can",
            "type": 3,
            "required": true
        }
    ]
}