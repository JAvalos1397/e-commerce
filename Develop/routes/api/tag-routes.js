const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!tagData) {
      res.status(404).json({ message: 'No Tag found with that id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(tagData => res.json(tagData))
  .catch(err => {
    res.status(500).json(err)
  })
});

router.put('/:id', async (req, res) => {
  // update a tag by its `id` value
  try{
    const tagData = await Tag.update(req.body,{
      where: {
        id: req.params.id,
      }
    });
    if(!tagData[0]) {
      res.status(404).json({message: 'No tag with this Id'})
      return;
    }
    res.status(200).json(tagData);
  }catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
    .then(tagData =>{
      if(!tagData){
        res.status(404).json({message:"No tag found with this id"})
      }
    }).catch (err =>{
      res.status(500).json(err)
    })
  })
});

module.exports = router;
