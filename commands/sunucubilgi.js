const {  EmbedBuilder, PermissionsBitField, ActionRowBuilder,ButtonBuilder} = require("discord.js");
const moment = require("moment")
moment.locale("TR")

module.exports = {
    name: "sunucu-bilgi",
    description: 'Sunucu bilgilerine bakarsınız.',
    type: 1,
    options: [],
  run: async(client, interaction) => {
    const owner = interaction.guild.members.cache.get(interaction.guild.ownerId); 

     const embed = new  EmbedBuilder()
     .setAuthor(interaction.guild , " Sunucu Bilgileri")
     .addFields([
      {
        name: `Kanal Sayıları: [\`${interaction.guild.channels.cache.size.toLocaleString()}\`]`,
        value: "deneme", 
        inline: true
      },
      {
        name: "Sunucu Sahibi: ",
        value:":yellow_cicle:" + `${owner} ` ,
        inline: true
      },
      {
        name: "Sunucu Kuruluş:", 
        value: `\`${moment.utc(interaction.guild.createdTimestamp).format("LLLL")}\``,
        inline: true 
      },
      {
        name: "Toplam Üyeler:", 
        value: "deneme",
        inline: true   
      },
      {
        name: "Sunucu Bölgesi", 
        value: "dneöme" , 
        inline: true
      },
      {
        name: "Toplam Yasaklı:",
        value: "deneme" , 
        inline: true  
      },
      {
        name: "Toplam Roller:",
        value: `\`${interaction.guild.roles.cache.size}\``, 
        inline: false
      },
     ])
     .setThumbnail(interaction.guild.iconURL())
     interaction.reply({ embeds: [embed] });

  //
 //  Kanal Sayıları: \`${interaction.guild.channels.cache.size.toLocaleString()}\`
  //  Emoji Sayısı: \`${interaction.guild.emojis.cache.size}\`
 // Rol Sayısı: \`${interaction.guild.roles.cache.size}\`
  //  Kuruluş: \`${moment.utc(interaction.guild.createdTimestamp).format("LLLL")}\``
  //  .setThumbnail(interaction.guild.iconURL()

    }
  }