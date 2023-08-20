const { Client, EmbedBuilder, PermissionsBitField ,Discord} = require("discord.js");
const db = require("croxydb")
module.exports = {
    name: "ban-log-ayarla",
    description: "ban-Log sistemini ayarlarsınız!",
    type: 1,
    options: [
        {
            name: "ban-log",
            description: "ban-log kanalını ayarlarsınız!",
            type: 7,
            required: true,
            channel_types: [0]
        },
    ],

    run: async (client, interaction) => {

    const yetki = new EmbedBuilder()
        .setColor("Red")
        .setTitle("Yetersiz Yetki!")
        .setDescription("> Bu komutu kullanabilmek için `Yönetici` yetkisine sahip olmalısın!")

    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetki], ephemeral: true })
    
    const bansistem = db.fetch(`ban-log_${interaction.guild.id}`)

    if(!bansistem) 
    interaction.reply("❌ |Bu sistem zaten açık?")
    
    const basarili = new EmbedBuilder()
  
    .setColor("Random")
    .setTitle("Başarılı!")
    .setDescription("Log sistemi başarıyla ayarlandı!")
interaction.reply({ embeds: [basarili] })



    const ban = interaction.options.getChannel('ban-log')

    db.set(`ban-log_${interaction.guild.id}`, ban.id)

}
}

