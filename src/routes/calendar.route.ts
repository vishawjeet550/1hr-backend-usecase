import express from 'express';
import calendarController from '../controllers/calendar.controller';

const router = express.Router();

router.get('/init', calendarController.init);
router.get('/redirect', calendarController.redirect);

export default router;
