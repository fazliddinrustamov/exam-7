import { Router } from 'express';
import { POST } from '../middlewares/validation.middleware.js';
import {
	GET,
	NEWEVENT,
	GETBYID
} from '../controllers/events.controller.js';

const events = Router();

events.get('/events', GET);

events.post('/events', POST, NEWEVENT);

// POST FROM BODY FORM-DATA !!!

events.get('/events/:event_id', GETBYID);

export { 
	events
};