const { writeData, readFile } = require('../utils/fileHandler');

// Get all data
/**
 * Fetches and returns all the data from the file data.json .
 * If there is an error while reading the data.json file, it sends a 500 response.
 * 
 * @param {*} req - The request object
 * @param {*} res - The response object
 */
const getData = (req, res) => {
    try {
        const data = readFile(); // Read data from the file
        res.status(200).json(data); // Send the data as a JSON response
    } catch (error) {
        res.status(500).json({ message: 'Error in fetching data', error: error.message });
    }
};

// Add new data
/**
 * Adds a new record with an id and comment to the data.json file.
 * If id or comment is missing in the request body, it sends a 400 response with the error massage.
 * 
 * @param {*} req - The request object (contains id and comment in the body)
 * @param {*} res - The response object
 */
const addData = (req, res) => {
    try {
        if (!req.body.id || !req.body.comment) { // Check if id or comment is missing
            return res.status(400).json({ message: 'id and comment are required' });
        }

        const data = readFile(); // Read existing data from the file
        data.push({ id:req.body.id, comment:req.body.comment }); // Add new record to the data
        writeData(data); // Write updated data back to the file

        res.status(201).json({ message: 'Data added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error while adding data', error: error.message });
    }
};

// Delete data by id
/**
 * Deletes a record from the data.json file based on the id passed as a parameter.
 * If the record is not found, it sends a 404 response.
 * 
 * @param {*} req - The request object (contains id as a URL parameter)
 * @param {*} res - The response object
 */
const deleteData = (req, res) => {
    try {

        const data = readFile(); // Read data from the file
        const dataIndex = data.findIndex(entry => entry.id === parseInt(req.params.id)); // Find the index of the record by id
        if (dataIndex === -1) { // If no record is found, send a 404 response
            return res.status(404).json({ message: 'Data not found' });
        }

        data.splice(dataIndex, 1); // Remove the record from the data
        writeData(data); // Write updated data back to the file

        res.status(200).json({ message: 'Data deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting data', error: error.message });
    }
};

// Update data by id
/**
 * Updates an existing record by id with a new comment.
 * If the id is invalid or the comment is missing/invalid, it sends a 400 response.
 * If the record is not found, it sends a 404 response.
 * 
 * @param {*} req - The request object (contains id and comment in the body)
 * @param {*} res - The response object
 */
const updateData = (req, res) => {
    try {
        // Validate id it should be a number
        if (typeof (req.body.id )=== 'string' || isNaN(parseInt(req.body.id ))) {
            return res.status(400).json({ message: 'Invalid id. It should be a valid number.' });
        }

        // Validate comment (it should be a non-empty string)
        if (!req.body.comment || typeof req.body.comment !== 'string' || req.body.comment.trim() === '') {
            return res.status(400).json({ message: 'Invalid comment. It must be a non-empty string.' });
        }

        const data = readFile(); // Read data from the file
        const dataIndex = data.findIndex(entry => entry.id === req.body.id); // Find the record by id

        if (dataIndex === -1) { // If no record is found, send a 404 response
            return res.status(404).json({ message: 'Data not found' });
        }

        data[dataIndex] = { id:req.body.id, comment:req.body.comment }; // Update the record with new data
        writeData(data); // Write updated data back to the file

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
