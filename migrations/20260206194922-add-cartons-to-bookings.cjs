'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('bookings', 'noOfCartons', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1 // Kam az kam 1 carton toh hoga hi
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('bookings', 'noOfCartons');
  }
};