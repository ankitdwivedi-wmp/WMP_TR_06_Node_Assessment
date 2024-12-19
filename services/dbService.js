class CRUDService {
    constructor(model) {
      this.model = model;
    }
  
    async create(data) {
      try {
        const result = await this.model.create(data);
        return result;
      } catch (error) {
        throw new Error(`Error creating record: ${error.message}`);
      }
    }
  
    async read(c_id) {
        return await this.model.findOne({ where: { c_id } });
    }
    async readAll(){
        return await this.model.findAll();
    }
  
    async readById(id) {
      try {
        const result = await this.model.findById(id);
        if (!result) throw new Error(`Record not found with id: ${id}`);
        return result;
      } catch (error) {
        throw new Error(`Error reading record by ID: ${error.message}`);
      }
    }
  
    async update(c_id, data) {
        try {
            // Find the record by c_id (which is not the primary key)
            const record = await this.model.findOne({ where: { c_id } });
    
            if (!record) {
                throw new Error(`Record not found with c_id: ${c_id}`);
            }
    
            // Update the record with new data
            const updatedRecord = await record.update(data);
    
            return updatedRecord;
        } catch (error) {
            throw new Error(`Error updating record: ${error.message}`);
        }
    }
    
  
    async delete(id) {
        console.log(id)
        try {
            const result = await this.model.destroy({
                where: { id }
            });
    
            if (result === 0) {
                throw new Error(`Record not found with id: ${id}`);
            }
    
            return { message: `Record with id ${id} deleted successfully.` };
        } catch (error) {
            throw new Error(`Error deleting record: ${error.message}`);
        }
    }
  }
  
  module.exports = CRUDService;
  