const { Client, GatewayIntentBits, Partials , EmbedBuilder , Collection,  ButtonBuilder , Discord ,PermissionsBitField ,isButton,ActionRowBuilder} = require("discord.js");
const {token} = require("./config.js");
const db = require("croxydb");1
const fs = require("fs");
const interactionCreate = require("./events/interactionCreate.js");
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});




client.commands = [];
fs.readdir("./commands", (err, files) => {
if (err) throw err;
files.forEach(async (f) => {
try {
let props = require(`./commands/${f}`);
client.commands.push({
name: props.name,
description: props.description,
options: props.options
});
} catch (err) {
console.log(err);
}
});
});

//---------------------------LOG SİSTEMİ----------------------------\\

client.on('messageDelete', async (messageLink) => {

  if(messageLink.author.bot) return;
  const mesajlog = db.get(`mesaj-log_${messageLink.guild.id}`)
  if(!mesajlog) return;

  const embed = new EmbedBuilder()
  .setAuthor({ name: `Bir Mesaj Silindi`, iconURL: messageLink.author.displayAvatarURL()})
  .setThumbnail("https://media.discordapp.net/attachments/1126544377137877147/1126548000991363142/botototoototot.png?width=468&height=468")
  .setDescription(`${messageLink.channel} kanalında bir mesaj silindi.\nMesaj içeriği: \`${messageLink}\`\nMesaj sahibi: ${messageLink.author}`)
  client.channels.cache.get(mesajlog).send({ embeds: [embed] })
})

client.on('messageUpdate', async (messageLink, message) => {

  if(messageLink.author.bot) return;
  const mesajlog = db.get(`mesaj-log_${messageLink.guild.id}`)
  if(!mesajlog) return;

  const embed = new EmbedBuilder()
  .setAuthor({ name: `Bir Mesaj Güncellendi`, iconURL: messageLink.guild.iconURL()})
  .setThumbnail("https://media.discordapp.net/attachments/1126544377137877147/1126548000991363142/botototoototot.png?width=468&height=468")
  .setDescription(`${messageLink.channel} kanalında bir mesaj güncellendi.\n\`${messageLink}\` mesajı \`${message}\` olarak değiştirildi.\nMesaj sahibi: ${messageLink.author}`)
  client.channels.cache.get(mesajlog).send({ embeds: [embed] })
})

client.on('messageBulkDelete', async (messageLink, message) => {

  if(messageLink.author.bot) return;
  const mesajlog = db.get(`mesaj-log_${messageLink.guild.id}`)
  if(!mesajlog) return;

  const embed = new EmbedBuilder()
  .setAuthor({ name: `Toplu Mesaj Silindi`, iconURL: messageLink.guild.iconURL()})
  .setDescription(`${messageLink.channel} kanalında mesaj silindi.\n\`${messageLink.size}\` tane mesaj silindi.`)
  client.channels.cache.get(mesajlog).send({ embeds: [embed] })
})




client.on('channelCreate', async (channelLink) => {

  const kanallog = db.get(`kanal-log_${channelLink.guild.id}`)
  if(!kanallog) return;

  // Get the channel creator from the audit logs
  const logs = await channelLink.guild.fetchAuditLogs({type: 10}); // Use 10 instead of 'CHANNEL_CREATE'
  const entry = logs.entries.first();
  const creator = entry ? entry.executor : 'Unknown';

  const embed = new EmbedBuilder()
  .setAuthor({ name: channelLink.guild.name  , iconURL: channelLink.guild.iconURL()})
  .setDescription(`Bir kanal oluşturuldu. ${channelLink} \nKanalın idsi: \`${channelLink.id}\`\nKanalın türü: \`${channelLink.type.toString().replace("0", "Yazı Kanalı").replace("2", "Ses Kanalı").replace("4", "Kategori")}\`\n`)
  .setThumbnail(channelLink.guild.iconURL()) 
  .addFields([
     {
      name: "Sorumlu Moderatör:" , 
      value: `${creator}` , 
      inline: false
     }
  ])
  client.channels.cache.get(kanallog).send({ embeds: [embed] })
})



