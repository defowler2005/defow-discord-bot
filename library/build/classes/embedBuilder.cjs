const { EmbedBuilder, HexColorString } = require('discord.js');

/**
 * Represents an EmbedBuilder for easy embed creation.
 * @class
 */
class embedBuilder {
    /**
     * Creates an instance of EmbedBuilder.
     * @constructor
     */
    constructor() {
        this.embed = new EmbedBuilder();
    }

    /**
     * Creates and customizes an embed using the provided information.
     * @param {Object} info - Information to customize the embed.
     * @param {HexColorString} info.setColor - Set's the side of the emebeds color.
     * @param {Function} callback - Callback function to handle the built embed.
     */
    create(info, callback) {
        this.embed.setColor(info.setColor);
        callback(this.embed);
    }
}

module.exports = embedBuilder;