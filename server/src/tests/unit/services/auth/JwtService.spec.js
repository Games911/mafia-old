const {createToken, decodeToken} = require('../../../../api/services/auth/jwtService');


describe('Test jwt service', () => {

    it('Create token', async () => {
        const user = {
            _id: '507f191e810c19729de860ea',
            nikname: 'name-nik',
        };
        const token = await createToken(user);
        expect(typeof token).toBe('string');
    });

    it('Decode token', async () => {
        const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjVmZGY0OTJhZTUxYTc5MDAyYWI1ZTBlNiIsImVtYWlsIjoidGFyYXNAZ21haWwuY29tIiwibmlrbmFtZSI6InR0IiwiaWF0IjoxNjA4NDkzOTUwNTA2fQ.fXQ-0dM9hVnu4K65KRZLnni2EYmhl3jEDss_NpAafyU';
        const result = await decodeToken(token);
        expect(typeof result).toBe('object');
    });

});