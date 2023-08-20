const { Client, EmbedBuilder, PermissionsBitField ,Discord} = require("discord.js");
const db = require("croxydb")
module.exports = {
    name: "rol-log-ayarla",
    description: "rol-Log sistemini ayarlarsınız!",
    type: 1,
    options: [
    
        {
            name: "rol-log",
            description: "rol-log kanalını ayarlarsınız!",
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
    
    const rol = db.fetch(`rol-log_${interaction.guild.id}`)
    interaction.reply("❌ | Bu sistem zaten açık?")

    const basarili = new EmbedBuilder()
     .setColor("Random")
    .setTitle('Başarılı!')
    .setDescription('Log sistemi başarıyla ayarlandı!')
    interaction.reply({ embeds: [basarili] })

    const rollog = interaction.options.getChannel('rol-log')

    db.set(`rol-log_${interaction.guild.id}`, rollog.id)
    }
}

