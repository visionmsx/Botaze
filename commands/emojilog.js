const { Client, EmbedBuilder, PermissionsBitField ,Discord} = require("discord.js");
const db = require("croxydb")
module.exports = {
    name: "emoji-log-ayarla",
    description: "emoji-Log sistemini ayarlarsınız!",
    type: 1,
    options: [
        {
            name: "emoji-log",
            description: "emoji-log kanalını ayarlarsınız!",
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
    const bansistem = db.fetch(`emoji-log_${interaction.guild.id}`)

    if(!bansistem)
    
    interaction.reply("❌ | Bu sistem zaten açık?")

    const basarili = new EmbedBuilder()
    .setColor("Random")
    .setTitle("Başarılı!")
    .setDescription("Log sistemi başarıyla ayarlandı!")
    interaction.reply({ embeds: [basarili] })

    const emojilog = interaction.options.getChannel('emoji-log')



    db.set(`emoji-log_${interaction.guild.id}`, emojilog.id)
    }
}

