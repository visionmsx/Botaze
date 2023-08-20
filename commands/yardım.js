const { ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
module.exports = {
    name: "yardım",
    description: "Botun Yardım Menüsü!",
    type: 1,
    options: [],
    run: async (client, interaction) => {
  
    const row = new ActionRowBuilder()
			.addComponents(
				new StringSelectMenuBuilder()
					.setCustomId('help_menu')
					.setPlaceholder('♦ Komutlar')
					.addOptions(
                        {
							label: 'Moderasyon',
                            emoji: "🤖",
							value: 'second_option',
						},
						{
							label: 'Eğlence',
                            emoji: "🦾",
							value: 'first_option',
						},
						{
							label: 'Kullanıcı',
                            emoji: "👥",
							value: 'third_option',
						},
                        {
                            label: 'Log',
                            emoji: "🤖",
                            value: '4_option',
                        },
                        {
                            label:'Destek',
                            emoji: '🦾', 
                            value: '5_option',
                        },
                        {
                            label: 'Çekiliş',
                            emoji: "🦾",
                            value: '6_option',
                        },
					),
			);


    const embed = new EmbedBuilder()
        .setColor("#5865F2")
        .setTitle(`${client.user.username} - Yardım Menüsü!`)
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        .setDescription("Kafan mı karıştı. O zaman doğru yerdesin dostum burdan yardım alabilirsin :heart: ")

        .addFields([
            {name: "Prefix Komutlar", value: "Prefix Komutlar Yakında!! Aşağıdaki Menüden Uygulama Komutları Yardımını Alabilirsin "},
            {name: "Moderasyon", value: "B!mod", inline: false } , 
            {name: "Rank Sistemi" , value: "B!rank" , inline: false} , 
            {name: "Kayıt Sistemi" , value: "B!kayıt" , inline: false} , 
            {name: "Log Sistemi" , value: "B!log" , inline: false} , 
            {name: "Çekiliş Sistemi" , value: "B!çekiliş" , inline: false} , 
            {name: "Özel-Oda Sistemi" , value: "B!özeloda" , inline: false} , 
        ])   
        .setFooter({ text: `${interaction.user.tag} tarafından istendi.`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
        .setTimestamp()

     interaction.reply({ embeds: [embed], components: [row] });

}
}