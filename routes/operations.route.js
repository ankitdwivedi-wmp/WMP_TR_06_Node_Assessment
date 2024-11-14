const express= require('express');
const { getData, addData, deleteData, updateData } = require('../controllers/oprations.controllers');
const router= express.Router();

router.get('/',getData);
router.post('/add',addData);
router.delete('/delete/:id',deleteData);
router.put('/update/:id',updateData);

router.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
  });

module.exports=router;