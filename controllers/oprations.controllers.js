const fs= require('fs');
const path= require('path');

//path of the file
const filePath= path.join(__dirname, '../data.json');

//function to read data
const readFile =()=>{
    try{
        const fileData =fs.readFileSync(filePath, 'utf8');
        return JSON.parse(fileData);
    }catch(error){
        return [];
    }
};

//function to write data
const writeData =(data) =>{
    try{
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    }catch(error){
        throw new Error('Error in writing data');
    }
};

//Get all data
const getData=(req,res)=>{
    try{
        const data=readFile();
        res.status(200).json(data); 
    }catch(error){
        res.status(500).json({message:'Error in fetching data', error: error.message});
    }
};

//Add new data
const addData=(req,res)=>{
    try{
        const{id, comment}=req.body;
        if (!id||!comment){
            return res.status(400).json({message:'id and comment are required'});
        }
        const data =readFile();

        const currData=data.find(entry=> entry.id === id);
        if (currData){
            return res.status(400).json({message:'Data with this id already exists'});
        }

        data.push({ id, comment });
        writeData(data);
        res.status(201).json({message:'Data added successfully' });
    }catch(error){
        res.status(500).json({message:'Error while adding data', error: error.message});
    }
};


//Delete data by id
const deleteData=(req, res) =>{
    try{
        const id=parseInt(req.params.id);

        const data=readFile();
        const dataIndex=data.findIndex(entry=> entry.id === id);
        if (dataIndex === -1){
            return res.status(404).json({message:'Data not found'});
        }

        data.splice(dataIndex, 1); 
        writeData(data);
        res.status(200).json({message:'Data deleted successfully'});
    }catch(error){
        res.status(500).json({message:'Error deleting data', error: error.message});
    }
};

//Update data by id
const updateData=(req, res) =>{
    try{
        const id=parseInt(req.params.id);
        const{ comment }= req.body;

        const data=readFile();
        const dataIndex=data.findIndex(entry=> entry.id === id);
        if (dataIndex === -1){
            return res.status(404).json({message:'Data not found'});
        }

        data[dataIndex] ={ id, comment }; 
        writeData(data);
        res.status(200).json({message:'Data updated successfully'});
    }catch(error){
        res.status(500).json({message:'Error updating data', error: error.message});
    }
};

module.exports ={
    getData,
    addData,
    deleteData,
    updateData,
};
