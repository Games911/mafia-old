const {hashPassword, comparePassword} = require('../../../../api/services/auth/passwordService');


describe('Test password service', () => {

    it('Hash password', async () => {
        const password = "123456";
        const passwordValue = await hashPassword(password);
        expect(typeof passwordValue).toBe('string');
    });

    it('Compare password', async () => {
        const password = "123456";
        const passwordHash = "$2b$10$yU3X.lr7SYcgaaFGzLiKEOfY70mQHnnlLf0OipkG21zSakehew0cu";
        const passwordValue = await comparePassword(password, passwordHash);
        expect(passwordValue).toBeTruthy();
    });

});