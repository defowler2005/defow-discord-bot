const fs = require('fs');
const commandBuild = require('../../../library/build/classes/commandBuilder.cjs')
const writeLog = require('../../../library/utilities/writeLog.cjs')

commandBuild.create(
    {
        name: 'role',
        description: 'Add, Remove, Modify roles in the server',
        is_staff: true,
    }, (message, args) => {
        message.delete();

        writeLog(`User ${message.author.tag} used the role command.`)
    }
);