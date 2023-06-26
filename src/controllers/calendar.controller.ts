import { Request, Response } from 'express';
import { google } from 'googleapis';
import logger from '../utils/logger.utils';

const { CLIENT_ID, CLIENT_SECRET, SCOPES, REDIRECT_URI } = process.env;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const calendarController = {
  init: (req: Request, res: Response) => {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: (SCOPES || '').split(','),
    });
    res.redirect(authUrl);
  },
  redirect: async (req: Request, res: Response) => {
    const code = req.query.code as string;

    try {
      const { tokens } = await oAuth2Client.getToken(code);
      oAuth2Client.setCredentials(tokens);
      // Retrieve events from the user's calendar
      const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });
      const { data } = await calendar.events.list({
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
      });
      const events = data.items;
      res.json(events);
    } catch (error) {
      logger.error('Error retrieving access token:', error);
      res.status(500).json({ error: 'Failed to retrieve access token' });
    }
  },
};

export default calendarController;