client.on('channelDelete', async (channelLink) => {

  const kanallog = db.get(`kanal-log_${channelLink.guild.id}`)
  if(!kanallog) return;

  const logs = await channelLink.guild.fetchAuditLogs({type: 10}); // Use 10 instead of 'CHANNEL_CREATE'
  const entry = logs.entries.first();
  const creator = entry ? entry.executor : 'Unknown';

  const embed = new EmbedBuilder()
  .setAuthor({ name: `Bir Kanal Silindi`, iconURL: channelLink.guild.iconURL()})
  .setThumbnail(channelLink.guild.iconURL()) 
  .addFields([
     {
      name: "Sorumlu Moderatör:" , 
      value: `${creator}` , 
      inline: false
     }
  ])
  .setDescription(`\`${channelLink.name}\` kanalı silindi.\nKanalın idsi: \`${channelLink.id}\`\nKanalın türü: \`${channelLink.type.toString().replace("0", "Yazı Kanalı").replace("2", "Ses Kanalı").replace("4", "Kategori")}\``)
  client.channels.cache.get(kanallog).send({ embeds: [embed] })
})



client.on('channelUpdate', async (channelLink, channel) => {

  const kanallog = db.get(`kanal-log_${channelLink.guild.id}`)
  if(!kanallog) return;

  const logs = await channelLink.guild.fetchAuditLogs({type: 10}); // Use 10 instead of 'CHANNEL_CREATE'
  const entry = logs.entries.first();
  const creator = entry ? entry.executor : 'Unknown';
  const embed = new EmbedBuilder()

  .setAuthor({ name: `Bir Kanal Güncellendi`, iconURL: channelLink.guild.iconURL()})
  .setThumbnail(channelLink.guild.iconURL()) 
  .addFields([
     {
      name: "Sorumlu Moderatör:" , 
      value: `${creator}` , 
      inline: false
     }
  ])
  .setDescription(`\`#${channelLink.name}\` kanalı ${channel} olarak değiştirildi.\nKanalın idsi: \`${channelLink.id}\`\nKanalın türü: \`${channelLink.type.toString().replace("0", "Yazı Kanalı").replace("2", "Ses Kanalı").replace("4", "Kategori")}\``)
  client.channels.cache.get(kanallog).send({ embeds: [embed] })
})

client.on('channelPinsUpdate', async (channelLink, channelPins) => {

  const kanallog = db.get(`kanal-log_${channelLink.guild.id}`)
  if(!kanallog) return;

  const logs = await channelLink.guild.fetchAuditLogs({type: 10}); // Use 10 instead of 'CHANNEL_CREATE'
  const entry = logs.entries.first();
  const creator = entry ? entry.executor : 'Unknown';

  const embed = new EmbedBuilder()
  .setAuthor({ name: `Bir Mesaj Sabitlendi`, iconURL: channelLink.guild.iconURL()})
  .setThumbnail(channelLink.guild.iconURL()) 
  .addFields([
     {
      name: "Sorumlu Moderatör:" , 
      value: `${creator}` , 
      inline: false
     }
  ])
  .setDescription(`${channelLink} kanalında [Bu Mesaj](https://discord.com/channels/1067022779481870357/1068817883381108837/${channelPins}) sabitlendi.`)
  client.channels.cache.get(kanallog).send({ embeds: [embed] })
})

client.on('roleCreate', async (roleMention) => {

  const rollog = db.get(`rol-log_${roleMention.guild.id}`)
  if(!rollog) return;

  const logs = await roleMention.guild.fetchAuditLogs({type: 10}); // Use 10 instead of 'CHANNEL_CREATE'
  const entry = logs.entries.first();
  const creator = entry ? entry.executor : 'Unknown';

  const embed = new EmbedBuilder()
  .setAuthor({ name: `Bir Rol Oluşturuldu`, iconURL: roleMention.guild.iconURL()})
  .setThumbnail(roleMention.guild.iconURL()) 
  .addFields([
     {
      name: "Sorumlu Moderatör:" , 
      value: `${creator}` , 
      inline: false
     }
  ]) 
  .setDescription(`${roleMention} rolü oluşturuldu.\nRolün idsi: ${roleMention.id}\nRolün hex kodu: ${roleMention.hexColor}`)
  client.channels.cache.get(rollog).send({ embeds: [embed] })
})

client.on('roleDelete', async (roleMention) => {

  const rollog = db.get(`rol-log_${roleMention.guild.id}`)
  if(!rollog) return;

  const logs = await roleMention.guild.fetchAuditLogs({type: 10}); // Use 10 instead of 'CHANNEL_CREATE'
  const entry = logs.entries.first();
  const creator = entry ? entry.executor : 'Unknown';

  const embed = new EmbedBuilder()
  .setAuthor({ name: `Bir Rol Silindi`, iconURL: roleMention.guild.iconURL()})
  .setThumbnail(roleMention.guild.iconURL()) 
  .addFields([
     {
      name: "Sorumlu Moderatör:" , 
      value: `${creator}` , 
      inline: false
     }
  ]) 
  .setDescription(`\`${roleMention.name}\` rolü silindi.\nRolün idsi: ${roleMention.id}\nRolün hex kodu: ${roleMention.hexColor}`)
  client.channels.cache.get(rollog).send({ embeds: [embed] })
})

