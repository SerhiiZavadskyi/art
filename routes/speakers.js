const express = require('express');

const router = express.Router();

module.exports = (params) => {
    const { speakerService } = params;

    router.get('/', async (req, res) => {
        const speakers = await speakerService.getList();
        const artworks = await speakerService.getAllArtwork();
        res.render('layout', { pageTitle: 'Speaker', template: 'speakers', speakers, artworks });
    });

    router.get('/:shortname', async (req, res) => {
        const speaker = await speakerService.getSpeaker(req.params.shortname);
        const artworks = await speakerService.getArtworkForSpeaker(req.params.shortname);
        res.render('layout', {
            pageTitle: 'Speakers',
            template: 'speaker-detail',
            speaker,
            artworks,
        });
    });

    return router;
};
