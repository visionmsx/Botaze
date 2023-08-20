const { InteractionType ,readdirSync} = require("discord.js");
const fs = require("fs");
module.exports = async(client, interaction) => {
if(!interaction.guild) return;
if(interaction.user.bot) return;

if (interaction.type === InteractionType.ApplicationCommand) {
fs.readdir("./commands", (err, files) => {
if (err) throw err;
files.forEach(async (f) => {
let props = require(`../commands/${f}`);
if (interaction.commandName.toLowerCase() === props.name.toLowerCase()) {
try {
return props.run(client, interaction);
} catch (e) {
return interaction.reply({ content: `ERROR\n\n\`\`\`${e.message}\`\`\``, ephemeral: true }).catch(e => { })
}
}
});
});
}



const { ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const Discord = require("discord.js");
const cooldownedUsers = new Discord.Collection();



    if(interaction.isSelectMenu()) {
        if(interaction.customId === "help_menu") {

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
                            label: 'Log & Engel',
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

        const value = interaction.values

            if(value[0] === "second_option") {
                
    
    
            const embed = new EmbedBuilder()
            .setColor("#5865F2")
            .setTitle(`${client.user.username} - Yardım Menüsü!`)
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: '/ban', value: 'Bir üyeyi banlar.', inline: true },
                { name: '/unban', value: 'Bir üyenin banını kaldırır.', inline: true },
                { name: '/kick', value: 'Bir üyeyi sunucudan atar.', inline: true },
                { name: '/sil', value: "'Belirttiğiniz sayı kadar mesajı siler.", inline: true },
                { name: '/oto-cevap ', value: "Oto-cevap ayarlarsın. ", inline: true },
            )
            .setFooter({ text: `${interaction.user.tag} tarafından istendi.`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp()
    
                    interaction.update({ embeds: [embed], components: [row] })
            }

            if(value[0] === "first_option") {


            const embed = new EmbedBuilder()
            .setColor("#5865F2")
            .setTitle(`${client.user.username} - Yardım Menüsü!`)
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .addFields(
            { name: 'Yakında', value: ':/ ', inline: true },
          
            )
            .setFooter({ text: `${interaction.user.tag} tarafından istendi.`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp()

                interaction.update({ embeds: [embed], components: [row] })
            }

            if(value[0] === "third_option") {
                const embed = new EmbedBuilder()
            .setColor("#5865F2")
            .setTitle(`${client.user.username} - Yardım Menüsü!`)
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: '/avatar', value: 'Birinin veya kendi avatarını görüntülersin.', inline: true },
                { name: '/afk', value: 'Afk olursun.', inline: true },
                { name: '/sunucu', value: 'Sunucu bilgilerini gösterir.', inline: true },
                { name: '/ping', value: 'Botun pingini gösterir.', inline: true },
                { name: '/yardım', value: 'Botun yardım menüsünü gösterir.', inline: true },
            )
            .setFooter({ text: `${interaction.user.tag} tarafından istendi.`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp()
    
                    interaction.update({ embeds: [embed], components: [row] })
            }
        

            if(value[0] === "4_option") {
            const embed = new EmbedBuilder()
            .setColor("#5865F2")
            .setTitle(`${client.user.username} - Yardım Menüsü!`)
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .addFields(
            { name: '/ban-log-aç', value: 'ban-log sistemini açarsın', inline: true },
            { name: '/ban-log-kapat', value: 'ban-log sistemini kapatırsın.', inline: true },
            { name: '/emoji-log-aç', value: 'emoji-log sistemini açarsın.', inline: true },
            { name: '/emoji-log-kapat', value: 'emoji-log sistemini kapatırsın.', inline: true },
            { name: '/giriş-çıkış-log-aç', value: 'giriş-çıkış-log sistemini açarsın.', inline: true },
            { name: '/giriş-çıkış-log-kapat', value: 'giriş-çıkış-log sistemini kapatırsın.', inline: true },
            { name: '/kanal-log-aç', value: 'kanal-log sistemini açarsın.', inline: true },
            { name: '/kanal-log-kapat', value: 'kanal-log sistemini kapatırsın.', inline: true },
            { name: '/mesaj-log-aç', value: 'mesaj-log sistemini açarsın.', inline: true },
            { name: '/mesaj-log-kapat', value: 'mesaj-log sistemini kapatırsın.', inline: true },
            { name: '/rol-log-aç', value: 'rol-log sistemini açarsın.', inline: true },
            { name: '/rol-log-kapat', value: 'rol-log sistemini kapatırsın.', inline: true },
            { name: '/küfür-engel-aç-kapat', value: 'küfür-engel sistemini kapatır yada açarsın.', inline: true },
            { name: '/dosya-engel-aç-kapat', value: 'dosya-engel sistemini kapatır yada açarsın.', inline: true },
            { name: 'reklam-engel-aç-kapat', value: 'reklam-engel sistemini kapatır yada açarsın.', inline: true },
            
            
         )
            .setFooter({ text: `${interaction.user.tag} tarafından istendi.`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp()

            interaction.update({ embeds: [embed], components: [row] })
            }

         if(value[0] === "5_option") {
            const embed = new EmbedBuilder()
            .setColor("#5865F2")
            .setTitle(`${client.user.username} - Yardım Menüsü!`)
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .addFields(
            { name: '/ticket-kur', value: 'ticket sistemini kurarsın', inline: true },
            { name: '/ticket-sıfırla', value: 'ticket sistemini sıfırlarsın', inline: true },
            )
            .setFooter({ text: `${interaction.user.tag} tarafından istendi.`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp()

            interaction.update({ embeds: [embed], components: [row] })
         }
        if(value[0] === "6_option") {
            const embed = new EmbedBuilder()
            .setColor("#5865F2")
            .setTitle(`${client.user.username} - Yardım Menüsü!`)
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .addFields(
            { name: 'Yakında', value: ':/', inline: true },
            )
            .setFooter({ text: `${interaction.user.tag} tarafından istendi.`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp()

            interaction.update({ embeds: [embed], components: [row] })
        }
    
    }

        
    }
}
