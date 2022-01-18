import * as tweetRepository from '../model/tweet.js';

export function getTweets(req, res) {
    const username = req.query.username;
    const data = username
        ? tweetRepository.getAllByUsername(username)
        : tweetRepository.getAll();
    res.status(200).json(data);
}

export function getTweet(req, res) {
    const id = req.params.id;
    const tweet = tweetRepository.getAllById(id);
    if (tweet) {
        res.status(200).json(tweet);
    } else {
        res.status(404).json({ msessage: `Tweet id ${id} is not found` });
    }
}

export function updateTweet(req, res) {
    const id = req.params.id;
    const text = req.body.text;
    const tweet = tweetRepository.update(id, text);
    if (tweet) {
        tweet.text = text;
        res.status(200).json(tweet);
    } else {
        res.status(404).json({ message: `not found ${id}` });
    }
}
export function createTweet(req, res) {
    const { name, username, text } = req.body;
    const tweet = tweetRepository.create(text, username, name);
    res.status(201).json(tweet);
}
export function deleteTweet(req, res) {
    const id = req.params.id;
    tweetRepository.remove(id);
    res.sendStatus(204);
}