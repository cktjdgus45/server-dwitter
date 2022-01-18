import * as tweetRepository from '../model/tweet.js';

export async function getTweets(req, res) {
    const username = req.query.username;
    const data = await (username
        ? tweetRepository.getAllByUsername(username)
        : tweetRepository.getAll());
    res.status(200).json(data);
}

export async function getTweet(req, res) {
    const id = req.params.id;
    const tweet = await tweetRepository.getAllById(id);
    if (tweet) {
        res.status(200).json(tweet);
    } else {
        res.status(404).json({ msessage: `Tweet id ${id} is not found` });
    }
}

export async function updateTweet(req, res) {
    const id = req.params.id;
    const text = req.body.text;
    const tweet = await tweetRepository.update(id, text);
    if (tweet) {
        tweet.text = text;
        res.status(200).json(tweet);
    } else {
        res.status(404).json({ message: `not found ${id}` });
    }
}
export async function createTweet(req, res) {
    const { name, username, text } = req.body;
    const tweet = await tweetRepository.create(text, username, name);
    res.status(201).json(tweet);
}
export async function deleteTweet(req, res) {
    const id = req.params.id;
    await tweetRepository.remove(id);
    res.sendStatus(204);
}