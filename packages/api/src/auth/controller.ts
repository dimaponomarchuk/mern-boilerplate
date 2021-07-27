import express from 'express';

const crypto = require('crypto');

const jwt = require('jsonwebtoken');

const tokenExpirationInSeconds = 3600;

export default class AuthController {
  async createJWT(req: express.Request, res: express.Response) {
    const jwtSecret = process.env.JWT;
    if (!jwtSecret) return res.status(500).send({ error: 'Invalid refresh token' });

    try {
      const refreshId = req.body.userId + jwtSecret;
      const salt = crypto.randomBytes(16).toString('base64');
      const hash = crypto.createHmac('sha512', salt).update(refreshId).digest('base64');
      req.body.refreshKey = salt;
      const token = jwt.sign(req.body, jwtSecret, { expiresIn: tokenExpirationInSeconds });
      const b = Buffer.from(hash);
      const refreshToken = b.toString('base64');
      return res.status(201).send({ accessToken: token, refreshToken });
    } catch (err) {
      return res.status(500).send(err);
    }
  }
}
