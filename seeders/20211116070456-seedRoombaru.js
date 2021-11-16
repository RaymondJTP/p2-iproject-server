'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Rooms', [
      {
        name: 'Group Alumni TK/SD Cikajang 1996',
        member: 50,
        passwordRoom: 'cikajangraya',
        UserId : 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Arisan Kelurahan Cikaso Utara',
        member: 30,
        passwordRoom: 'cikaso',
        UserId : 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Hacktiv8 Batch 17',
        member: 50,
        passwordRoom: 'quimper',
        UserId : 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Rooms', null);

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
