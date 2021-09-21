const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
Category.findAll()
  .then(categoryData => {
    if(!categoryData) {
      res.status(404).json({message: "No Categories Found"});
      return;
    }
    res.json(categoryData)
  }).catch(err => {
    console.log(err);
    res.status(500).json(err)
  })
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      attribute: ['id','product','price','stock','category_id']
    }
  })
  .then(categoryData => {
    if(!categoryData) {
      res.status(404).json({message: "No Categories Found"});
      return;
    }
    res.json(categoryData)
  }).catch(err => {
    console.log(err);
    res.status(500).json(err)
  })
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
