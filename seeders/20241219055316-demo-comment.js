'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      Example:
      await queryInterface.bulkInsert('Usercomments', [
      {
        c_id: '1000',
        comment: "one",
        
      },
      {
        c_id: '1001',
        comment: "two"
      },
      {
        c_id: '1002',
        comment: "three"
      },
      {
        c_id: '1003',
        comment: "four"
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete('Usercomments', null, {});
  }
};
