'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('bookings', 'cbm', { type: Sequelize.DECIMAL(10, 3), allowNull: true });
    await queryInterface.addColumn('bookings', 'rate', { type: Sequelize.DECIMAL(10, 2), allowNull: true });
    await queryInterface.addColumn('bookings', 'pcsInBox', { type: Sequelize.INTEGER, allowNull: true });
    await queryInterface.addColumn('bookings', 'totalPcs', { type: Sequelize.INTEGER, allowNull: true });
    await queryInterface.addColumn('bookings', 'otherItemDetails', { type: Sequelize.TEXT, allowNull: true });
    await queryInterface.addColumn('bookings', 'commentsRemarks', { type: Sequelize.TEXT, allowNull: true });
    await queryInterface.addColumn('bookings', 'dutyWorking', { type: Sequelize.TEXT, allowNull: true });
    await queryInterface.addColumn('bookings', 'containerNo', { type: Sequelize.STRING, allowNull: true });
    await queryInterface.addColumn('bookings', 'shippingCompany', { type: Sequelize.STRING, allowNull: true });
  },

  async down(queryInterface, Sequelize) {
    // Reverse karne ke liye columns remove karna
    const columns = ['cbm', 'rate', 'pcsInBox', 'totalPcs', 'otherItemDetails', 'commentsRemarks', 'dutyWorking', 'containerNo', 'shippingCompany'];
    for (const column of columns) {
      await queryInterface.removeColumn('bookings', column);
    }
  }
};