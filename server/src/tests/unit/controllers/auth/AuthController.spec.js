const authController = require('../../../../api/controllers/auth/authController');


describe('Test auth controller', () => {

    const email = "useremail@gmail.com";
    const nikname = "user_nikname";
    const password = "123456";

    it('Signup user', () => {
        const tokenPromise = authController.createUser(email, nikname, password);
        tokenPromise.then((token) => {
            expect(typeof token).toBe('string');
        });

    });

    it('Signin user',  () => {
        authController.createUser(email, nikname, password);
        const tokenPromise = authController.loginUser(nikname, password);
        tokenPromise.then((token) => {
            expect(typeof token).toBe('string');
        });
    });

});