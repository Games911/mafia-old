const supertest = require('supertest');
const app = require('../../../app');
const request = supertest(app);

describe('Signup User', () => {
    it('should be able to create user', async () => {
        const response = await request.post('/auth/signup').send({
            email: 'useremail@email.com',
            nikname: 'userName',
            password: '123123',
        });

        expect(response.status).toBe(200);
    });
});
