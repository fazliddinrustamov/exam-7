import { Router } from "express";
import { catController, subcatController, GETBYIDCAT, GETBYIDSUBCAT } from "../controllers/categories.controller.js";

let categories = Router();

categories.get("/categories", catController);
categories.get("/categories/:id", GETBYIDCAT);
categories.get("/subcategories", subcatController);
categories.get("/subcategories/:id", GETBYIDSUBCAT);

export {
  categories
};