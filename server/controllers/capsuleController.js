const { Capsule } = require('../models/capsule');

exports.capsule_list = async (req, res) => {
  try {
    
    const sort = req.query.sort;
    let order = req.query.order;
    if (!order || order.trim().length === 0) {
      order = 'asc';
    }    
    const limit = req.query.limit;
    const skip = req.query.skip;
    const isAsc = (order ?? 'asc') === 'asc';
    const capsule = new Capsule();
    const result = await capsule.getCapsuleList(sort, isAsc, limit, skip);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(400).json(`There is no the capsule data`);
    }
    
  } catch (error) {
    console.log(`error: ${error}`);
    res.status(500).json('something went wrong');
  }
}