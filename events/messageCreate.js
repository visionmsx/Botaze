const db = require("croxydb");
const { PermissionFlagsBits, EmbedBuilder, Events, PermissionsBitField ,SelectMenuBuilder } = require("discord.js");
const Discord = require("discord.js")

module.exports = async (client, message, msg) => {
  
  
    if(message.author.bot) return;
    if(!message.guild) return; 

 //---------------------------REKLAM ENGEL SİSTEMİ----------------------------\

  let reklamlar = db.fetch(`reklamengel_${message.guild.id}`)
    
  if(reklamlar) {

  const linkler = [
  
  ".com.tr",
  ".net",
  ".org",
  ".tk",
  ".cf",
  ".gf",
  "https://",
  ".gq",
  "http://",
  ".com",
  ".gg",
  ".porn",
  ".edu"
     
  ]

  if(linkler.some(alo => message.content.toLowerCase().includes(alo))) {
    if(message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return;
    if(message.author?.bot) return;
  message.delete()
  const embed = new EmbedBuilder()
  .setDescription(`❌| Hey <@${message.author.id}>, Reklam Yapmamalısın.`)
  .setColor("Random")
  const fa = await message.reply({ embeds: [embed] })
  setTimeout(() => {
    fa.delete();
  }, 5000); // 5000 milisaniye (5 saniye) sonra silinir
  }
  }

  //---------------------------DOSYA ENGEL SİSTEMİ----------------------------\
  
   let dosya = db.fetch(`dosyaengel_${message.guild.id}`)
   if(dosya) {
    if(message.author?.bot) return;
    if (message.attachments.size >= 1) {
    if(message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return;
    message.delete()
  const embod = new EmbedBuilder()
  .setDescription(`❌| Hey <@${message.author.id}>, Dosya Göndermemelisin.`)
  .setColor("Random")
  const ca = await message.reply({ embeds: [embod] })
  setTimeout(() => {
    ca.delete();
  }, 5000); // 5000 milisaniye (5 saniye) sonra silinir
  
  }
  }

 //---------------------------KÜFÜR ENGEL SİSTEMİ----------------------------\
 
 let kufur = db.fetch(`kufurengel_${message.guild.id}`);
    
 if (kufur) {
   const kufurler = [
     "amk",
     "piç",
     "yarrak",
     "oç",
     "göt",
     "amq",
     "yavşak",
     "amcık",
     "amcı",
     "orospu",
     "sikim",
     "sikeyim",
     "aq", 
     "mk"
   ];
   
   if (kufurler.some(alo => message.content.toLowerCase().includes(alo))) {
     if (message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return;
     if (message.author?.bot) return;
     message.delete();
 
     const embog = new EmbedBuilder()
       .setDescription(`❌| Hey <@${message.author.id}>, Küfür Etmemelisin.`)
       .setColor("Random");
 
     const ja = await message.channel.send({ embeds: [embog] });
     setTimeout(() => {
       ja.delete();
     }, 5000); // 5000 milisaniye (5 saniye) sonra silinir
   }
 }
 

 let selaamlar = message.content.toLowerCase()  
      if(selaamlar === 'sa' || selaamlar === 'slm' || selaamlar === 'sea' || selaamlar === ' selamünaleyküm' || selaamlar === 'Selamün Aleyküm' || selaamlar === 'selam'){
      
      message.channel.send(`<@${message.author.id}> Aleykümselam, Hoşgeldin `)
      }
    

 //---------------------------AFK SİSTEMİ----------------------------\
 
  if (await db.get(`afk_${message.author.id}`)) {
    
  const afkDate = db.fetch(`afkDate_${message.author.id}`)
  const sebep = db.fetch(`afk_${message.author.id}`)
  
  if (afkDate && sebep) {
      const date = new EmbedBuilder()
      .setDescription(`${message.author} Hoş geldin! **${sebep}** sebebiyle <t:${parseInt(afkDate.date / 1000)}:R> afk'ydın`)
      db.delete(`afk_${message.author.id}`);
      db.delete(`afkDate_${message.author.id}`)
  
  return message.reply({ embeds: [date] })
  }

   }

  var kullanıcı = message.mentions.users.first();
  if (kullanıcı) {
  const afkDate = db.fetch(`afkDate_${kullanıcı.id}`)

  const sebep = await db.get(`afk_${kullanıcı.id}`);

  if (sebep) {
  const sebeps = new EmbedBuilder()
  .setDescription(`🤦‍♀️ | Etiketlediğin kullanıcı **${sebep}** sebebiyle afk modunda!`)
  message.reply({ embeds: [sebeps] });
  }
  }

 //---------------------------SORU-CEVAP SİSTEMİ----------------------------\\

 if(message.content === db.fetch(`soruMesaj_${message.guild.id}_${message.content}`).soru) {
  message.reply({ content: `${db.fetch(`soruMesaj_${message.guild.id}_${message.content}`).cevap}` })



 }
}