const { Client, EmbedBuilder, PermissionsBitField ,Discord} = require("discord.js");
const db = require("croxydb")
module.exports = {
    name: "kanal-log-aç",
    description: "kanal-log sistemini açarsınız.!",
    type: 1,
    options: [
        {
            name: "kanal-log",
            description: "kanal log kanalını ayarlarsınız!",
            type: 7,
            required: true,
            channel_types: [0]
        },
    ],

    run: async ( cliet, interaction) => {
      
        
    const yetki = new EmbedBuilder()
        .setColor("Red")
        .setTitle("Yetersiz Yetki!")
        .setDescription("> Bu komutu kullanabilmek için `Yönetici` yetkisine sahip olmalısın!")

    
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator))
    interaction.reply({ embeds: [yetki], ephemeral: true })

    const bansistem = db.fetch(`kanal-log_${interaction.guild.id}`)
    
    if(!bansistem)
    interaction.reply({content:"❌|Bu sistem zaten açık?" })

    const basarili = new EmbedBuilder()
    
    .setColor("Random")
    .setTitle("Başarılı!")
    .setDescription("Log sistemi başarıyla Açıldı!")
    interaction.reply({ embeds: [basarili] })
   

    const sa = interaction.options.getChannel('kanal-log');

    db.set(`kanal-log_${interaction.guild.id}`, sa.id);
      
      

      

    }
}