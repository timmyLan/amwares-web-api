'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        /*
          Add altering commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.bulkInsert('Person', [{
            name: 'John Doe',
            isBetaMember: false
          }], {});
        */
        return queryInterface.bulkInsert('BaseInfos', [{
            name: '广州辂轺信息科技有限公司',
            description: '广州辂轺信息科技2013年成立于广州,是一家专注于汽车ECU（电子控制单元）产品开发的科技企业。 依托于自行开发的AUTOSAR汽车软件架构和OSEK实时操作系统，凭借自身多年的技术积累，为广大客户提供各种ECU解决方案和产品。',
            copyright: '© 2014-2017 广州辂轺信息科技有限公司 版权所有',
            logoUrl: '/images/baseInfo/pic01.jpg',
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.bulkDelete('Person', null, {});
        */
        return queryInterface.bulkDelete('BaseInfo', null, {});
    }
};