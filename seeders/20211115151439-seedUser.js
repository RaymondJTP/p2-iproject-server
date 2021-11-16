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
        longitude : '107.6564040198354',
        latitude : '-6.914675193410028',
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
        longitude : '107.6117174134736',
        latitude : '-6.89933735714361',
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
        longitude : '107.57172174011913',
        latitude : '-6.894095406004892',
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
