const { readFile } = require('../utils/fileHandler');

// Middleware to ensure id and comment are unique and validate request structure
/**
 * Middleware function to validate the request body before adding or updating data.
 * It performs the following validations:
 * Ensures no extra fields are present in the request body (only id and comment are allowed).
 * Ensures id is a number.
 * Ensures comment is a non-empty string.
 * 
 * If any of these validations fail, it returns a 400 status with an appropriate error message.
 * If all validations pass, it passes control to the next middleware or controller.
 * 
 * @param {*} req - The request object containing the id and comment in the body
 * @param {*} res - The response object
 * @param {*} next - The next middleware or controller to pass control to
 */
const validateUniqueData = (req, res, next) => {
    try {
        // Check if there are extra keys other than id and comment
        if (Object.keys(otherKeys).length > 0) {
            return res.status(400).json({ message: 'Request contains invalid fields' });
        }

        // Check if id is a number (or adjust type-check for your use case)
        if (typeof req.body.id !== 'number') {
            return res.status(400).json({ message: 'id must be a number' });
        }

        // Check if comment is a string and not empty
        if (typeof req.body.comment !== 'string' || req.body.comment.trim() === '') {
            return res.status(400).json({ message: 'comment must be a non-empty string' });
        }

        next(); // Pass control to the next middleware/controller
    } catch (error) {
        res.status(500).json({ message: 'Error validating data', error: error.message });
    }
};

module.exports = { validateUniqueData };
