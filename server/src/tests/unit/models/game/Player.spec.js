const mockingoose = require('mockingoose').default;
const model = require('../../../../database/models/game/Player');

describe('Test mongoose Player model', () => {

    it('Find by Id player', async () => {
        const _doc = {
            _id: '507f191e810c19729de860ea',
            role: 'Mafia',
        };
        mockingoose(model).toReturn(_doc, 'findOne');
        return model.findById({ _id: '507f191e810c19729de860ea' }).then(doc => {
            expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
        });
    });

    it('Update player', async () => {
        const _doc = {
            _id: '507f191e810c19729de860ea',
            role: 'Mafia',
        };
        mockingoose(model).toReturn(_doc, 'update');
        return model
            .update({ role: 'Another' })
            .where({ _id: '507f191e810c19729de860ea' })
            .then(doc => {
                expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
            });
    });

    it('Incorrect role', async () => {
        const _doc = {
            _id: '507f191e810c19729de860ea',
            role: 'Mafia',
        };
        mockingoose(model).toReturn(_doc, 'findOne');
        return model.findById({ _id: '507f191e810c19729de860ea' }).then(doc => {
            doc.role = "Another";
            expect(doc.role).not.toBe(_doc.role);
        });
    });

});