client.on('roleUpdate', async (roleMention, role) => {

  const rollog = db.get(`rol-log_${roleMention.guild.id}`)
  if(!rollog) return;

  const logs = await roleMention.guild.fetchAuditLogs({type: 10}); // Use 10 instead of 'CHANNEL_CREATE'
  const entry = logs.entries.first();
  const creator = entry ? entry.executor : 'Unknown';


  const embed = new EmbedBuilder()
  .setAuthor({ name: `Bir Rol Güncellendi`, iconURL: roleMention.guild.iconURL()})
  .setThumbnail(roleMention.guild.iconURL()) 
  .addFields([
     {
      name: "Sorumlu Moderatör:" , 
      value: `${creator}` , 
      inline: false
     }
  ]) 
  .setDescription(`\`${roleMention.name}\` rolü ${role} olarak güncellendi.\nRolün idsi: ${roleMention.id}\nRolün eski hex kodu: ${roleMention.hexColor}`)
  client.channels.cache.get(rollog).send({ embeds: [embed] })
})

client.on('emojiCreate', async (formatEmoji) => {

  const emojilog = db.get(`emoji-log_${formatEmoji.guild.id}`)
  if(!emojilog) return;

  const embed = new EmbedBuilder()
  .setAuthor({ name: `Bir Emoji Oluşturuldu`, iconURL: formatEmoji.guild.iconURL()})
  .setThumbnail("https://media.discordapp.net/attachments/1126544377137877147/1126548000991363142/botototoototot.png?width=468&height=468")
  .setDescription(`${formatEmoji} emojisi oluşturuldu.\nEmoji adı: \`${formatEmoji.name}\`\nEmoji türü: ${formatEmoji.animated.toString().replace("true","`Hareketli`").replace("false","`Hareketsiz`")}`)
  client.channels.cache.get(emojilog).send({ embeds: [embed] })
})

client.on('emojiDelete', async (formatEmoji) => {

  const emojilog = db.get(`emoji-log_${formatEmoji.guild.id}`)
  if(!emojilog) return;

  const embed = new EmbedBuilder()
  .setAuthor({ name: `Bir Emoji Silindi`, iconURL: formatEmoji.guild.iconURL()})
  .setThumbnail("https://media.discordapp.net/attachments/1126544377137877147/1126548000991363142/botototoototot.png?width=468&height=468")
  .setDescription(`\`${formatEmoji.name}\` emojisi silindi.\nEmoji türü: ${formatEmoji.animated.toString().replace("true","`Hareketli`").replace("false","`Hareketsiz`")}`)
  client.channels.cache.get(emojilog).send({ embeds: [embed] })
})

client.on('emojiUpdate', async (formatEmoji, emoji) => {

  const emojilog = db.get(`emoji-log_${formatEmoji.guild.id}`)
  if(!emojilog) return;

  const embed = new EmbedBuilder()
  .setAuthor({ name: `Bir Emoji Güncellendi`, iconURL: formatEmoji.guild.iconURL()})
  .setThumbnail("https://media.discordapp.net/attachments/1126544377137877147/1126548000991363142/botototoototot.png?width=468&height=468")
  .setDescription(`${formatEmoji} emojisinin adı \`${emoji.name}\` olarak değiştirildi.\nEmojinin eski adı: \`${formatEmoji.name}\``)
  client.channels.cache.get(emojilog).send({ embeds: [embed] })
})

client.on('guildBanAdd', async (user) => {

  const sunuculog = db.get(`ban-log_${user.guild.id}`)
  if(!sunuculog) return;

  const embed = new EmbedBuilder()
  .setAuthor({ name: `Bir Kullanıcı Banlandı`, iconURL: user.user.displayAvatarURL()})
  .setThumbnail("https://media.discordapp.net/attachments/1126544377137877147/1126548000991363142/botototoototot.png?width=468&height=468")
  .setDescription(`Banlanan kişi: <@${user.user.id}> (\`${user.user.id}\` - \`${user.user.username}#${user.user.discriminator}\`)`)
  client.channels.cache.get(sunuculog).send({ embeds: [embed] })
})

