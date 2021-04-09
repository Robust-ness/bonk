const Discord = require('discord.js'),
dotenv = require('dotenv').config(),
client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] }),
axios = require('axios').default,
fs = require('fs'),
path = require('path')

let commands = new Discord.Collection();
let nerdMatch = /geo|math|geology|calc|calculus|compsci|computer science|chem|english|hw|homework|quiz|test|seminar|macaulay|lisa|french|sam|nick|keryn/gm
client.wingsofredemption = []

fs.readdirSync(path.join(__dirname, 'commands')).forEach(file => {
  const command = require(`./commands/${file}`)
  commands.set(command.name, command)
  const customJSON = {
    "name": command.name,
    "description": command.description,
    "options": command.options
  }
  if (!process.argv.includes('-n'))
    return
  axios.request('https://discord.com/api/v8/applications/823668195650961469/commands', {
    method: 'POST',
    data: JSON.stringify(customJSON),
    headers: {
      'Authorization' : 'Bot ODIzNjY4MTk1NjUwOTYxNDY5.YFkKyA.cMcnULXAqU55nz6NBZsD22tppGY',
      'Content-Type': 'application/json'
    }
  }).then(res => {
    console.log(res.statusText)
  })
})

let redditkarma = false

client.ws.on('INTERACTION_CREATE', async interaction => {
  if (!commands.has(interaction.data.name))
    return

  let command = commands.get(interaction.data.name)
  let dadata = {
    data: {
      type: command.responseType,
      data: {
        content: command.response
        
      }
    }
  }
  command.flags != undefined ? dadata.data.data.flags = 64 : 0
  client.api.interactions(interaction.id, interaction.token).callback.post(dadata)
  await command.execute(client, interaction)
})


client.on('message', async msg => {
  if (msg.author.id == "823668195650961469")
    return
  if ((msg.content.toLowerCase().includes("bonk") || await isChannelBonk(msg) || isMentionBonk(msg)) && msg.author.id != "823668195650961469" ) {
    msg.channel.send("BONK")
  }
  if (msg.content.toLowerCase().match(nerdMatch)) {
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
  if (user.id == "823668195650961469")
    return
  //if (redditkarma)
    //return
  const count = reaction.message.reactions.cache.filter(reaction => reaction.users.cache.has(user.id)).filter(reaction => reaction.emoji.name == "👎" || reaction.emoji.name == "👍").array()//.array()[0].emoji;
  if (count.length > 1) {
    
    for (let i in count) {
      if (reaction.emoji.name != count[i].emoji.name) {
        reaction.message.reactions.resolve(count[i].emoji.name).users.remove(user.id);
      }
    }
    // if (reaction.message.guild.member(user.id).kickable) {
    //   reaction.message.guild.member(user.id).kick("banned for racism")
    //   reaction.message.channel.send(`<@!${user.id}> banned for racism`)
    // } else {
    //   reaction.message.channel.send(`<@!${user.id}> is too powerful to be banned for racism`)
    // }
  }
});


client.on('ready', () => {
  console.log('revved and ready to go')
  if (process.argv.includes('-d')) {
    axios.get('https://discord.com/api/v8/applications/823668195650961469/commands', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bot ODIzNjY4MTk1NjUwOTYxNDY5.YFkKyA.cMcnULXAqU55nz6NBZsD22tppGY'
    }}).then(res => {
      res.data.forEach(r => {
        axios.delete(`https://discord.com/api/v8/applications/823668195650961469/commands/${r.id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bot ODIzNjY4MTk1NjUwOTYxNDY5.YFkKyA.cMcnULXAqU55nz6NBZsD22tppGY'
          }
        }).then(r => {console.log(r.statusText)})
      })
    })
    //client.user.setActivity("What the fuck")
    client.user.setStatus("invisible")
  }
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