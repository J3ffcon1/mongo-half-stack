const mongo = require('../mongodb');
const { ObjectId } = require('mongodb');
module.exports = {

    find() {
        return mongo.then(db => {
            return db.collection('videogames')
                .find()
                .toArray();
        });
    },

    insert(videogames) {
        return mongo.then(db => {
            return db.collection('videogames')
                .insert(videogames)
                .then(result => result.ops[0]);
        });
    },

    SelectOne(id) {
        const idObj = { _id: ObjectId(id) };
        return mongo.then(db => {
            return db.collection('videogames')
                .findOne(idObj);
        });
    },
    
};