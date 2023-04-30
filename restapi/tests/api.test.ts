import request from 'supertest';
import api from '../api';
import User from '../user/UserModel';

describe('API', () => {
  it('should respond with 404 for invalid endpoint', async () => {
    const response = await request(api).get('/invalid');
    expect(response.status).toBe(404);
  });
});
