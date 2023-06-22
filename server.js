const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const httpErrors = require('http-errors');
const bodyParser = require('body-parser');

const FeedbackService = require('./services/FeedbackService');
const SpeakerService = require('./services/SpeakerService');

const feedbackService = new FeedbackService('./data/feedback.json');
const speakerService = new SpeakerService('./data/speakers.json');

const routes = require('./routes');

const app = express();

const PORT = 3000;
app.set('trust proxy', 1);
app.use(
    cookieSession({
        name: 'session',
        keys: ['Start13'],
    })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.locals.siteName = 'Roux Meetups';
app.use(express.static(path.join(__dirname, './static')));

app.use(async (req, res, next) => {
    try {
        const names = await speakerService.getNames();
        res.locals.speakersNames = names;
        return next();
    } catch (error) {
        return next(error);
    }
});

app.use('/', routes({ feedbackService, speakerService }));

app.use((req, res, next) => next(httpErrors(404, 'Page not found')));

app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status);
    if (err) {
        res.render('error', { err });
    }
});

app.listen(PORT, () => {
    console.log(`Express server is running on port ${PORT}`);
});
