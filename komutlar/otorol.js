const Discord = require('discord.js')
const db = require('quick.db');
const ayarlar = require('../ayarlar.json')

exports.run = async(client, message, args) => {

      if (!message.guild) {
    const ozelmesajuyari = new Discord.RichEmbed()
    .setColor(0x2488E7)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('Bu Komutu Burada Kullanamazsın.').then(msg => msg.delete(5000));
    return message.author.sendEmbed(ozelmesajuyari); }

  if (message.member.hasPermission('ADMINISTRATOR') || message.author.id == "360322989515866112"){
    if (!args[0]) return message.channel.send("Lütfen **no.otorol ayarla** veya **no.otorol kapat** Yazınız").then(msg => msg.delete(5000));
  
  if (args[0] == 'ayarla') {
  
 let rol = message.mentions.roles.first() || message.guild.roles.get(args.join(' '))
  let newRole;
  let tworole;
  if (!rol) return message.channel.send('Otorol Ayarlamak İçin Bir Rol Etiketle `no.otorol ayarla @Üye #kanal`').then(msg => msg.delete(5000));
  else newRole = message.mentions.roles.first().id
  let isim = message.mentions.roles.first().name  
  let otorolkanal = message.mentions.channels.first();
  if (!otorolkanal) return message.channel.send('Otorol Ayarlamak İçin Bir Kanal Ekle `no.otorol ayarla @Üye #kanal`').then(msg => msg.delete(5000));
    db.set(`otorolisim_${message.guild.id}`, isim)
  let i = await  db.set(`otorolKanal_${message.guild.id}`, message.mentions.channels.first().id)
  let otorol = await db.set(`autoRole_${message.guild.id}`, newRole)
  if (!message.guild.roles.get(newRole)) return message.channel.send("Etiketlediğiniz Rolu Bulamadım \n(Eğer Rol Doğru Olduğu Halde Bulmuyorsa Botun Üstünlüğünü Yükseltin Veya Yetkilerini Arttırın)").then(msg => msg.delete(5000));
    message.channel.send(`Otorol <@&${newRole}> \nMesaj Kanalı <#${i}> Olarak Ayarlandı. \n(Otorol Kapatmak İçin no.otorol kapat) \nEğer Rolu Vermiyorsa Botun Üstünlüğünü Yükseltin veya Yetkilerini Arttırın`).then(msg => msg.delete(5000));
     
  }

  if (args[0] == 'kapat') {

    
    db.delete(`otorolisim_${message.guild.id}`)
        db.delete(`otorolKanal_${message.guild.id}`)
    db.delete(`autoRole_${message.guild.id}`)

    message.channel.send(`Otorolü Başarıyla Kapattım.`)
  }
    
  }else{
    message.channel.send('Üzgünüm **ADMINISTRATOR** Yetkin Yok').then(msg => msg.delete(5000));
  }

};
  
  
    
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['oto-rol'],
    permLevel: 0
}

exports.help = {
    name: 'otorol',
    description: 'Sunucuya giren kullanıcıya seçtiğiniz rolü otomatik verir.',
    usage: 'otorol'
}