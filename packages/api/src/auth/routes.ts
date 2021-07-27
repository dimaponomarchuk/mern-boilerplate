import express from 'express';

import { CommonRoutesConfig, ConfigureRoutes } from '../common/routes';

import AuthController from './controller';
import JwtMiddleware from './jwt.middleware';
import AuthMiddleware from './middleware';

export default class AuthRoutes extends CommonRoutesConfig implements ConfigureRoutes {
  constructor(app: express.Application) {
    super(app, 'AuthRoutes');
    this.configureRoutes();
  }

  configureRoutes() {
    const usersController = new AuthController();
    const authMiddleware = AuthMiddleware.getInstance();
    const jwtMiddleware = JwtMiddleware.getInstance();
    this.app.post(`/auth`, [
      authMiddleware.validateBodyRequest,
      authMiddleware.verifyUserPassword,
      usersController.createJWT,
    ]);
    this.app.post(`/auth/refresh-token`, [
      jwtMiddleware.validJWTNeeded,
      jwtMiddleware.verifyRefreshBodyField,
      jwtMiddleware.validRefreshNeeded,
      usersController.createJWT,
    ]);
  }
}