client.on('guildBanRemove', async (user) => {

  const sunuculog = db.get(`ban-log_${user.guild.id}`)
  if(!sunuculog) return;

  const embed = new EmbedBuilder()
  .setAuthor({ name: `Bir Kullanıcının Banı Açıldı`, iconURL: user.user.displayAvatarURL()})
  .setThumbnail("https://media.discordapp.net/attachments/1126544377137877147/1126548000991363142/botototoototot.png?width=468&height=468")
  .setDescription(`Banı açılan kişi: <@${user.user.id}> (\`${user.user.id}\` - \`${user.user.username}#${user.user.discriminator}\`)`)
  client.channels.cache.get(sunuculog).send({ embeds: [embed] })
})

client.on('guildMemberAdd', async (member) => {

  const sunuculog = db.get(`girişçıkış-log_${member.guild.id}`)
  if(!sunuculog) return;

  const embed = new EmbedBuilder()
  .setAuthor({ name: `Sunucuya Bir Kullanıcı Katıldı`, iconURL: member.user.displayAvatarURL()})
  .setDescription(`Sunucuya katılan kişi: <@${member.user.id}> (\`${member.user.username}#${member.user.discriminator}\`)`)
  .setThumbnail(member.user.displayAvatarURL())
  client.channels.cache.get(sunuculog).send({ embeds: [embed] })
})
client.on('guildMemberRemove', async (member) => {
  try {
    const sunuculog = db.get(`girişçıkış-log_${member.guild.id}`);
    if (!sunuculog) return;

    const embed = new EmbedBuilder()
      .setAuthor({ name: `Sunucudan Bir Kullanıcı Ayrıldı`, iconURL: member.user.displayAvatarURL() })
      .setDescription(`Sunucudan ayrılan kişi: <@${member.user.id}> (\`\` - \`${member.user.username}#${member.user.discriminator}\`)`)
     
    client.channels.cache.get(sunuculog).send({ embeds: [embed] });
  } catch (error) {
    console.error(error);
  }
});



//---------------------------TİCKET SİSTEMİ----------------------------\\


