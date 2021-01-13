const mockingoose = require('mockingoose').default;
const model = require('../../../../database/models/game/Message');

describe('Test mongoose Message model', () => {

    it('Find by Id message', async () => {
        const _doc = {
            _id: '507f191e810c19729de860ea',
            text: 'Random',
        };
        mockingoose(model).toReturn(_doc, 'findOne');
        return model.findById({ _id: '507f191e810c19729de860ea' }).then(doc => {
            expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
        });
    });

    it('Update message', async () => {
        const _doc = {
            _id: '507f191e810c19729de860ea',
            text: 'Random',
        };
        mockingoose(model).toReturn(_doc, 'update');
        return model
            .update({ text: 'Another' })
            .where({ _id: '507f191e810c19729de860ea' })
            .then(doc => {
                expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
            });
    });

    it('Incorrect text', async () => {
        const _doc = {
            _id: '507f191e810c19729de860ea',
            text: 'Random',
        };
        mockingoose(model).toReturn(_doc, 'findOne');
        return model.findById({ _id: '507f191e810c19729de860ea' }).then(doc => {
            doc.text = "Another";
            expect(doc.text).not.toBe(_doc.text);
        });
    });

});