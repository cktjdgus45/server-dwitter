import express from 'express';
import 'express-async-errors';

let tweets = [
    {
        id: '1',
        text: '화이팅',
        createdAt: Date.now().toString(),
        name: 'Bob',
        username: 'bob',
        url: 'https://www.naver.com/'
    },
    {
        id: '2',
        text: '화이팅',
        createdAt: Date.now().toString(),
        name: 'Paul',
        username: 'paul',
        url: 'https://www.naver.com/'
    },
]
const tweetRouter = express.Router();
//GET /tweets
//GET /tweets?username=:username
tweetRouter.get('/', (req, res, next) => {
    const username = req.query.username;
    const data = username
        ? tweets.filter(t => t.username === username)
        : tweets;
    res.status(200).json(data);
})
//GET /tweets/:id
tweetRouter.get('/:id', (req, res, next) => {
    const id = req.params.id;
    const tweet = tweets.find(t => t.id === id);
    if (tweet) {
        res.status(200).json(tweet);
    } else {
        res.status(404).json({ msessage: `Tweet id ${id} is not found` });
    }
})
//POST /tweets
tweetRouter.post('/', (req, res, next) => {
    const { name, username, text } = req.body;
    const tweet = {
        id: Date.now().toString(),
        text,
        createdAt: new Date(),
        name,
        username
    }
    tweets = [tweet, ...tweets];
    res.status(201).json(tweet);
})
//PUT /tweets/:id
tweetRouter.put('/:id', (req, res, next) => {
    const id = req.params.id;
    const text = req.body.text;
    const tweet = tweets.find(t => t.id === id);
    if (tweet) {
        tweet.text = text;
        res.status(200).json(tweet);
    } else {
        res.status(404).json({ message: `not found ${id}` });
    }
});
//DELETE /tweets/:id
tweetRouter.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    tweets = tweets.filter(t => t.id !== id);
    res.sendStatus(204);
});

export default tweetRouter;