import { read, write } from '../utils/model.js';

let catController = (req, res) => {
  let categories = read("categories");
  let subcategories = read("subcategories");

  let { id } = req.params;

  categories = categories.filter(category => {
    return category.subcategories = subcategories.filter(subcategory => subcategory.category_id == category.category_id && delete subcategory.category_id)
  })

  if ( id ) {
    categories = categories.filter(category => category.category_id == id);
    return res.status(200).send(categories)
  }

  return res.status(200).send(categories)
};

const GETBYIDCAT = (req, res) => {
  let categories = read('categories')
  let subcategories = read("subcategories");
  let { id } = req.params
  let category = categories.find(category => category.category_id == id)
  categories.map(category => {
    category.subCategories = subcategories.filter(subcategory => subcategory.category_id == category.category_id)
    category.subCategories.filter(subcategory => delete subcategory.category_id)
  })

  res.send( category )
}

let subcatController = (req, res)=>{
  try {
    let subcategories = read("subcategories");
    let { id } = req.query;

    if ( id ) {
      return subcategories = subcategories.filter((category)=> category.subcategory_id == id )
    }
    return res.status(200).send(subcategories)
  } catch (error) {
    return res.status(404).send(error.message)
  }
};

const GETBYIDSUBCAT = (req, res) => {
  let subcategories = read("subcategories");
  let { id } = req.params
  let subcategory = subcategories.find(subcategory => subcategory.subcategory_id == id)

  res.send( subcategory )
}

export {
  catController,
  GETBYIDCAT,
  subcatController,
  GETBYIDSUBCAT
};