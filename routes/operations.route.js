const express= require('express');
const operationsControllers = require('../controllers/oprations.controllers');
const { validateUniqueData } = require('../middlewares/operations.validator');
const router= express.Router();

/**
 * @swagger
 * tags:
 *   - name: Comments
 *     description: Operations related to comments
 */

// Operations routes

/**
 * @swagger
 * /comments:
 *   get:
 *     tags:
 *       - Comments
 *     summary: Get all comments
 *     description: Retrieve a list of all comments.
 *     responses:
 *       200:
 *         description: A list of comments.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   c_id:
 *                     type: integer
 *                     example: 1
 *                   comment:
 *                     type: string
 *                     example: Ankit
 */
router.get('/comments', operationsControllers.getData);

/**
 * @swagger
 * /comments/add:
 *   post:
 *     tags:
 *       - Comments
 *     summary: Add new data
 *     description: Adds a new data entry with an `c_id` and `comment` to the existing data store.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - c_id
 *               - comment
 *             properties:
 *               c_id:
 *                 type: string
 *                 description: Unique identifier for the data
 *               comment:
 *                 type: string
 *                 description: Comment associated with the c_id
 *     responses:
 *       201:
 *         description: Data added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Data added successfully
 *       400:
 *         description: Missing required fields (c_id or comment)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: c_id and comment are required
 *       500:
 *         description: Error while adding data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error while adding data
 *                 error:
 *                   type: string
 *                   example: Internal server error details
 */
router.post('/comments/add',validateUniqueData, operationsControllers.addData);

/**
 * @swagger
 * /comments/delete/{c_id}:
 *   delete:
 *     tags:
 *       - Comments
 *     summary: Delete a comment
 *     description: Deletes a comment by its unique `c_id`.
 *     parameters:
 *       - name: c_id
 *         in: path
 *         required: true
 *         description: Unique identifier of the comment to be deleted
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Data deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Data deleted successfully
 *       404:
 *         description: Data not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Data not found
 *       500:
 *         description: Error deleting data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error deleting data
 *                 error:
 *                   type: string
 *                   example: Internal server error details
 */
router.delete('/comments/delete/:c_id', operationsControllers.deleteData);

/**
 * @swagger
 * /comments/update:
 *   put:
 *     tags:
 *       - Comments
 *     summary: Update a comment
 *     description: Updates a comment with a valid `c_id` and `comment` in the data store.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - c_id
 *               - comment
 *             properties:
 *               c_id:
 *                 type: integer
 *                 description: The unique identifier of the comment to be updated
 *                 example: 1
 *               comment:
 *                 type: string
 *                 description: The updated comment text
 *                 example: "Updated comment"
 *     responses:
 *       200:
 *         description: Data updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Data updated successfully
 *       400:
 *         description: Invalid `c_id` or `comment`
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid c_id. It should be a valid number.
 *       404:
 *         description: Data not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Data not found
 *       500:
 *         description: Error updating data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error updating data
 *                 error:
 *                   type: string
 *                   example: Internal server error details
 */
router.put('/comments/update', operationsControllers.updateData);

// If the route is not found, it returns route not found with 404 status code
router.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

module.exports = router;
