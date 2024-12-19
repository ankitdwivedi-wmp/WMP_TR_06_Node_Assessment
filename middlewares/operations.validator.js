/**
 * Middleware function to validate the request body before adding or updating data.
 * It performs the following validations:
 * - Ensures no extra fields are present in the request body (only c_id and comment are allowed).
 * - Ensures c_id is a number.
 * - Ensures comment is a non-empty string.
 * 
 * If any of these validations fail, it returns a 400 status with an appropriate error message.
 * If all validations pass, it passes control to the next middleware or controller.
 * 
 * @param {*} req - The request object containing the c_id and comment in the body
 * @param {*} res - The response object
 * @param {*} next - The next middleware or controller to pass control to
 */
const validateUniqueData = (req, res, next) => {
    try {
        const allowedKeys = ['c_id', 'comment']; // Allowed keys
        const requestKeys = Object.keys(req.body); // Keys present in the request body

        // Check for extra keys
        const extraKeys = requestKeys.filter(key => !allowedKeys.includes(key));
        if (extraKeys.length > 0) {
            return res.status(400).json({ message: 'Request contains invalid fields', extraKeys });
        }

        // Check if c_id is a number
        if (typeof req.body.c_id !== 'number' || isNaN(req.body.c_id)) {
            return res.status(400).json({ message: 'c_id must be a valid number' });
        }

        // Check if comment is a non-empty string
        if (typeof req.body.comment !== 'string' || req.body.comment.trim() === '') {
            return res.status(400).json({ message: 'comment must be a non-empty string' });
        }

        next(); // Pass control to the next middleware/controller
    } catch (error) {
        res.status(500).json({ message: 'Error validating data', error: error.message });
    }
};

module.exports = { validateUniqueData };
