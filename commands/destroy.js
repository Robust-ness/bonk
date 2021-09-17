module.exports = {
    name: "destroy",
    description: "Shut down the bot",
    async execute(client, interaction) {
        let channel = client.channels.cache.find(channel => channel.id == interaction.channel_id)
        if (interaction.member.id != "234529409694957569")
            channel.send("Not authorized.")
        channel.send("Shutting Down...")
        client.destroy()
        return
    },
    responseType: 3,
    options: [],
    response: '..'
}