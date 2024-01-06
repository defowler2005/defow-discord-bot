const commandBuild = require('../../../library/build/classes/commandBuilder.cjs');
const writeLog = require('../../../library/utilities/writeLog.cjs');
const { chatCmdPrefix } = require('../../../library/build/config.json');

commandBuild.create(
    {
        name: 'help',
        description: 'Provides information about command(s)',
        is_staff: false,
    }, (message, args) => {
        let allCommands;
        if (message.member.roles.cache.some((role) => role.name === 'Staff')) {
            allCommands = commandBuild.getCommands(args[0] !== undefined && args[0] !== '');
            writeLog(`Help command used by Staff user ${message.author.tag}`);
        } else {
            allCommands = commandBuild.getCommands(false);
            writeLog(`Help command used by Non-Staff user ${message.author.tag}`);
        } message.channel.send(`Available commands:\n${allCommands.map((cmd) => `${chatCmdPrefix}${cmd.name} - ${cmd.description}`).join('\n')}`);
    }
);