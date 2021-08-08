import express from 'express';

import UserService from '../users/service';

export default class AuthMiddleware {
  private static _instance: AuthMiddleware;

  static getInstance(): AuthMiddleware {
    if (!AuthMiddleware._instance) {
      AuthMiddleware._instance = new AuthMiddleware();
    }
    return AuthMiddleware._instance;
  }

  async validateBodyRequest(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    if (req.body && req.body.email && req.body.password) {
      next();
    } else {
      res.status(400).send({ error: 'Missing body fields: email, password' });
    }
  }

  async verifyUserPassword(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const userService = UserService.getInstance();
    const user = await userService.getByEmail(req.body.email);
    if (user && user.validatePassword(req.body.password)) {
      req.body = {
        userId: user.id,
        email: user.email,
        permissionLevel: user.permissionLevel,
      };
      return next();
    }
    return res.status(400).send({ errors: `Invalid e-mail and/or password` });
  }
}
