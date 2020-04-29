const Discord = require("discord.js");

exports.run = async (client, message, args) => {
if (!message.member.hasPermission("MANAGE_NICKNAMES"))
return message.channel.send(
`:x: Bu Komutu Kullanabilmek için \`İsimleri Yönet\` Yetkisine Sahip Olmalısın!`
);
let member = message.mentions.members.first();
let isim = args.slice(1).join(" | ");
let yas = args.slice(1).join(" ");
if (!member) return message.channel.send(":x:**Bir Üye Etiketle!**");
if (!isim) return message.channel.send(":x:**Bir İsim ve Yaş Yaz!**");
member.setNickname(`✞ ${isim}`);
member.removeRole('703596894189781133')
member.addRole('703596891836776558')
const embed = new Discord.RichEmbed()


.addField(`SefaBots Kayıt Sistemi`,
`\nKayıt Edilen Kullanıcı: ${member.user} \nKayıt Eden Yetkili: \`${message.author.username}\``)
client.channels.get('KAYIT KANAL LOG').send(embed)
};

exports.conf = {
enabled: true,
guildOnly: true,
aliases: ['k'],
permLevel: 0
};
exports.help = {
name: "e",
description: "SefaBotsKayıt Sistemi",
usage: "SefaBots Kayıt"
};
