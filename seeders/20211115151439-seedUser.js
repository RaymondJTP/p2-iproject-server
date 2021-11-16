'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        username: 'Endah Suningsih',
        email: 'endah@mail.com',
        password: 'endahgeulis',
        address : 'Jalan Ninja Naruto',
        phoneNumber : '0819481374',
        status : 'online',
        RoomId : 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'Asep Sedunia',
        email: 'asep@mail.com',
        password: 'asepsedunia',
        address : 'Jalan Ninja Asep',
        phoneNumber : '5252415',
        status : 'online',
        RoomId : 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'Diko',
        email: 'diko@mail.com',
        password: 'diko',
        address : 'Jalan Ninja Diko',
        phoneNumber : '0586573',
        status : 'online',
        RoomId : 3,
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
    await queryInterface.bulkDelete('Users', null);
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
