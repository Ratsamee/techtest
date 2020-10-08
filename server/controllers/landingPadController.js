const { LandingPad } = require('../models/landingPad');

exports.getLandingPageById = async (req, res) => {
  try {
    const landingPadId = req.params.id;
    const landingPad = new LandingPad();
    const result = await landingPad.getLandingPadById(landingPadId);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(400).json(`There is no the landing pad data for id ${landingPadId}`);
    }
  } catch (error) {
    console.log(`error: ${erorr}`);
    res.status(500).json('something went wrong');
  }
}