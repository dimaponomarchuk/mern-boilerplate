import express from 'express';

const crypto = require('crypto');

const jwt = require('jsonwebtoken');

export default class JwtMiddleware {
  private static _instance: JwtMiddleware;

  static getInstance() {
    if (!JwtMiddleware._instance) {
      JwtMiddleware._instance = new JwtMiddleware();
    }
    return JwtMiddleware._instance;
  }

  verifyRefreshBodyField(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.body && req.body.refreshToken) {
      return next();
    }
    return res.status(400).send({ error: 'need body field: refreshToken' });
  }

  validRefreshNeeded(req: any, res: express.Response, next: express.NextFunction) {
    const b = Buffer.from(req.body.refreshToken, 'base64');
    const refreshToken = b.toString();
    if (process.env.JWT) {
      const hash = crypto
        .createHmac('sha512', req.jwt.refreshKey)
        .update(req.jwt.userId + process.env.JWT)
        .digest('base64');
      if (hash === refreshToken) {
        delete req.jwt.iat;
        delete req.jwt.exp;
        req.body = req.jwt;
        return next();
      }
    }

    return res.status(400).send({ error: 'Invalid refresh token' });
  }

  validJWTNeeded(req: any, res: express.Response, next: express.NextFunction) {
    if (!req.headers.authorization) return res.status(401).send();

    try {
      const authorization = req.headers.authorization.split(' ');
      if (authorization[0] !== 'Bearer') {
        return res.status(401).send();
      }
      req.jwt = jwt.verify(authorization[1], process.env.JWT);
      return next();
    } catch (err) {
      return res.status(403).send();
    }
  }
}
