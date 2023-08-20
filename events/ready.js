const config = require("../config.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const { Collection } = require("discord.js") 
const fs = require("fs")

module.exports = async (client) => {
console.log(`${client.user.tag} Bot Online!`)

const activities = [
    "Owner: Mehdi and SOUFLY",
    "BOTAZE Çok Yakında Hizmetinizde.",
    "Destek Sunucum: Yakında",
    "Sunucunuza Ekleyerek Destek Olabilirsiniz."
  ]
  
  setInterval(async() => {
    client.user.setPresence({ activities: [{ name: `${activities[Math.floor(Math.random() * activities.length)]}` }], status: 'dnd' });
  }, 1000 * 5);

const rest = new REST({ version: "10" }).setToken(config.token);
(async () => {
try {
await rest.put(Routes.applicationCommands(client.user.id), {
body: await client.commands,
});
console.log("Successfully loadded application [/] commands.");
} catch(e) {
console.log("Failed to load application [/] commands. " + e);
}
})();



}



