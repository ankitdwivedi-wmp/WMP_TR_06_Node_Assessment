const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Usercomment extends Model {
  }
  Usercomment.init({
    c_id: DataTypes.INTEGER,
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Usercomment'
  });
  return Usercomment;
};