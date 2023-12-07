const { Client, GatewayIntentBits, Events, REST, Routes } = require('discord.js');
const commandBuild = require('./library/build/classes/commandBuilder.js');
const { token, guildId, clientId } = require('./library/build/config.json');
require('./example/commands/staff/prefix.js')
const fs = require('fs');

const client = new Client(
  {
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.DirectMessages,
      GatewayIntentBits.GuildMessageReactions,
      GatewayIntentBits.DirectMessageReactions,
    ]
  }
);

const rest = new REST({ version: '10' }).setToken(token);
const configFilePath = './library/build/config.json';

(async () => {
  try {
    const slashCommands = [];
    const data = await rest.put(Routes.applicationCommands(clientId), { body: slashCommands });
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: slashCommands });
    console.log(`Successfully reloaded ${data.length} (/) commands.`);
  } catch (error) {
    console.error(error);
  }
})();

client.once('ready', (data) => console.log(`Logged in as ${data.user.tag}!`));

client.on(Events.MessageCreate, (message) => {
  fs.readFile(configFilePath, 'utf8', (error, data) => {
    const { chatCmdPrefix } = JSON.parse(data);
    if (message.author.bot || !message.content.startsWith(chatCmdPrefix)) return;
    const args = message.content.slice(chatCmdPrefix.length).split(/\s+/g);
    const cmd = args.shift().toLowerCase();
    const commandList = commandBuild.commands.find((command) => command.name.includes(cmd));
    if (!commandList) return message.reply(`Invalid command!`);
    if (commandList.is_staff && !message.member.roles.cache.some((role) => role.name === 'Staff')) return message.reply('Invalid permission!');
    commandList.callback(message, args);
  });
});

client.login(token);