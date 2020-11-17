const supertest = require('supertest');
const app = require('../../../app');
const request = supertest(app);

describe('Test signup User', () => {

    it('Signup user', async () => {
        const response = await request.post('/auth/signup').send({
            email: 'useremail@email.com',
            nikname: 'userName',
            password: '123123',
        });

        expect(response.status).toBe(201);
    });

});
