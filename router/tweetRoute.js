import express from 'express';
import 'express-async-errors';
import * as tweetController from '../controller/tweetController.js';
import { body, validationResult, param } from 'express-validator';
import { validate } from '../middleware/validator.js';

const tweetRouter = express.Router();
const validateTweet = [body('text')
    .trim()
    .isLength({ min: 3 })
    .withMessage('text should be at least 3 characters'), validate];

tweetRouter.get('/', tweetController.getTweets);

tweetRouter.get('/:id', tweetController.getTweet);

tweetRouter.post('/', validateTweet, tweetController.createTweet);

tweetRouter.put('/:id', validateTweet, tweetController.updateTweet);

tweetRouter.delete('/:id', tweetController.deleteTweet);

export default tweetRouter;