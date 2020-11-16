const hashPassword = require('../../../../api/services/auth/passwordService');


describe('test password service', () => {

    it('should return password hash', () => {
        const password = "123456";
        const passwordPromise = hashPassword(password);
        passwordPromise.then((passwordHash) => {
            expect(typeof passwordHash).toBe('string');
        });
    });

});