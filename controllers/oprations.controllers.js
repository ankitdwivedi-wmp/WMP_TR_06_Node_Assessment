const { writeData, readFile } = require('../utils/fileHandler');

/**
 * Fetches all comments from the data.json file and sends them as a JSON response.
 * Handles errors during file read operations and responds with error messages.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getData = (req, res) => {
    try {
        const data = readFile(); // Retrieve all data from the file
        res.status(200).json(data); // Return the data as a JSON response
    } catch (error) {
        res.status(500).json({ message: 'Error in fetching data', error: error.message });
    }
};

/**
 * Adds a new comment to the data.json file. The request must include an id and a comment in the body.
 * Validates the presence of required fields and appends the new comment to the file.
 * Handles file write errors and responds with errors messages.
 *
 * @param {Object} req - The request object (contains id and comment in the body).
 * @param {Object} res - The response object.
 */
const addData = (req, res) => {
    try {

        if (!req.body.id || !req.body.comment) {
            return res.status(400).json({ message: 'id and comment are required' });
        }

        const data = readFile(); // Read the existing comments
        data.push({ id:req.body.id, comment:req.body.comment }); // Add the new comment
        writeData(data); // Save the updated data to the file

        res.status(201).json({ message: 'Data added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error while adding data', error: error.message });
    }
};

/**
 * Deletes a comment from the data.json file by its id. The id is passed as a URL parameter.
 * Validates the presence of the comment before attempting to delete it.
 * Handles errors during file read/write operations and responds with error messages.
 *
 * @param {Object} req - The request object (contains id as a URL parameter).
 * @param {Object} res - The response object.
 */
const deleteData = (req, res) => {
    try {
        const data = readFile(); // Retrieve all comments
        const dataIndex = data.findIndex(entry => entry.id === parseInt(req.params.id, 10)); // Locate the comment by id

        if (dataIndex === -1) {
            return res.status(404).json({ message: 'Data not found' });
        }

        data.splice(dataIndex, 1); // Remove the comment
        writeData(data); // Save the updated comments

        res.status(200).json({ message: 'Data deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting data', error: error.message });
    }
};

/**
 * Updates an existing comment in the data.json file using its id. 
 * The id and new comment are passed in the request body.
 * Validates the format of id and comment, ensures the comment exists, and updates it.
 * Handles errors during file operations and responds with appropriate messages.
 *
 * @param {Object} req - The request object (contains id and comment in the body).
 * @param {Object} res - The response object.
 */
const updateData = (req, res) => {
    try {

        if (typeof req.body.id !== 'number' || isNaN(req.body.id)) {
            return res.status(400).json({ message: 'Invalid id. It should be a valid number.' });
        }

        if (!req.body.comment || typeof req.body.comment !== 'string' || req.body.comment.trim() === '') {
            return res.status(400).json({ message: 'Invalid comment. It must be a non-empty string.' });
        }

        const data = readFile(); // Retrieve all comments
        const dataIndex = data.findIndex(entry => entry.id === req.body.id); // Locate the comment by id

        if (dataIndex === -1) {
            return res.status(404).json({ message: 'Data not found' });
        }

        data[dataIndex] = { id:req.body.id, comment:req.body.comment }; // Update the comment
        writeData(data); // Save the updated comments

        res.status(200).json({ message: 'Data updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating data', error: error.message });
    }
};

module.exports = {
    getData,
    addData,
    deleteData,
    updateData,
};
