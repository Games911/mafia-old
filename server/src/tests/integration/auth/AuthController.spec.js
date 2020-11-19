const supertest = require('supertest');
const app = require('../../../app');
const request = supertest(app);

describe('Test auth User', () => {

    const email = "useremail@gmail.com";
    const nikname = "user_nikname";
    const password = "123456";

    it('Signup user', async () => {
        const response = await request.post('/auth/signup').send({
            email: email,
            nikname: nikname,
            password: password,
        });

        expect(response.status).toBe(201);
    });

    it('Signin user', async () => {
        await request.post('/auth/signup').send({
            email: email,
            nikname: nikname,
            password: password,
        });

        const response = await request.post('/auth/signin').send({
            nikname: nikname,
            password: password
        });

        expect(response.status).toBe(200);
    });

});
