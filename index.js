const Discord = require('discord.js'),
dotenv = require('dotenv').config(),
client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })

let redditkarma = false

client.on('message', async msg => {
  if (msg.author.id == "823668195650961469")
    return
  console.log(msg.guild.emojis.cache.array())



  if ((msg.content.toLowerCase().includes("bonk") || await isChannelBonk(msg) || isMentionBonk(msg)) && msg.author.id != "823668195650961469" ) {
    msg.channel.send("BONK")
  }
  if (msg.content == "/microwave") {
    let ind = 0;
    msg.delete()
    let cancer = ["MICROWAVE", "GO", "MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM"]
    msg.channel.send(cancer[0])
    await sleep(1000)
    msg.channel.send(cancer[1])
    await sleep(1000)
    msg.channel.send(cancer[2])
    return
  }
  if (msg.content.startsWith("/anonmessage ")) {
    msg.delete()
    let anonmessage = msg.content.slice(13, msg.content.length)
    console.log(msg.author.username)
    msg.channel.send(anonmessage)
    return
  }
  if (msg.content == "/redditkarma" && !redditkarma) {
    redditkarma = true
    msg.channel.send("Reddit karma enabled gamers 🍆")
  } else if (msg.content == "/redditkarma" && redditkarma) {
    redditkarma = false
    msg.channel.send("Fuck you")
  }
  if (redditkarma) {
    msg.react("👍")
    msg.react("👎")
  }
});

client.on('messageReactionAdd', async (reaction, user) => {
	if (reaction.partial) {
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message: ', error);
			return;
		}
	}
  if (user.id == "823668195650961469")
    return
  //if (redditkarma)
    //return
  const count = reaction.message.reactions.cache.filter(reaction => reaction.users.cache.has(user.id)).filter(reaction => reaction.emoji.name == "👎" || reaction.emoji.name == "👍").array().length//.array()[0].emoji;
  if (count > 1) {
    reaction.message.reactions.resolve(reaction.emoji.name).users.remove(user.id);
    if (reaction.message.guild.member(user.id).kickable) {
      reaction.message.guild.member(user.id).kick("banned for racism")
      reaction.message.channel.send(`<@!${user.id}> banned for racism`)
    } else {
      reaction.message.channel.send(`<@!${user.id}> is too powerful to be banned for racism`)
    }
  }
});


client.on('ready', () => {
  console.log('revved and ready to go')
})

client.login(process.env.BOT_TOKEN);

function isMentionBonk(msg) {
  let regex = /<@!(?<gamer>\d*)>/gm
  let z = false;
  if (msg.content.match(regex) != null) {
    msg.content.match(regex).forEach(s => {
      s = s.substring(3, s.length - 1)
      if (s != null) {
        z = z || msg.guild.member(s).displayName.toLowerCase().includes('bonk')
      }
    })
  }
  return z
}

async function isChannelBonk(msg) {
  let regex2 = /<#(?<gamer>\d*)>/gm
  let z = false;
  if (msg.content.match(regex2) != null) {
    let matches = msg.content.match(regex2)
    for (let i in matches) {
      matches[i] = matches[i].substring(2, matches[i].length - 1)
      if (matches[i] != null) {
        z = z || await (await client.channels.fetch(matches[i])).toJSON().name.toLowerCase().includes("bonk")
      }
    }
  }
  return z
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}