'use strict';

const config = require('./config.json');
const { WebClient } = require('@slack/web-api');

/**
 *
 * @param {object} req Cloud Function request object.
 * @param {object} req.body The request payload.
 * @param {string} req.rawBody Raw request payload used to validate Slack's message signature.
 * @param {object} res Cloud Function response object.
 */
exports.handler = async (req, res) => {
    console.log(config);
    console.dir(req);
    try {
        if (req.method !== 'POST') {
            const error = new Error('Only POST requests are accepted');
            error.code = 405;
            throw error;
        }

        const web = new WebClient(config.SLACK_SECRET);

        (async () => {
            // See: https://api.slack.com/methods/chat.postMessage
            const res = await web.chat.postMessage({ 
                channel: req.query.channel, 
                username: req.query.username,
                text: '```' + req.rawBody.toString() + '```'
            });
        })();

        res.send('Accepted');
        return Promise.resolve();
    } catch (err) {
        console.error(err);
        res.status(err.code || 500).send(err);
        return Promise.reject(err);
    }
};
