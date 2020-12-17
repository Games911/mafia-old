const mockingoose = require('mockingoose').default;
const model = require('../../../../database/models/room/Room');

describe('Test mongoose Room model', () => {

    it('Find by Id room', async () => {
        const _doc = {
            _id: '507f191e810c19729de86044',
            name: 'Room1',
            status: 'free',
            players: [],
            createdBy: [],
        };
        mockingoose(model).toReturn(_doc, 'findOne');
        return model.findById({ _id: '507f191e810c19729de86044' }).then(doc => {
            expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
        });
    });

    it('Update room', async () => {
        const _doc = {
            _id: '507f191e810c19729de86044',
            name: 'Room1',
            status: 'free',
            players: [],
            createdBy: [],
        };
        mockingoose(model).toReturn(_doc, 'update');
        return model
            .update({ name: 'changed' })
            .where({ _id: '507f191e810c19729de86044' })
            .then(doc => {
                expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
            });
    });

    it('Incorrect name', async () => {
        const _doc = {
            _id: '507f191e810c19729de86044',
            name: 'Room1',
            status: 'free',
            players: [],
            createdBy: [],
        };
        mockingoose(model).toReturn(_doc, 'findOne');
        return model.findById({ _id: '507f191e810c19729de86044' }).then(doc => {
            doc.nikname = "Another";
            expect(doc.nikname).not.toBe(_doc.nikname);
        });
    });

});