const express= require('express');
const operationsControllers = require('../controllers/oprations.controllers');
const { validateUniqueData } = require('../middlewares/operations.validator');
const router= express.Router();

//operations routes 

router.get('/comments',operationsControllers.getData);
router.post('/comments/add',validateUniqueData,operationsControllers.addData);
router.delete('/comments/delete/:id',operationsControllers.deleteData);
router.put('/comments/update',operationsControllers.updateData);
//If the route is not found then it will return route not found with 404 status code
router.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
  });

module.exports=router;