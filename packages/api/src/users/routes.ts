import express from 'express';

import { CommonRoutesConfig, ConfigureRoutes } from '../common/routes';

import UsersController from './controller';
import UserMiddleware from './middleware';

export default class UsersRoutes extends CommonRoutesConfig implements ConfigureRoutes {
  constructor(app: express.Application) {
    super(app, 'UserRoutes');
    this.configureRoutes();
  }

  configureRoutes() {
    const usersController = new UsersController();
    const usersMiddleware = UserMiddleware.getInstance();

    this.app.get(`/users`, [usersController.listUsers]);
    this.app.post(`/users`, [
      usersMiddleware.validateRequiredCreateUserBodyFields,
      usersMiddleware.validateSameEmailDoesntExist,
      usersMiddleware.extractUserFiles,
      usersController.createUser,
    ]);
    this.app.put(`/users/:userId`, [
      usersMiddleware.validateUserExists,
      usersMiddleware.extractUserId,
      usersMiddleware.extractUserFiles,
      usersController.put,
    ]);
    this.app.patch(`/users/:userId`, [
      usersMiddleware.validateUserExists,
      usersMiddleware.extractUserId,
      usersMiddleware.extractUserFiles,
      usersController.patch,
    ]);
    this.app.delete(`/users/:userId`, [
      usersMiddleware.validateUserExists,
      usersMiddleware.extractUserId,
      usersController.removeUser,
    ]);
    this.app.get(`/users/:userId`, [
      usersMiddleware.validateUserExists,
      usersMiddleware.extractUserId,
      usersController.getUserById,
    ]);
  }
}
