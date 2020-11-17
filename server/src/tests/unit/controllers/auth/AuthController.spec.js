const authController = require('../../../../api/controllers/auth/authController');


describe('Test auth controller', () => {

    it('Signup user', async () => {
        const token = await authController.createUser("useremail@gmail.com", "nikname", "123");
        expect(typeof token).toBe('string');
    });

});