const request = require('supertest');
const express = require('express');
const app = require('../../index');

describe('App', () => {
  it('should return welcome message on GET /', async () => {
    const response = await request(app)
      .get('/')
      .expect(200);

    expect(response.body).toHaveProperty('msg', 'The Homepage');
  });

  it('should handle 404 for unknown routes', async () => {
    await request(app)
      .get('/unknown-route')
      .expect(404);
  });
});
