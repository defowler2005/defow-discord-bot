const fs = require('fs');
const path = require('path');

/**
 * A function to write informative logs to the .log file.
 * @param {String} message - The message to print to the file.
 * @returns {Boolean} - Returns true if the write was successful, else if the write was unsuccessful returns false :(.
 * @function
 */

function writeLog(message) {
    const dateTime = new Date().toLocaleString('en-AU', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short',
    });

    fs.appendFile(path.join(__dirname, '../../logs.log'), `${dateTime} - ${message}\n`, (error) => {
        if (error) { console.error('Error writing to log file:', error); return false; } return true;
    })
};

module.exports = writeLog;