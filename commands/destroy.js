module.exports = {
    name: "redditkarma",
    description: "Upvote from me",
    async execute(client, interaction) {
        let channel = client.channels.cache.find(channel => channel.id == interaction.channel_id)
        if (interaction.member.id != "234529409694957569")
            channel.send("Not authorized.")
        channel.send("Shutting Down...")
        client.destroy()
        return
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
    response: '..'
}