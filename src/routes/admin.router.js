import { Router } from "express";
import { POST } from "../middlewares/validation.middleware.js";
import { checkToken } from "../middlewares/checkToken.middleware.js";
import { WAITING, ALLOWED, REJECTED, LOGIN } from "../controllers/admin.controller.js"

let admin = Router()

admin.post("/login", POST, LOGIN);

// Login Info

// username: Fazliddin, password: olmaolma, token: eyJhbGciOiJIUzI1NiJ9.MQ.jQ4SQgBYuN27BjZhhvENS2IRESU964mQ60x5TfiqxAs

admin.get("/waiting", checkToken, WAITING);

admin.get("/allowed/:event_id", checkToken, ALLOWED);

admin.get("/rejected/:event_id", checkToken, REJECTED);

export {
  admin
};