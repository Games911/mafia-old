const createToken = require('../../../../api/services/auth/jwtService');


describe('test jwt service', () => {

    it('should return token', () => {
        const user = {
            _id: '507f191e810c19729de860ea',
            nikname: 'name-nik',
        };
        const tokenPromise = createToken(user);
        tokenPromise.then((token) => {
            expect(typeof token).toBe('string');
        });
    });

});