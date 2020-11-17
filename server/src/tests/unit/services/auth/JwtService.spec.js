const createToken = require('../../../../api/services/auth/jwtService');


describe('Test jwt service', () => {

    it('Create token', async () => {
        const user = {
            _id: '507f191e810c19729de860ea',
            nikname: 'name-nik',
        };
        const token = await createToken(user);
        expect(typeof token).toBe('string');
    });

});