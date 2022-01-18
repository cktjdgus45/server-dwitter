import express from 'express';
import 'express-async-errors';
import * as tweetRepository from '../model/tweet.js';

const tweetRouter = express.Router();
tweetRouter.get('/', (req, res, next) => {
    const username = req.query.username;
    const data = username
        ? tweetRepository.getAllByUsername(username)
        : tweetRepository.getAll();
    res.status(200).json(data);
})

tweetRouter.get('/:id', (req, res, next) => {
    const id = req.params.id;
    const tweet = tweetRepository.getAllById(id);
    if (tweet) {
        res.status(200).json(tweet);
    } else {
        res.status(404).json({ msessage: `Tweet id ${id} is not found` });
    }
})

tweetRouter.post('/', (req, res, next) => {
    const { name, username, text } = req.body;
    const tweet = tweetRepository.create(text, username, name);
    res.status(201).json(tweet);
})

tweetRouter.put('/:id', (req, res, next) => {
    const id = req.params.id;
    const text = req.body.text;
    const tweet = tweetRepository.update(id, text);
    if (tweet) {
        tweet.text = text;
        res.status(200).json(tweet);
    } else {
        res.status(404).json({ message: `not found ${id}` });
    }
});

tweetRouter.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    tweetRepository.remove(id);
    res.sendStatus(204);
});

export default tweetRouter;