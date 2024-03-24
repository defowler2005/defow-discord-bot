//const { client } = require('../../../index.cjs');
const commandBuild = require('../../../library/build/classes/commandBuilder.cjs');
const embedBuild = require('../../../library/build/classes/embedBuilder.cjs');

commandBuild.create(
    {
        name: 'bump',
        description: 'Fake bump command for user entertainment',
        is_staff: false,
    }, (message) => {
        const embed = new embedBuild().create(
            {
                setColor: '#ADD8E6',
                title: 'Bump',
                description: 'Thanks for fake bumping!'
            },
            ()=>{
            }
        );
        message.channel.send({ embed });
    }
);
