const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
try {
  const categoryData = await Category.findAll({
    include: [{ model: Product}],
  });
  res.status(200).json(categoryData);
} catch (err) {
  res.status(500).json(err)
}
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
try {
  const categoryData = await Category.findOne(req.params.id,{
    include: [{model: Product}]
  });
  if(!libraryCardData) {
    res.status(400).json({message:"No library card found with that id!"});
    return;
  }
  res.status(200).json(categoryData)
} catch(err){
  res.status(500).json(err)
};
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  try{
    const categoryData = await Category.create(req.body)
    res.status(200).json(categoryData);
  } catch (err){
    res.status(400).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
    const categoryData = await Category.update(req.body,{
      where: {
        id: req.params.id,
      }
    });
    if(!categoryData[0]) {
      res.status(404).json({message: 'No Category with this Id'})
      return;
    }
    res.status(200).json(categoryData);
  }catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.delete(req.body, {
      where:{
        id: req.params.id,
      }
    });
    if(!categoryData){
      res.status(404).json({message:"No Category with this Id"})
    return;
    }
    res.status(200).json(categoryData,{message:'Works'})
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
