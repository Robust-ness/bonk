module.exports = {
    name: "redditkarma",
    description: "Upvote from me",
    async execute(client, interaction) {
        let channel = client.channels.cache.find(channel => channel.id == interaction.channel_id)
        let message = await channel.send(interaction.data.options[0].value)
        message.react("👍")
        message.react("👎")
        // if (client.channels.cache.find(channel => channel.id == interaction.data.options[0].value).isText()) {
        //     if (!client.wingsofredemption.find(search => search.id == interaction.data.options[0].value)) {
        //         client.wingsofredemption.push({id: interaction.data.options[0].value, reddit: true})
        //     } else {
        //         client.wingsofredemption[client.wingsofredemption.findIndex(search => search.id == interaction.data.options[0].value)].reddit = !client.wingsofredemption[client.wingsofredemption.findIndex(search => search.id == interaction.data.options[0].value)].reddit
        //     }
        // }

        //console.log(client.wingsofredemption)
        return
    },
    async postExecute(client, interaction) {

    },
    responseType: 4,
    options: [
        {
            "name": "message",
            "description": "can",
            "type": 3,
            "required": true
        }
    ],
    response: 'ok redditor',
    flags: 64
}