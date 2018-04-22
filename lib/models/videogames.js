const mongo = require('../mongodb');
const { ObjectId } = require('mongodb');
module.exports = {
    
    insert(videogames) {
        return mongo.then(db => {
            return db.collection('videogames')
                .insert(videogames)
                .then(result => result.ops[0]);
        });
        
    },
    find() {
        return mongo.then(db => {
            return db.collection('videogames')
                .find()
                .toArray()
                .then(result => {
                    return result;
                });
        });
    },

    SelectOne(id) {
        const idObj = { _id: ObjectId(id) };
        return mongo.then(db => {
            return db.collection('videogames')
                .findOne(idObj);
        });
    },

    update(videogames) {
        const update = {developer: videogames.developer};
        return mongo.then(db => {
            return db.collection('videogames')
                .update({_id: ObjectId(videogames._id)}, { $set: update});
        });
    },

    delete(id) {
        const idObj = { _id: ObjectId(id) };
        return mongo.then(db => {
            return db.collection('videogames')
                .remove(idObj);
        });
    }
};