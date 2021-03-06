import { expect } from 'chai';
import { agent as request } from 'supertest';
import path from 'path';

import app from '../src/index';

let firstUserIdTest = '';
const firstUserBody = {
  name: 'Marcos',
  surname: 'Silva',
  username: 'Marcossssssilva',
  email: 'tio.makin@gmail.com',
  password: 'Pass#your!word',
};

it('should POST /users', async () => {
  const res = await request(app).post('/users').send(firstUserBody);
  expect(res.status).to.equal(201);
  expect(res.body).not.to.be.empty;
  expect(res.body).to.be.an('object');
  expect(res.body.id).to.be.an('string');
  firstUserIdTest = res.body.id;
});
it(`should GET /users/:userId`, async () => {
  const res = await request(app).get(`/users/${firstUserIdTest}`).send();
  expect(res.status).to.equal(200);
  expect(res.body).not.to.be.empty;
  expect(res.body).to.be.an('object');
  expect(res.body.id).to.be.an('string');
  expect(res.body.name).to.be.equals(firstUserBody.name);
  expect(res.body.surname).to.be.equals(firstUserBody.surname);
  expect(res.body.username).to.be.equals(firstUserBody.username);
  expect(res.body.email).to.be.equals(firstUserBody.email);
  expect(res.body.id).to.be.equals(firstUserIdTest);
});
it(`should GET /users`, async () => {
  const res = await request(app).get(`/users`).send();
  expect(res.status).to.equal(200);
  expect(res.body).not.to.be.empty;
  expect(res.body).to.be.an('array');
  expect(res.body[0].id).to.be.an('string');
  expect(res.body[0].name).to.be.equals(firstUserBody.name);
  expect(res.body[0].surname).to.be.equals(firstUserBody.surname);
  expect(res.body[0].username).to.be.equals(firstUserBody.username);
  expect(res.body[0].email).to.be.equals(firstUserBody.email);
  expect(res.body[0].id).to.be.equals(firstUserIdTest);
});
it('should PUT /users/:userId', async () => {
  const name = 'Jose';
  const res = await request(app).put(`/users/${firstUserIdTest}`).send({
    name,
    email: firstUserBody.email,
  });
  expect(res.status).to.equal(204);
});
it(`should GET /users/:userId to have a new name`, async () => {
  const res = await request(app).get(`/users/${firstUserIdTest}`).send();
  expect(res.status).to.equal(200);
  expect(res.body).not.to.be.empty;
  expect(res.body).to.be.an('object');
  expect(res.body.id).to.be.an('string');
  expect(res.body.name).to.be.not.equals(firstUserBody.name);
  expect(res.body.email).to.be.equals(firstUserBody.email);
  expect(res.body.id).to.be.equals(firstUserIdTest);
});
it('should PATCH /users/:userId', async () => {
  const res = await request(app)
    .patch(`/users/${firstUserIdTest}`)
    .attach('avatar', path.join(__dirname, 'assets/test.jpeg'), 'test.jpeg');
  expect(res.status).to.equal(204);
});
it(`should GET /users/:userId to have a new field called avatar URL`, async () => {
  const res = await request(app).get(`/users/${firstUserIdTest}`).send();
  expect(res.status).to.equal(200);
  expect(res.body).not.to.be.empty;
  expect(res.body).to.be.an('object');
  expect(res.body.id).to.be.an('string');
  expect(res.body.avatarURL).not.to.be.empty;
});
it('should DELETE /users/:userId', async () => {
  const res = await request(app).delete(`/users/${firstUserIdTest}`).send();
  expect(res.status).to.equal(204);
});
it(`should GET /users`, async () => {
  const res = await request(app).get(`/users`).send();
  expect(res.status).to.equal(200);
  expect(res.body).to.be.an('array');
  expect(res.body).to.be.empty;
});
