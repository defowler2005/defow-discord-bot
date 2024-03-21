const commandBuild = require('../../../library/build/classes/commandBuilder.cjs');
const writeLog = require('../../../library/utilities/writeLog.cjs');
const { chatCmdPrefix } = require('../../../library/build/config.json');

commandBuild.create(
    {
        name: 'help',
        description: 'Provides information about command(s)',
        is_staff: false,
    },
    (message, args) => {
        if (args.length !== 1) {
            message.channel.send('Invalid usage. Please provide 1 argument: 0 for non-staff commands or 1 for staff commands.');
            return;
        }

        const arg = parseInt(args[0]);

        if (isNaN(arg) || (arg !== 0 && arg !== 1)) {
            message.channel.send('Invalid argument. Please provide either 0 for non-staff commands or 1 for staff commands.');
            return;
        }

        if (arg === 0) {
            const nonStaffCommands = commandBuild.getCommands(false);
            const availableNonStaffCommands = nonStaffCommands.map((cmd) => `${chatCmdPrefix}${cmd.name} - ${cmd.description}`).join('\n');
            message.channel.send(`Non-Staff commands:\n${availableNonStaffCommands}`);
            writeLog(`Help command used by ${message.author.tag} for non-staff commands.`);
        } else {
            const isStaff = message.member.roles.cache.some((role) => role.name === 'Staff');
            if (!isStaff) {
                message.channel.send('You must be a staff member to view staff commands.');
                writeLog(`Help command used by Non-Staff user ${message.author.tag} attempting to view staff commands.`);
                return;
            }

            const staffCommands = commandBuild.getCommands(true);
            const availableStaffCommands = staffCommands.map((cmd) => `${chatCmdPrefix}${cmd.name} - ${cmd.description}`).join('\n');
            message.channel.send(`Staff commands:\n${availableStaffCommands}`);
            writeLog(`Help command used by Staff user ${message.author.tag} for staff commands.`);
        }
    }
);