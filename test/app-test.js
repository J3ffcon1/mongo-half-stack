const chai =require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { assert } = chai;
const app = require('../lib/app');
const mongo = require('../lib/mongodb');

describe('Mongo testing', () => {

    before(() => {
        return mongo.then(db => {
            db.collection('videogames').remove();
        });
    });

    let armello = {
        name: 'Armello',
        developer: 'League of Geeks'
    };

    // let night = {
    //     name: 'Night in the Woods',
    //     developer: 'Secret Lab'
    // };
    it('saves a video game', () => {
        return chai.request(app)
            .post('/videogames')
            .send(armello)
            .then(({ body })=> {
                assert.ok(body._id);
                assert.equal(body.name, armello.name);
                armello = body;
            });
    });

    it('gets a video game', () => {
        return chai.request(app)
            .get(`/videogames/${armello._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, armello);
            });
    });



}); 