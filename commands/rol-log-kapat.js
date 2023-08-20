const { Client, EmbedBuilder, PermissionsBitField ,Discord} = require("discord.js");
const db = require("croxydb")
module.exports = {
    name: "rol-log-kapat",
    description: "rol-Log sistemini kapatırsınız!",
    type: 1,

    run: async (client, interaction) => {
        
    const yetki = new EmbedBuilder()
        .setColor("Red")
        .setTitle("Yetersiz Yetki!")
        .setDescription("> Bu komutu kullanabilmek için `Yönetici` yetkisine sahip olmalısın!")

    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetki], ephemeral: true })
    const bansistem = db.fetch(`rol-log_${interaction.guild.id}`)
    if(!bansistem) return interaction.reply(" ❌ | Bu sistem zaten kapalı?")
    const basarili = new EmbedBuilder()
    .setColor("Random")
    .setTitle("Başarılı!")
    .setDescription("Log sistemi başarıyla kapaıldı!")

    interaction.reply({ embeds: [basarili] })

    if(!bansistem) return interaction.reply(" ❌| Bu sistem zaten kapalı?" );

    db.delete(`rol-log_${interaction.guild.id}`)
    }
}