const codeBlock = (code, ) => {
  return '```'  + '\n' + code + '```';
};
const wixua = require("croxydb");
const wixuadb = require("orio.db")
client.on("interactionCreate" ,  async interaction  => {


  if (!interaction.guild) return;
  
  const { user, customId, guild } = interaction;


  if(interaction.isButton()) {
    if(interaction.customId === `reddet_${interaction.user.id}`) {
      return interaction.update({ content: "`✅` **|** Destek sistemi kurulumu iptal edildi.", embeds: [], components: [] })
    }
    
    if(interaction.customId === `onayla_${interaction.user.id}`) {
      interaction.update({ content: "`✅` **|** Destek sistemi kurulumu başarılı.", embeds: [], components: [] });
      
      const ticketac = new EmbedBuilder()
      .setAuthor({ name: `${guild.name} | Ticket sistemi`, iconURL: `${guild.iconURL({ dynmaic: true })}` })
      .setThumbnail(guild.iconURL({ dynmaic: true }))
      .setDescription(`\`-\` Selam destek talebi açmak için aşşağıdaki butona basınız.\n\n**Unutma:** Gereksiz dışı destek açman senin ceza almana sebep olabilir.`)
      .setFooter({ text: `Kurulumu yapan: ${user.tag}`, iconURL: `${user.displayAvatarURL({ dynmaic: true })}` })
      .setTimestamp()
      
      const ticketacbuton = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`ticketAc_${guild.id}`)
                    .setLabel('Destek talebi oluştur.')
          .setEmoji("🍁")
                    .setStyle("Secondary")
            );
      
      const category = await guild.channels.create({
        name: 'BOTAZE Ticket Log',
        type: 4 ,
        permissionOverwrites: [
          {
            id: interaction.guild.id,
            deny: PermissionsBitField.Flags.ViewChannel,
          },
        ],
      });
      
      const ticketLog = await guild.channels.create({
        name: 'ticket-log',
        type: 0,
        parent: category.id,
        permissionOverwrites: [
          {
            id: interaction.guild.id,
            deny: PermissionsBitField.Flags.ViewChannel
          },
        ],
      });
      
      wixua.set(`ticketKatagor_${guild.id}`, { category:  category.id, log: ticketLog.id });
      wixua.set(`ticketSistem_${guild.id}`, { isOpen: true });
      
      return interaction.channel.send({ embeds: [ticketac], components: [ticketacbuton] })
    }
  }

  if(interaction.customId === `ticketAc_${interaction.guild.id}`) {
      
    const ticketKatagor = wixua.fetch(`ticketKatagor_${guild.id}`);
    const ticketSistem = wixua.fetch(`ticketSistem_${guild.id}`);
    const ticketKullanıcı = wixuadb.fetch(`ticketKullanıcı_${user.id}${guild.id}`);


    if(!ticketSistem) return;
    if(!ticketKatagor) return;
    
    if(ticketKullanıcı) {
      const channelURL = `https://discord.com/channels/${ticketKullanıcı.guildId}/${ticketKullanıcı.channelId} `
      return interaction.reply({ content: `✅ **|** Zaten bir tane [destek kanalı](${channelURL}) oluşturmuşssun.`, ephemeral: true })
    }
    
    const channel = await guild.channels.create({
      name: `ticket-${user.tag}`,
      type:0,
      parent: ticketKatagor.category,
      permissionOverwrites: [
        {
          id: interaction.guild.id,
          deny: PermissionsBitField.Flags.ViewChannel,
        },
         {
          id: user.id,
          allow:  [PermissionsBitField.Flags.ViewChannel , PermissionsBitField.Flags.SendMessages ]
        },
       
      ],
    });

    wixuadb.set(`ticketKullanıcı_${user.id}${guild.id}`, { isTicketAc: true, channelId: channel.id, guildId: guild.id, date: Date.now() });
    wixuadb.set(`ticketKanalKullanıcı_${channel.id}${guild.id}`, { userId: user.id, channelId: channel.id, guildId: guild.id   });
    
    const channelURL = `https://discord.com/channels/${guild.id}/${channel.id} `
    
    const ticketUserEmbed = new EmbedBuilder()
    .setAuthor({ name: `${user.username} | Destek açıldı`, iconURL: `${user.displayAvatarURL({ dynmaic: true })} ` })
    .setThumbnail(guild.iconURL({ dynmaic: true }))
    .addFields([
      {
        name: "Destek açan:",
        value: `${interaction.user}`,
        inline: true
      },
      {
        name: "Açılış zamanı:",
        value: `<t:${parseInt(channel.createdTimestamp / 1000)}:R>`,
        inline: true
      }
    ])
    .setFooter({ text: `Oluşturan: ${client.user.tag}`, iconURL: `${client.user.displayAvatarURL({ dynmaic: true })}` })
    .setTimestamp()
    
    const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId(`ticketKapat_${guild.id}${channel.id}`)
        .setLabel('Destek kapatılsın.')
        .setEmoji("❌")
        .setStyle("Secondary"),
    );
    
    interaction.reply({ content: `✅ |** Senin için bir tane [destek kanalı](${channelURL}) oluşturuldu.**`, ephemeral: true })
    const chnlMessage = await channel.send({content: ` @everyone | ${interaction.user}`, embeds: [ticketUserEmbed], components: [row] })
    
    return chnlMessage.pin()
  }

  if(customId === `ticketKapat_${guild.id}${interaction.channel.id}`) {
      
    const ticketKullanıcı = wixuadb.fetch(`ticketKanalKullanıcı_${interaction.channel.id}${guild.id}`);
    if(!ticketKullanıcı) {
        return interaction.channel.delete();
    }

    if(ticketKullanıcı) {
      member = await client.users.cache.get(ticketKullanıcı.userId);
      
      const channel = await client.channels.cache.get(wixua.fetch(`ticketKatagor_${guild.id}`).log)
    
    const ticketUserClose = new EmbedBuilder()
    .setAuthor({ name: `${client.user.username} | Ticket Log`, iconURL: `${client.user.displayAvatarURL({ dynmaic: true })} ` })
    .setDescription(`${member.tag} tarafından açılan destek <t:${parseInt(Date.now() / 1000)}:R> sonlandırıldı`)
    .setThumbnail(user.displayAvatarURL({ dynmaic: true }))
    .addFields([
      {
        name: "Açılış tarihi:",
        value: `<t:${parseInt((ticketKullanıcı.date ?? Date.now()) / 1000)}:R>`,
        inline: true
      },
      {
        name: "Açan kişi:",
        value: `${codeBlock( member.tag)}`,
        inline: true
      },
      { name: '\u200B', value: '\u200B' },
      {
        name: "Kapanış tarihi:",
        value: `<t:${parseInt(Date.now() / 1000)}:R>`,
        inline: true
      },
      {
        name: "Kapatan kişi:",
        value: `${codeBlock(user.tag)}`,
        inline: true
      }
    ])
    
    channel.send({ embeds: [ticketUserClose] })
      
     wixuadb.delete(`ticketKullanıcı_${ticketKullanıcı.userId}${guild.id}`)
     wixuadb.delete(`ticketKanalKullanıcı_${interaction.channel.id}${guild.id}`); 
      
      return interaction.channel.delete();
    }
    
    
  }


}
)


client.login(token) 


