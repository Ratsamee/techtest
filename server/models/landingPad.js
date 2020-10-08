const dbPool = require('../db');
const axios = require('axios');

class LandingPad {
  async getLandingDataByAPI(landingPadId) {
    let result = null;
    // get landing pad data from api
    const response = await axios.get(`https://api.spacexdata.com/v3/landpads/${landingPadId}`).catch(() => {
      return null
    });

    if (response && response.data) {
      const data = response.data;
      result = {
        id: data.id,
        full_name: data.full_name,
        status: data.status,
        location: data.location
      }
    }
    return result;
  }

  async getLandingPadByDatabase(landingPadId) {
    let result = null;

    // get landing pad data from db
    const rows = await dbPool.query('SELECT * FROM spaceData where id = ?', landingPadId);
    if (rows && rows.length !== 0) {
      const data = JSON.parse(JSON.stringify(rows))[0];
      result = JSON.parse(data.spaceItem);
    }
    return result;
  }

  async insertLandingPad(landingPadData) {
    if (landingPadData) {
      await dbPool.query('INSERT INTO spaceData(id, spaceitem) values(?,?)', [landingPadData.id, JSON.stringify(landingPadData)]);
    }
  }

  async getLandingPadById(landingPadId) {
    let landingPad = await this.getLandingPadByDatabase(landingPadId);
    if (!landingPad) {
      landingPad = await this.getLandingDataByAPI(landingPadId);
      await this.insertLandingPad(landingPad)
    }

    return landingPad;
  }
  
}

module.exports.LandingPad = LandingPad;