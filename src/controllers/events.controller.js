import { read, write } from '../utils/model.js';
import fs from 'fs'
import path from 'path';

let GET = (req, res) => {
	let events = read("events")
	let { date, type, sub_category_id, fullname } = req.query;

  fullname = fullname?.toLowerCase();

	events = events.filter(event => event.status == "active")

	let eventsFilter = events.filter(event => {
		let bySubcategory = sub_category_id ? event.sub_category_id == sub_category_id : true;
		let byType = type ? event.type == type : true;
		let byDate = date ? event.date == date : true;

		return bySubcategory && byType && byDate;
	})

	res.status(200).send({ status: 200, data: eventsFilter });
}

let GETBYID = (req, res) => {
	let events = read("events")
	let { event_id } = req.params;

	let foundEvent = events.find(event => event.event_id == event_id);

	res.status(200).json({ status: 200, data: foundEvent })
}

let NEWEVENT = (req, res) => {
  try {
		let events = read("events")
    
		let { date, category_id, sub_category_id, type, event_link, orginazer, profession, fullname, contact, description, text, title} = req.body;

		let { eventImg } = req.files;

		let img = Date.now() + eventImg.name;

		fs.writeFileSync(path.resolve("uploads", eventImg.name), eventImg.data, "utf-8");

		const NEWEVENT = {
			event_id: events.at(-1)?.event_id + 1 || 1,
			status: "pending",
			date,
      category_id,
      sub_category_id,
      type,
      event_link,
      orginazer,
      profession,
      fullname,
      contact,
			title,
      description,
			eventImg: img,
      text
		}

		events.push(NEWEVENT);

    write("events", events);

		res.status(201).json({ status: 201, message: "new event added", date: NEWEVENT })
	} catch (error) {
		res.status(400).json({ status: 400, message: error.message })
	}
};

export {
  GET,
  NEWEVENT,
	GETBYID
};