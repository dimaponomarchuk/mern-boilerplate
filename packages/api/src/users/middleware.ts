import express from 'express';

import UserService from './service';

export default class UserMiddleware {
  private static instance: UserMiddleware;

  static getInstance() {
    if (!UserMiddleware.instance) {
      UserMiddleware.instance = new UserMiddleware();
    }
    return UserMiddleware.instance;
  }

  validateRequiredCreateUserBodyFields(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    if (req.body && req.body.email && req.body.password && req.body.username) {
      next();
    } else {
      res.status(400).send({ error: `Missing required fields email and password` });
    }
  }

  async validateSameEmailDoesntExist(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const userService = UserService.getInstance();
    const user = await userService.getByEmail(req.body.email);
    if (user) {
      res.status(400).send({ error: `User email already exists` });
    } else {
      next();
    }
  }

  async validateUserExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const userService = UserService.getInstance();
    const user = await userService.readById(req.params.userId);
    if (user) {
      next();
    } else {
      res.status(404).send({ error: `User ${req.params.userId} not found` });
    }
  }

  async extractUserId(req: express.Request, res: express.Response, next: express.NextFunction) {
    req.body.id = req.params.userId;
    next();
  }
}
