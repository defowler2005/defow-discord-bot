const { Client, GatewayIntentBits, Events, REST, Routes, EmbedBuilder } = require('discord.js');
const commandBuild = require('./library/build/classes/commandBuilder.js');
const { token, guildId, clientId } = require('./library/build/config.json');
require('./example/commands/staff/prefix.js')
const fs = require('fs');

const client = new Client(
  {
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildModeration,
      GatewayIntentBits.GuildEmojisAndStickers,
      GatewayIntentBits.GuildIntegrations,
      GatewayIntentBits.GuildWebhooks,
      GatewayIntentBits.GuildInvites,
      GatewayIntentBits.GuildVoiceStates,
      GatewayIntentBits.GuildPresences,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildMessageReactions,
      GatewayIntentBits.GuildMessageTyping,
      GatewayIntentBits.DirectMessages,
      GatewayIntentBits.DirectMessageReactions,
      GatewayIntentBits.DirectMessageTyping,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildScheduledEvents,
      GatewayIntentBits.AutoModerationConfiguration,
      GatewayIntentBits.AutoModerationExecution,
    ]
  }
);

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    const slashCommands = [
      {
        name: 'prefix',
        description: 'Change the command prefix configurations',
      }
    ];
    const data = await rest.put(Routes.applicationCommands(clientId), { body: slashCommands });
    console.log(`Successfully reloaded ${data.length} (/) commands.`);
  } catch (error) {
    console.error(error);
  }
})();

client.once('ready', (data) => console.log(`Logged in as ${data.user.tag}!`));

client.on(Events.MessageCreate, async (message) => {
  fs.readFile('./library/build/config.json', 'utf8', async (error, data) => {
    const { chatCmdPrefix } = JSON.parse(data);
    if (message.author.bot || !message.content.startsWith(chatCmdPrefix)) return;
    const args = message.content.slice(chatCmdPrefix.length).split(/\s+/g);
    const cmd = args.shift().toLowerCase();
    const commandList = commandBuild.commands.find((command) => command.name.includes(cmd));
    if (!commandList) return message.reply(`Invalid command!`);
    if (commandList.is_staff && !message.member.roles.cache.some((role) => role.name === 'Staff')) return message.reply('Invalid permission!')
    commandList.callback(message, args);
  })
});

client.login(token);