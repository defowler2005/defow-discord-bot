const { EmbedBuilder, HexColorString } = require('discord.js');

/**
 * Represents an EmbedBuilder for easy embed creation.
 * @class
 */
class embedBuild {
    /**
     * Creates an instance of embedBuilder.
     * @constructor
     */
    constructor() {
        this.embed = new EmbedBuilder();
    }

    /**
     * Creates and customizes an embed using the provided information.
     * @param {Object} info - Information to customize the embed.
     * @param {HexColorString} info.setColor - Set's the side of the emebeds color.
     * @param {String} info.title - Set's the title of the embed.
     * @param {String} [info.url] - Set's the URL of the embed.
     * @param {String} [info.authorName] - Set's the name of the author.
     * @param {String} [info.authorIconURL] - Set's the icon URL of the author.
     * @param {String} [info.authorURL] - Set's the URL of the author.
     * @param {String} [info.description] - Set's the description of the embed.
     * @param {String} [info.thumbnailURL] - Set's the thumbnail URL of the embed.
     * @param {Array} [info.fields] - An array of objects representing fields.
     * @param {String} [info.imageURL] - Set's the image URL of the embed.
     * @param {Date} [info.timestamp] - Set's the timestamp of the embed.
     * @param {String} [info.footerText] - Set's the text of the footer.
     * @param {String} [info.footerIconURL] - Set's the icon URL of the footer.
     * @param {Function} callback - Callback function to handle the built embed.
     */
    create(info, callback) {
        this.embed.setColor(info.setColor);
        this.embed.setTitle(info.title);

        if (info.url) this.embed.setURL(info.url);
        if (info.authorName || info.authorIconURL || info.authorURL) {
            this.embed.setAuthor(
                {
                    name: info.authorName,
                    iconURL: info.authorIconURL,
                    url: info.authorURL
                }
            )
        }
        if (info.description) this.embed.setDescription(info.description);
        if (info.thumbnailURL) this.embed.setThumbnail(info.thumbnailURL);

        if (info.fields) {
            info.fields.forEach(field => { this.embed.addFields(field) })
        }

        if (info.imageURL) this.embed.setImage(info.imageURL);
        if (info.timestamp) this.embed.setTimestamp(1);
        if (info.footerText || info.footerIconURL) {
            this.embed.setFooter(
                {
                    text: info.footerText,
                    iconURL: info.footerIconURL
                }
            );
        }; callback(this.embed);
    }
};

module.exports = embedBuild;