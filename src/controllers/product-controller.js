const {
    getAll, save, update, search, getById, deleteById
} = require('../services/product-service');
const {NotFound} = require("../utilities/errors");

const getHandler = async (req, res, next) => {
    try {
        const contacts = await getAll();
        res.status(200).send(contacts);
    } catch (error) {
        return next(error, req, res);
    }
};

const searchHandler = async (req, res, next) => {
    try {
        const body = req.body;
        const result = await search(body);
        res.status(200).send(result);
    } catch (error) {
        return next(error, req, res);
    }
};

const getByIdHandler = async (req, res, next) => {
    try {
        const id = req.params.id;
        const product = await getById(id);
        if (product) {
            res.status(200).send(product);
        } else {
            throw new NotFound('Product not found by the id: ' + id);
        }
    } catch (error) {
        return next(error, req, res);
    }
};

const postHandler = async (req, res, next) => {
    try {
        // save message text/attachment in database
        let files = null;

        if (req.files && req.files.length > 0) {
            files= [];

            req.files.forEach((file) => {
                files.push(file.filename);
            });
        }

        const body = req.body;
        body.createdAt = new Date();
        body.files = files;
        body.updatedAt = new Date();
        const id = await save(body);
        res.status(201).send(id);
    } catch (error) {
        return next(error, req, res);
    }
};

const putHandler = async (req, res, next) => {
    try {
        const body = {...req.body, _id: req.params.id};
        const id = await update(body);
        res.status(200).send(id);
    } catch (error) {
        return next(error, req, res);
    }
};

const deleteHandler = async (req, res, next) => {
    try {
        const id = req.params.id;
        await deleteById(id);
        res.status(200).send('Contact deleted');
    } catch (error) {
        return next(error, req, res)
    }
}

module.exports = {
    getHandler,
    searchHandler,
    getByIdHandler,
    postHandler,
    putHandler,
    deleteHandler
}
