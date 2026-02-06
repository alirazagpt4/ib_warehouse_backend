'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('bookings', 'hsCode', {
      type: Sequelize.STRING(20), // HS Code aam taur par 6 se 10 digits ka hota hai
      allowNull: true, // Kuch cases mein shayad shuru mein na ho
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('bookings', 'hsCode');
  }
};