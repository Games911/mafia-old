const mockingoose = require('mockingoose').default;
const model = require('../../../database/models/auth/User');

describe('test mongoose User model', () => {
    it('should return the doc with findById', () => {
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


    it('should return the doc with update', () => {
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


    it('should return the doc incorrect name', () => {
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