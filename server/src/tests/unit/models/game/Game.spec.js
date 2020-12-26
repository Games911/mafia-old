const mockingoose = require('mockingoose').default;
const model = require('../../../../database/models/game/Game');

describe('Test mongoose Game model', () => {

    it('Find by Id game', async () => {
        const _doc = {
            _id: '507f191e810c19729de860ea',
            status: 'going',
        };
        mockingoose(model).toReturn(_doc, 'findOne');
        return model.findById({ _id: '507f191e810c19729de860ea' }).then(doc => {
            expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
        });
    });

    it('Update game', async () => {
        const _doc = {
            _id: '507f191e810c19729de860ea',
            status: 'going',
        };
        mockingoose(model).toReturn(_doc, 'update');
        return model
            .update({ status: 'end' })
            .where({ _id: '507f191e810c19729de860ea' })
            .then(doc => {
                expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
            });
    });

    it('Incorrect status', async () => {
        const _doc = {
            _id: '507f191e810c19729de860ea',
            status: 'going',
        };
        mockingoose(model).toReturn(_doc, 'findOne');
        return model.findById({ _id: '507f191e810c19729de860ea' }).then(doc => {
            doc.status = "Another";
            expect(doc.status).not.toBe(_doc.status);
        });
    });

});