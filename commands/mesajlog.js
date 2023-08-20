const { Client, EmbedBuilder, PermissionsBitField ,Discord} = require("discord.js");
const db = require("croxydb")
module.exports = {
    name: "mesaj-log-ayarla",
    description: "mesaj-Log sistemini ayarlarsınız!",
    type: 1,
    options: [
      
        {
            name: "mesaj-log",
            description: "Mesaj log kanalını ayarlarsınız!",
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


    if(!bansistem) return interaction.reply(" ❌ | Bu sistem zaten açık?" )
    const mesajlog = interaction.options.getChannel('mesaj-log')

    const basarili = new EmbedBuilder()

    .setColor("Random")
    .setTitle("Başarıyla Ayarlandı!")
    .setDescription("Log sistemi başarıyla ayarlandı!")
    interaction.reply({ embeds: [basarili] })

    db.set(`mesaj-log_${interaction.guild.id}`, mesajlog.id)
    }
}

