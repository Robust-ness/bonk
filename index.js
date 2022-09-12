// BonkBot https://discord.com/api/oauth2/authorize?client_id=832755822001782814&permissions=8&scope=bot%20applications.commands
// GecBot https://discord.com/api/oauth2/authorize?client_id=912589085380591657&permissions=8&scope=applications.commands%20bot

const Discord = require('discord.js')
const { Intents } = require('discord.js')

dotenv = require('dotenv').config()
axios = require('axios').default
fs = require('fs')
path = require('path')

client = new Discord.Client({
	partials: ['MESSAGE', 'CHANNEL', 'REACTION'], 
  	intents: [
		  Intents.FLAGS.GUILDS, 
		  Intents.FLAGS.GUILD_MESSAGES, 
		  Intents.FLAGS.GUILD_MESSAGE_REACTIONS
		]
	})

let commands = new Discord.Collection();
let nerdMatch = RegExp(`(?:^|\\s|\\.|-|,)(?:${fs.readFileSync("resources/nerd-dictionary.txt").toString().replace(/,/g, "|")})(?:$|\\s|\\.|-|,|\\?|s|\\!)`, 'gm')

client.on('ready', () => {
	fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js')).forEach(file => {
		let command = require(`./commands/${file}`)

		try {
			commands.set(command.data.name, command)
		}
		catch(error) {
			console.log(`../commands/${file} is not a valid command; skipping`)
		}
	})

	console.log('revved and ready to go')
})

client.on('interactionCreate', async interaction => {
  if(interaction.isCommand() && commands.has(interaction.commandName)) {
    try {
      await commands.get(interaction.commandName).execute(client, interaction)
    }
    catch(error) {
      let crashReport = `Error :( Fuck you <@${interaction.user.id}>\nInteraction: ${interaction}\n\`\`\`${error.stack}\`\`\``
      interaction.channel.send(crashReport)
      console.error(error)
    }
  }
})

client.on('messageCreate', async msg => {
  nerdMatch = `(?:^|\\s|\\.|-|,)(?:${fs.readFileSync("resources/nerd-dictionary.txt").toString().replace(/,/g, "|")})(?:$|\\s|\\.|-|,|\\?|s|\\!)`
  nerdMatch = RegExp(nerdMatch, "gm")
  if(msg.author.id == process.env.BOT_ID)
    return
  if(msg.content.toLowerCase().includes("bonk") || await isChannelString("bonk", msg) || await isMentionString("bonk", msg)) {
    msg.channel.send("BONK")
  }
  if(msg.content.toLowerCase().includes("wap") || await isChannelString("wap", msg) || await isMentionString("wap", msg)) {
    msg.channel.send("WAP")
  }
  if(msg.content.toLowerCase().includes("good bot") || await isChannelString("good bot", msg) || await isMentionString("good bot", msg)) {
    msg.channel.send("Fuck you")
  }
  if(msg.content.toLowerCase().includes("gec") || await isChannelString("gec", msg) || await isMentionString("gec", msg)) {
    msg.channel.send("GEC GEC GEC")
  }
  if(msg.content.toLowerCase().includes("snow") || await isChannelString("snow", msg) || await isMentionString("snow", msg)) {
    msg.channel.send("And he called me")
    msg.channel.send("Snowwoman :snowman:")
    msg.channel.send(":joy:")
    await sleep(500)
    msg.channel.send("So I wrote back ✍")
    msg.channel.send("(On Twitter :dove:)")  
    msg.channel.send("Hey! 👋 Donald Trump 🍊 ")
    msg.channel.send("The science 🔬 is on 🔛🔛🔛 my side")
    await sleep(500)
    msg.channel.send("And I'd like 😍 to see 👁👁 how 🤔 YOUR 👉 hair 💈")
    msg.channel.send("WOULD FARE")
    msg.channel.send("In a blizzard ❄❄❄❄❄❄❄❄❄❄❄❄!!!")
    msg.channel.send("Mr Umbrella ☔☔ Man 👦!")
  }
  if(msg.content.toLowerCase().match(nerdMatch)) {
    msg.channel.send('nerd')
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
  if (user.id == process.env.BOT_ID)
    return
  let count = await (await reaction.message.fetch())
    .reactions
    .cache
    .filter(reaction => reaction.emoji.name == "👎" || reaction.emoji.name == "👍")
  if (count.size > 1) {
    count.forEach(r => {
      if (reaction.emoji.name != r.emoji.name) {
        reaction.message.reactions.resolve(r.emoji.name).users.remove(user.id);
      }
    })
  }
});

client.login(process.env.BOT_TOKEN);

async function isMentionString(string, msg) {
  let regex = /<@!(?<gamer>\d*)>/gm
  let z = false;
  if (msg.content.match(regex) != null) {
    await msg.content.match(regex).forEach(async s => {
      s = s.substring(3, s.length - 1)
      z = z || (await msg.guild.members.fetch(s)).displayName.toLowerCase().includes(string)
    })
  }
  return z
}

async function isChannelString(string, msg) {
  let regex2 = /<#(?<gamer>\d*)>/gm
  let z = false;
  if (msg.content.match(regex2) != null) {
    let matches = msg.content.match(regex2)
    for (let i in matches) {
      matches[i] = matches[i].substring(2, matches[i].length - 1)
      if (matches[i] != null) {
        z = z || await (await client.channels.fetch(matches[i])).toJSON().name.toLowerCase().includes(string)
      }
    }
  }
  return z
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min)
}
