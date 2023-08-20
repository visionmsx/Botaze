
const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const db = require("croxydb")
module.exports = {
  name: "dosya-engel",
  description: " Dosya Engel Sistemini Açıp Kapatırsın!",
  type: 1,
  options: [
    {
      type: 3,
      name: "seçenek",
      description: "Sistemi kapatacak mısın yoksa açacak mısın?",
      required: true,
      choices: [
        {
          name: "Aç",
          value: "ac"
        },
        {
          name: "Kapat",
          value: "kapat"
        }
      ]
    }
  ],

  run: async(client, interaction) => {
    if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) return interaction.reply({content: "❌ | Rolleri Yönet Yetkin Yok!", ephemeral: true})
 
    const reklamEngelSystemTrue = interaction.options.getString("seçenek");
    const reklamEngelSystem = db.fetch(`dosyaengel_${interaction.guild.id}`)

    switch(reklamEngelSystemTrue) {
      case "ac": {
                const reklamEngelSystem = db.fetch(`dosyaengel_${interaction.guild.id}`)
        const reklamEngelSystemDate = db.fetch(`dosyaengel_${interaction.guild.id}`)
        
        if (reklamEngelSystem && reklamEngelSystemDate) {
            const date = new EmbedBuilder()
            .setDescription(` ❌ | Bu sistem <t:${parseInt(reklamEngelSystemDate.date / 1000)}:R> önce açılmış!`)
        
        return interaction.reply({ embeds: [date] })
        }
  
        db.set(`dosyaengel_${interaction.guild.id}`, true)
		db.set(`dosyaengel_${interaction.guild.id}`, { date: Date.now() })
        return interaction.reply({ content: "✔| Başarılı bir şekilde sistem açıldı!" });
      }
  
      case "kapat": {
        if(!reklamEngelSystem) return interaction.reply({ content: " ❌ | Bu sistem zaten kapalı?" });
  
        db.delete(`dosyaengel_${interaction.guild.id}`)
		db.delete(`dosyaengel_${interaction.guild.id}`)
        return interaction.reply({ content: "✔ | Başarılı bir şekilde sistem kapatıldı!" });
      }
    }
  }
    };