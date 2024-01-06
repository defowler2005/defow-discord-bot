const commandBuild = require('../../../library/build/classes/commandBuilder.cjs')
const writeLog = require('../../../library/utilities/writeLog.cjs')

commandBuild.create(
    {
        name: 'ping',
        description: 'Reply with a message to check if the bot is online',
        is_staff: false,
    }, (message) => {
        const pongReplies = ['Hey, I am online!', 'Pong!', 'Hello there!', 'Ping! Pong!'];
        const startTime = Date.now()
        message.reply(pongReplies[Math.floor(Math.random() * pongReplies.length)]).then(() => {
            const endTime = Date.now();
            const responseTime = endTime - startTime;
            message.channel.send(`Response time: ${responseTime}ms`);
            writeLog(`User ${message.author.tag} pinged the bot.`)
        })
    }
);