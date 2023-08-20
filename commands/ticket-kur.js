const Discord = require("discord.js")
const { EmbedBuilder ,readdirSync} = require("discord.js");
module.exports = {
  name: "ticket-kur",
  description: "Ticket Sistemini Kurar!",
  type: 1,
  options: [],
  run: async (client, interaction) => {


    await interaction.deferReply();
    const { user, options, guild } = interaction;

    if(!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator, false)) {
      return interaction.followUp({ content: "❌ **|** Bu komutu kullanmak için gerekli izinleri karşılayamıyorsun.", ephemeral: true })
    }

    const row = new Discord.ActionRowBuilder()
    .addComponents(
      new Discord.ButtonBuilder()
        .setCustomId(`onayla_${user.id}`)
        .setLabel('✅ Onaylıyorum, sistemi kur.')
        .setStyle(Discord.ButtonStyle.Primary),
        new Discord.ButtonBuilder()
        .setCustomId(`reddet_${user.id}`)
        .setLabel('❌ Hayır, sistemi kurma.')
        .setStyle(Discord.ButtonStyle.Secondary),
    );

  const embed = new Discord.EmbedBuilder()
  .setAuthor({ name: `${client.user.username} | Ticket Setup`, iconURL: `${client.user.displayAvatarURL({ dynmaic: true })} ` })
  .setTitle(`❔ | Ticket sistemi kuruluyor eminmisin?`)
  .setDescription(`\`-\` Şuan ticket sistemini kurmak için 1 adım kaldı. Ben senin için log kanalı Oluşturucam . Sistemi kurmak için onayla!! \n\n`)
  .setFooter({ text: `Sorgulayan: ${user.tag}`, iconURL: `${user.displayAvatarURL({ dynmaic: true })}` })
  .setTimestamp()
  
 

  return interaction.followUp({ embeds: [embed], components: [row], fetchReply: true });
  }
}
