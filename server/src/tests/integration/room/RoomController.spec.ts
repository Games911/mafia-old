const supertest = require('supertest');
const app = require('../../../app');
const request = supertest(app);

describe('Test room controllers', () => {

    const email = "useremail@gmail.com";
    const nikname = "user_nikname";
    const password = "123456";
    const nameRoom = "random_name";

    const signUpUser = async () => {
        return await request.post('/auth/signup').send({
            email: email,
            nikname: nikname,
            password: password,
        });
    }

    it('Create room', async () => {
        const responseUser = await signUpUser();
        const token = responseUser.body.token;

        const response = await request.post('/room').set('Authorization', 'Bearer ' + token).send({
            name: nameRoom,
            userId: responseUser.body.userId,
        });

        expect(response.status).toBe(201);
    });

    it('Get rooms', async () => {
        const responseUser = await signUpUser();
        const token = responseUser.body.token;

        const response = await request.get('/room').set('Authorization', 'Bearer ' + token).send();

        expect(response.status).toBe(200);
    });

    it('Add user to rooms', async () => {
        const responseUser = await signUpUser();
        const token = responseUser.body.token;

        const responseRoom = await request.post('/room').set('Authorization', 'Bearer ' + token).send({
            name: nameRoom,
            userId: responseUser.body.userId,
        });

        const responseOutUserRoom = await request.get(
            '/room/' + responseRoom.body.room._id + '/out/' + responseUser.body.userId
        ).set('Authorization', 'Bearer ' + token).send();

        const response = await request.post('/room/' + responseRoom.body.room._id + '/add-user').set('Authorization', 'Bearer ' + token).send({
            userId: responseUser.body.userId,
        });

        expect(response.status).toBe(200);
    });

    it('Go out user from rooms', async () => {
        const responseUser = await signUpUser();
        const token = responseUser.body.token;

        const responseRoom = await request.post('/room').set('Authorization', 'Bearer ' + token).send({
            name: nameRoom,
            userId: responseUser.body.userId,
        });

        const responseAddUserRoom = await request.post('/room/' + responseRoom.body.room._id + '/add-user')
            .set('Authorization', 'Bearer ' + token).send({
            userId: responseUser.body.userId,
        });

        const responseOutUserRoom = await request.get(
            '/room/' + responseRoom.body.room._id + '/out/' + responseUser.body.userId
        ).set('Authorization', 'Bearer ' + token).send();

        expect(responseOutUserRoom.status).toBe(200);
    });

    it('Is user busy', async () => {
        const responseUser = await signUpUser();
        const token = responseUser.body.token;

        const responseIsBusyUser = await request.get(
            '/room/is-user-busy/' + responseUser.body.userId
        ).set('Authorization', 'Bearer ' + token).send();

        expect(responseIsBusyUser.status).toBe(200);
    });

});
