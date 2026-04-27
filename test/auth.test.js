// Import testing modules and the app.js
const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');


// Test suite for authentication routes
describe('Auth Routes', () => {

  // Test case for user registration
     it('should register a new user', async () => {
    const res = await request(app)
      .post('/users/register')
      .send({
        name: 'Test User',
        email: `test_${Date.now()}@test.com`,
        password: 'password123',      
      });

      // Debugging: Log the response body to see what is returned from the server
      // console.log(res.body);

    // Assertions to check if the response is as expected
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('message');
    expect(res.body).to.have.property('user');
    expect(res.body.user).to.have.property('email');
  });

  // Test case for user login
  it('should login an existing user', async () => {
  const email = `test_${Date.now()}@test.com`;

  // Register first
  await request(app)
    .post('/users/register')
    .send({
      name: 'Test User',
      email,
      password: 'password123'
    });

  // Then login
  const res = await request(app)
    .post('/users/login')
    .send({
      email,
      password: 'password123'
    });

  expect(res.status).to.equal(200);
  expect(res.body).to.have.property('token');
});

});



