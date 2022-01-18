import express from 'express';
import 'express-async-errors';
import * as tweetRepository from '../model/tweet.js';
import * as tweetController from '../controller/tweetController.js';

const tweetRouter = express.Router();
tweetRouter.get('/', tweetController.getTweets)

tweetRouter.get('/:id', tweetController.getTweet)

tweetRouter.post('/', tweetController.createTweet)

tweetRouter.put('/:id', tweetController.updateTweet);

tweetRouter.delete('/:id', tweetController.deleteTweet);

export default tweetRouter;