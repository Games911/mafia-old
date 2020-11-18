const {hashPassword} = require('../../../../api/services/auth/passwordService');


describe('Test password service', () => {

    it('Hash password', async () => {
        const password = "123456";
        const passwordValue = await hashPassword(password);
        expect(typeof passwordValue).toBe('string');
    });

});