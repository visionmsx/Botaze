const { Client, EmbedBuilder, PermissionsBitField ,Discord} = require("discord.js");
const db = require("croxydb")
module.exports = {
    name: "giriş-çıkış-log-ayarla",
    description: "giriş-çıkış-Log sistemini ayarlarsınız!",
    type: 1,
    options: [
        {
            name: "girişçıkış-log",
            description: "giriş-sçıkış-log kanalını ayarlarsınız!",
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

    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) 
    interaction.reply({ embeds: [yetki], ephemeral: true })

    const bansistem = db.fetch(`girişçıkış-log_${interaction.guild.id}`)
    if(!bansistem) 
    interaction.reply("❌| Bu sistem zaten açık?")

    const basarili = new EmbedBuilder()
    .setColor("Random")
    .setTitle("Başarılı!")
    .setDescription("Log sistemi başarıyla ayarlandı!")
    interaction.reply({ embeds: [basarili] })
    

    const giriş = interaction.options.getChannel('girişçıkış-log')


    db.set(`girişçıkış-log_${interaction.guild.id}`, giriş.id)
    }
}

