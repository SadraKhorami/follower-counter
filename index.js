const DiscordJS = require('discord.js')
const request = require('request');
const config = require('./config.json');
setInterval(function () {
  request({
    url: `https://www.instagram.com/${config.username}/?__a=1`,
    method: "GET",
    headers: {
      'User-Agent': 'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11',
      'Referer': "https://www.instagram.com/accounts/login/",
      'x-csrftoken': `${config.x-csrftoken}`,
      'Cookie': `rur=${config.rur}; shbid=${config.shbid}; csrftoken=${config.csrftoken}; shbts=${config.shbts}; sessionid=${config.sessionid}; ds_user_id=${config.ds_user_id}; ig_did=${config.ig_did}; mid=${config.mid}`,
      'Accept': '/',
      'Connection': 'keep-alive'
    },
    json: true
  }, function (_error, _response, body) {
    console.log("Followers updated to " + body["graphql"]["user"]["edge_followed_by"]["count"]);
    client.channels.cache.get(config.vchannel).setName("🟡 INSTAGRAM: " + body["graphql"]["user"]["edge_followed_by"]["count"])
  })
}, 600000);


const client = new DiscordJS.Client({
  partials: ['MESSAGE', 'REACTION'],
})

client.on('ready', () => {
  console.log(`${client.user.username} is Ready.`);
  setInterval(() => {
    let membersCount = client.guilds.cache.map(guild => guild.memberCount).reduce((a, b) => a + b, 0)
    client.user.setActivity(`${membersCount} Users 🌹`, { type: "WATCHING" });
  }, 180000);
})


client.login(config.token)
