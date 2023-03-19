'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller,loadUbanRouter } = app;
  loadUbanRouter(app);
  router.get('/', controller.home.index);
};
