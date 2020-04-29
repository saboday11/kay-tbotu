const express = require("express");
const app = express();
const http = require("http");
app.get("/", (request, response) => {
  console.log(`[PING] Açık tutuyorum...`);
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const fs = require("fs");
const ms = require("ms");
const moment = require("moment");
const Jimp = require("jimp");
const db = require("quick.db");
const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");
const youtube = new YouTube("AIzaSyCkT_L10rO_NixDHNjoAixUu45TVt0ES-s");
const queue = new Map();
const { promisify } = require("util");
require("./util/eventLoader")(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`${message}`);
};

client.on("guildMemberAdd", async (member, guild, message) => {
  let role = await db.fetch(`otorolisim_${member.guild.id}`);
  let otorol = await db.fetch(`autoRole_${member.guild.id}`);
  let i = await db.fetch(`otorolKanal_${member.guild.id}`);
  if (!otorol || otorol.toLowerCase() === "yok") return;
  else {
    try {
      if (!i) return;

      member.addRole(member.guild.roles.get(otorol));
      var embed = new Discord.RichEmbed()
        .setDescription(
          `**Sunucuya Yeni Katılan** \`${member.user.tag}\` **Kullanıcısına** \`${role}\` **Rolü verildi.**`
        )
        .setColor("RANDOM")
        .setFooter(`SefaBots Otorol Sistemi`);
      member.guild.channels.get(i).send(embed);
    } catch (e) {
      console.log(e);
    }
  }
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token);

// YENİ GELENLERE MESAJ //

client.on("guildMemberAdd", async member => {
  try {
    let embed = new Discord.RichEmbed();
    await member.addRole("703596894189781133"); //BURDA BİYER DEĞİŞTİRMEYİN//                                                                                                                                                //BU KISMI DOĞRU YAPMAZSANIZ ETİKET ATMAZ!//
    await client.channels
      .get("703596931661824020")
      .send(
        `**Sunucumuza Hoşgeldin** **${member}**\n**Kayıt İçin sesli odalara girmeniz gerekli.**\n**Hesap: **${
          new Date().getTime() - member.user.createdAt.getTime() <
          45 * 24 * 60 * 60 * 1000
            ? " ``Tehlikeli``!"
            : "``Güvenli``!"
        } \n@703596886216540250 **yetkisine sahip arkadaşlar ilgilenecekler.**`
      );
    if (!member.roles.has("703596894189781133")) {
      -member.addRole("703596894189781133");
    }
  } catch (err) {
    console.log(err);
  }
});

// ÖZELDEN HOŞGELDİN //

client.on(`guildMemberAdd`, async member => {
  const e = new Discord.RichEmbed()
    .setColor(`RANDOM`)
    .setImage(`https://data.whicdn.com/images/286255888/original.gif`)
    .addField(
      `***Sunucumuza Geldiğin İçin Teşekkürler.!***`,
      `Saboday İyi Eğlenceler diler`
    )
    .setFooter(`Bu Sunucu 7/24 Saboday tarafından korunuyor.`);
  member.send(e);
});

// ÖZELDEN HOŞGELDİN //

client.on("ready", async function() {
const voiceChannel = "703596934379733022"
client.channels.cache.get(voiceChannel).join()
.catch(err => {
throw err;
})
})
