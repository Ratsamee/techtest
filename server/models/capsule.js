const axios = require('axios');

class Capsule {
  async getCapsuleList(sort, isAsc, limit, skip) {
    const order = isAsc ? 'asc': 'desc';
    const sortBy = sort ? sort : 'capsule_serial';
    const url = `https://api.spacexdata.com/v3/capsules?sort=${sortBy}&order=${order}&limit=${limit}&offset=${skip}`;
    let result = null;
    const response = await axios.get(url).catch(() => { return null });
    if (response && response.data.length !== 0) {
      result = JSON.parse(JSON.stringify(response.data));
    }
    return result;
  }
}

module.exports.Capsule = Capsule;