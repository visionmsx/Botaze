const { Embed, EmbedBuilder } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Bot'un ping değerlerini gösterir.",
    options: [],
    
    run: async(client, interaction) => {
      await interaction.deferReply();
      
      const { user, options, guild } = interaction;
      const embed =new EmbedBuilder()
      .setDescription( `Pong! \`${client.ws.ping}ms\` `)
      .setColor("Random")
      return interaction.followUp({ embeds: [embed] })
    }
  }