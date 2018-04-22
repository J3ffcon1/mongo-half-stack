const notFound = require('./not-found');
const videogames = require('../models/videogames');

const get = (req, res) => {
    const id = req.paths[1];
    id ? getOne(id, req, res) : getAll(req, res);
};

const getOne = (id, req, res) => {
    if(id.length != 24) {
        notFound(req, res);
    } else {
        videogames.SelectOne(id)
            .then(videogames => {
                if(!videogames) {
                    res.statusCode = 404;
                    res.send('404 - videogame could not be found');
                } else {
                    res.send(videogames);
                }
            });
    }
};

const getAll = (req, res) => {
    videogames.find().then(videogames => {
        res.send(videogames);
    });
};

const post =(req, res) => {
    videogames.insert(req.body).then(saved => {
        res.send(saved);
    });
};

const put = (req, res) => {
    const id = req.paths[1];
    videogames.update(id, req.body)
        .then(update => {
            res.send(update);
        });
};

const del = (req, res) => {
    videogames.delete(req.paths[1])
        .then(() => res.send({ removed: true }));
};

const methods = { get, post, put, delete: del };

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()] || notFound;
    method(req, res);
};