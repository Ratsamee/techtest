const { expectCt } = require('helmet');
const { Capsule } = require('../models/capsule');

describe('test get all capsule', () => {
  it('test capsule', async () => {
    const capsule = new Capsule();
    const result = capsule.getCapsuleList('capsule_serial', true, 10, null);
    expect(result.length).toEqual(10);
  })
})