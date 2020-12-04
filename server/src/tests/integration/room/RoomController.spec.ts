const supertest = require('supertest');
const app = require('../../../app');
const request = supertest(app);

describe('Test room controllers', () => {

    const email = "useremail@gmail.com";
    const nikname = "user_nikname";
    const password = "123456";

    const nameRoom = "random_name";

    it('Create room', async () => {
        const responseUser = await request.post('/auth/signup').send({
            email: email,
            nikname: nikname,
            password: password,
        });

        const response = await request.post('/room').send({
            name: nameRoom,
            userId: responseUser.body.userId,
        });

        expect(response.status).toBe(201);
    });

    it('Get rooms', async () => {
        const response = await request.get('/room').send();

        expect(response.status).toBe(200);
    });

});
