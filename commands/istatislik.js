const { Client, EmbedBuilder } = require("discord.js");
const moment = require("moment");
  require("moment-duration-format");

  const os = require("os");

module.exports = {
  name: "istatistik",
  description: "Botun istatistiklerine bakarsın.",
  type: 1,
  options: [],

  run: async(client, interaction) => {

    const uptime = moment
    .duration(client.uptime)
    .format(" D [gün], H [saat], m [dakika], s [saniye]");

    const embed = new EmbedBuilder()
    .addFields({ name: 'Bot Sahibi', value: "```Mehdi```", inline: false})
    .addFields({ name: 'Bellek Kullanımı', value:  `${(process.memoryUsage().heapUsed /1024 /512).toFixed(2)}MB`  , inline: true})
    .addFields({ name: 'Uptime Süresi', value: `${uptime}`, inline: true})
    .addFields({ name: 'Kullanıcılar', value: `${client.users.cache.size}`, inline: true})
    .addFields({ name: 'Sunucular', value:  `${client.guilds.cache.size}` , inline: true})
    .addFields({ name: 'İşletim Sistemi', value: `Windows`, inline: true})
    .addFields({ name: 'Ping', value: `${client.ws.ping}`, inline: true})
    interaction.reply({embeds: [embed]})

  }

};