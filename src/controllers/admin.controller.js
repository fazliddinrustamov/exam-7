import { read, write } from '../utils/model.js';
import { HASH } from '../utils/hash.js';
import jwt from "../utils/jwt.js";

const LOGIN = (req, res) => {
  try {
    let admins = read("admins");
    let { username, password } = req.body;
    
    password = HASH(password);

    let admin = admins.find((admin) => admin.username == username && admin.password == password);

    let id = admin.adminId

    if (!admin) {
      throw new Error ("Admin wasn't found")
    }

    res.status(200).send({
      status: 200, token: jwt.sign(id)
    })
  } catch (error) {
    res.status(404).send({ 
      status: 404, message: error.message
    });
  }
};

const WAITING = (req, res) => {
  try {
    let events = read("events");

    let waiting = events.filter(event => event.status === "pending");

    res.status(200).json({ status: 200, data: waiting });
  } catch (error) {
    res.status(403).json({ status: 403, message: error.message });
  }
};

const ALLOWED = (req, res) => {
  try {
    let events = read("events");

    let { event_id } = req.params;

    let event = events.find(event => event.event_id == event_id);

    console.log(event);
    if (event.status == "pending") {
      event.status = "active";

      write("events", events);
      res.status(200).json({ status: 200, data: event })
    } else {
      res.status(400).json({ status: 400, data: "event's status isn't pending" })
    }
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message })
  }
};

const REJECTED = ( req, res ) => {
  try {
    let events = read("events");

    let { event_id } = req.params;

    let event = events.find(event => event.event_id == event_id);

    if (event.status == "pending") {
      event.status = "rejected";

      write("events", events);
      res.status(200).json({ status: 200, data: event })
    } else {
      res.status(400).json({ status: 400, data: "event's status isn't pending" })
    }
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message })
  }
};


export {
  WAITING,
  ALLOWED,
  REJECTED,
  LOGIN
};