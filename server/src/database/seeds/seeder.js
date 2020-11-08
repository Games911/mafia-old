const seedUser = require('./seedUser');

seedUser()
    .then(() => {
        console.log("Seed");
    })
    .catch(err => console.log(err));