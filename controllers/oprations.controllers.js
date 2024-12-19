const DbService = require('../services/dbService');
const {Usercomment} = require('../models');

// Create an instance of DbService with the Usercomment model
const dbService = new DbService(Usercomment);

/**
 * Fetches all comments from the database and sends them as a JSON response.
 */
const getData = async (req, res) => {
    try {
        const data = await dbService.readAll();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error in fetching data', error: error.message });
    }
};

/**
 * Adds a new comment to the database.
 */
const addData = async (req, res) => {
    try {
        const { c_id, comment } = req.body;

        if (!c_id || !comment) {
            return res.status(400).json({ message: 'c_id and comment are required' });
        }
        let isPresent = await dbService.read(c_id);
        if (isPresent) {
            return res.status(400).json({ message: `An entry with c_id ${c_id} already exists.` });
        }
        const newComment = await dbService.create({ c_id, comment });
        res.status(201).json({ message: 'Data added successfully', data: newComment });
    } catch (error) {
        res.status(500).json({ message: 'Error while adding data', error: error.message });
    }
};

/**
 * Deletes a comment from the database by its c_id.
 */
const deleteData = async (req, res) => {
    try {
        const { c_id } = req.params;
        const result = await dbService.delete(c_id);

        if (!result) {
            return res.status(404).json({ message: 'Data not found' });
        }

        res.status(200).json({ message: 'Data deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting data', error: error.message });
    }
};

/**
 * Updates an existing comment in the database using its c_id.
 */
const updateData = async (req, res) => {
    try {
        const { c_id, comment } = req.body;

        if (typeof c_id !== 'number' || isNaN(c_id)) {
            return res.status(400).json({ message: 'Invalid c_id. It should be a valid number.' });
        }

        if (!comment || typeof comment !== 'string' || comment.trim() === '') {
            return res.status(400).json({ message: 'Invalid comment. It must be a non-empty string.' });
        }

        const updatedComment = await dbService.update(c_id , comment );

        if (!updatedComment) {
            return res.status(404).json({ message: 'Data not found' });
        }

        res.status(200).json({ message: 'Data updated successfully', data: updatedComment });
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
