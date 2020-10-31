const { User } = require('../../models/User');
const { mongoUrl } = require('../../config/config');
const userData = { email: 'user@gmail.com', nikname: 'Nikolo', password: '123' };

describe('User Model Test', () => {

    // It's just so easy to connect to the MongoDB Memory Server
    // By using mongoose.connect
    beforeAll(async () => {
        await mongoose.connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    it('create & save user successfully', async () => {
        const validUser = new User(userData);
        const savedUser = await validUser.save();
        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedUser._id).toBeDefined();
        expect(savedUser.email).toBe(userData.email);
        expect(savedUser.nikname).toBe(userData.nikname);
        expect(savedUser.password).toBe(userData.password);
    });

    // Test Schema is working!!!
    // You shouldn't be able to add in any field that isn't defined in the schema
    it('insert user successfully, but the field does not defined in schema should be undefined', async () => {
        const userWithInvalidField = new User({ email: 'user@gmail.com', nikname: 'Male', password: '123' });
        const savedUserWithInvalidField = await userWithInvalidField.save();
        expect(savedUserWithInvalidField._id).toBeDefined();
        expect(savedUserWithInvalidField.nikname).toBeUndefined();
    });

    // Test Validation is working!!!
    // It should us told us the errors in on nikname field.
    it('create user without required field should failed', async () => {
        const userWithoutRequiredField = new User({ email: 'user@gmail.com', password: '123' });
        let err;
        try {
            const savedUserWithoutRequiredField = await userWithoutRequiredField.save();
            const error = savedUserWithoutRequiredField;
        } catch (error) {
            err = error
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
        expect(err.errors.nikname).toBeDefined();
    });


})