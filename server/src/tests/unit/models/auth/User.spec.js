const mockingoose = require('mockingoose').default;
const model = require('../../../../database/models/auth/User');

describe('Test mongoose User model', () => {

    it('Find by Id user', async () => {
        const _doc = {
            _id: '507f191e810c19729de860ea',
            email: 'name@email.com',
            nikname: 'name-nik',
            password: '123'
        };
        mockingoose(model).toReturn(_doc, 'findOne');
        return model.findById({ _id: '507f191e810c19729de860ea' }).then(doc => {
            expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
        });
    });

    it('Update user', async () => {
        const _doc = {
            _id: '507f191e810c19729de860ea',
            email: 'name@email.com',
            nikname: 'name-nik',
            password: '123'
        };
        mockingoose(model).toReturn(_doc, 'update');
        return model
            .update({ name: 'changed' })
            .where({ _id: '507f191e810c19729de860ea' })
            .then(doc => {
                expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
            });
    });

    it('Incorrect name', async () => {
        const _doc = {
            _id: '507f191e810c19729de860ea',
            email: 'name@email.com',
            nikname: 'name-nik',
            password: '123'
        };
        mockingoose(model).toReturn(_doc, 'findOne');
        return model.findById({ _id: '507f191e810c19729de860ea' }).then(doc => {
            doc.nikname = "Another";
            expect(doc.nikname).not.toBe(_doc.nikname);
        });
    });

});