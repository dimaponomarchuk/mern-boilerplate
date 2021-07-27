import express from 'express';

import UserService from './service';

export default class UsersController {
  listUsers(req: express.Request, res: express.Response) {
    const userService = UserService.getInstance();
    const users = userService.list(Number(req.query.limit), Number(req.query.page));
    res.status(200).send(users);
  }

  async getUserById(req: express.Request, res: express.Response) {
    const userService = UserService.getInstance();
    const user = await userService.readById(req.params.userId);
    res.status(200).send(user);
  }

  async createUser(req: express.Request, res: express.Response) {
    const userService = UserService.getInstance();
    const id = await userService.create(req.body);

    res.status(201).send({ id });
  }

  patch(req: express.Request, res: express.Response) {
    const userService = UserService.getInstance();
    userService.patchById(req.params.userId, req.body);
    res.status(204).send();
  }

  put(req: express.Request, res: express.Response) {
    const userService = UserService.getInstance();
    userService.updateById(req.params.userId, req.body);
    res.status(204).send();
  }

  removeUser(req: express.Request, res: express.Response) {
    const userService = UserService.getInstance();
    userService.deleteById(req.params.userId);
    res.status(204).send();
  }
}
