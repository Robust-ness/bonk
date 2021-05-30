  
module.exports = {
    name: "party",
    description: "PARTY AT KERYN'S HOUSE",
    async execute(client, interaction) {
        let channel = client.channels.cache.find(channel => channel.id == interaction.channel_id)
        channel.send("PARTY AT KERYN'S HOUSE - PARTY AT KERYN'S HOUSE - PARTY AT KERYN'S HOUSE")
		await sleep(100)
		channel.send("PARTY AT KERYN'S HOUSE - PARTY AT KERYN'S HOUSE - PARTY AT KERYN'S HOUSE")
		await sleep(100)
		channel.send("PARTY AT KERYN'S HOUSE - PARTY AT KERYN'S HOUSE - PARTY AT KERYN'S HOUSE")
		await sleep(100)
		channel.send("PARTY AT KERYN'S HOUSE - PARTY AT KERYN'S HOUSE - PARTY AT KERYN'S HOUSE")
		await sleep(100)
		channel.send("PARTY AT KERYN'S HOUSE - PARTY AT KERYN'S HOUSE - PARTY AT KERYN'S HOUSE")
		await sleep(100)
		channel.send("PARTY AT KERYN'S HOUSE - PARTY AT KERYN'S HOUSE - PARTY AT KERYN'S HOUSE")
		await sleep(100)
		channel.send("PARTY AT KERYN'S HOUSE - PARTY AT KERYN'S HOUSE - PARTY AT KERYN'S HOUSE")
		await sleep(100)
		channel.send("PARTY AT KERYN'S HOUSE - PARTY AT KERYN'S HOUSE - PARTY AT KERYN'S HOUSE")
		await sleep(100)
		channel.send("PARTY AT KERYN'S HOUSE - PARTY AT KERYN'S HOUSE - PARTY AT KERYN'S HOUSE")
		await sleep(100)
		channel.send("PARTY AT KERYN'S HOUSE - PARTY AT KERYN'S HOUSE - PARTY AT KERYN'S HOUSE")
		await sleep(100)
		channel.send("PARTY AT KERYN'S HOUSE - PARTY AT KERYN'S HOUSE - PARTY AT KERYN'S HOUSE")
		await sleep(100)
		channel.send("PARTY AT KERYN'S HOUSE - PARTY AT KERYN'S HOUSE - PARTY AT KERYN'S HOUSE")
		await sleep(100)
		channel.send("PARTY AT KERYN'S HOUSE - PARTY AT KERYN'S HOUSE - PARTY AT KERYN'S HOUSE")
		await sleep(100)
        return
    },
    responseType: 4,
    options: [],
    response: 'PARTY AT KERYN\'S HOUSE'
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}