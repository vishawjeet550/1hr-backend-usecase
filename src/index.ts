import express from 'express';
import './config';
import logger from './utils/logger.utils';
import calendarRoutes from './routes/calendar.route'

const { PORT } = process.env;

const app = express();

app.use('/v1/calendar', calendarRoutes);

app.listen(PORT, () => {
  logger.info(`Server started on port ${PORT}`);
});
