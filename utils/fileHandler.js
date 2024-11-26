const path = require('path');
const fs = require('fs');

// Path of the file
const filePath = path.join(__dirname, '../data.json');

/**
 * Function to read data from the file.
 * This function reads the content of data.json file, parses it as JSON,
 * and returns the resulting JavaScript object.
 * 
 * @returns {Object} - The parsed data from the file.
 * @throws {Error} - Throws an error if there is an issue reading the file.
 */
const readFile = () => {
    try {
        const fileData = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(fileData);
    } catch (error) {
        throw new Error("Error in reading the file");
    }
};

/**
 * Function to write data to the file.
 * This function takes a JavaScript object, stringifies it, and writes it back
 * to the data.json file, formatting it with a 2-space indentation.
 * 
 * @param {Object} data - The data to be written to the file.
 * @throws {Error} - Throws an error if there is an issue writing the file.
 */
const writeData = (data) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        throw new Error('Error in writing data');
    }
};

module.exports = {
    readFile,
    writeData
};
