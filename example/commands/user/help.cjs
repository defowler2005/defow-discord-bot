const commandBuild = require('../../../library/build/classes/commandBuilder.cjs');
const writeLog = require('../../../library/utilities/writeLog.cjs');
const { chatCmdPrefix } = require('../../../library/build/config.json');

commandBuild.create(
    {
        name: 'help',
        description: 'Provides information about command(s)',
        is_staff: false,
        aliases: [],
        usage: [
            `${chatCmdPrefix}help`
        ],
        examples: [
            `${chatCmdPrefix}help gui`
        ]
    },
    (message, args) => {

        writeLog(`Help command used by Staff user ${message.author.tag} for staff commands.`);
    }
);