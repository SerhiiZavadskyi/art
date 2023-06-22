const express = require('express');

const router = express.Router();

module.exports = (params) => {
    const { speakerService } = params;

    router.get('/', async (req, res, next) => {
        try {
            const speakers = await speakerService.getList();
            const artworks = await speakerService.getAllArtwork();
            return res.render('layout', {
                pageTitle: 'Speaker',
                template: 'speakers',
                speakers,
                artworks,
            });
        } catch (error) {
            return next(error);
        }
    });

    router.get('/:shortname', async (req, res, next) => {
        try {
            const speaker = await speakerService.getSpeaker(req.params.shortname);
            const artworks = await speakerService.getArtworkForSpeaker(req.params.shortname);
            return res.render('layout', {
                pageTitle: 'Speakers',
                template: 'speaker-detail',
                speaker,
                artworks,
            });
        } catch (error) {
            return next(error);
        }
    });

    return router;
};
