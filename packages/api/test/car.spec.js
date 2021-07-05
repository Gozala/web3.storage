import assert from 'assert'

import { createCar } from './scripts/car.js'

const endpoint = 'http://testing.web3.storage'

describe('/car', () => {
  it('should add posted CARs to Cluster', async () => {
    // TODO: token
    // const { token, issuer } = await createTestUser()

    // Create Car
    const { root, car } = await createCar('hello world!')

    // expected CID for the above data
    const cid = 'bafkreidvbhs33ighmljlvr7zbv2ywwzcmp5adtf4kqvlly67cy56bdtmve'
    assert.strictEqual(root.toString(), cid, 'car file has correct root')

    const res = await fetch(new URL('car', endpoint).toString(), {
      method: 'POST',
      headers: {
        // Authorization: `Bearer ${token}`,
        'Content-Type': 'application/car'
      },
      body: car,
    })

    assert(res, 'Server responded')
    assert(res.ok, 'Server response ok')
    const { ok, value } = await res.json()
    assert(ok, 'Server response payload has `ok` property')
    assert.strictEqual(value.cid, cid, 'Server responded with expected CID')

    // TODO: Assert metadata
  })

  it('should error when not receiving a car content type', async () => {
    // Create Car
    const { car } = await createCar('hello world!')

    const res = await fetch(new URL('car', endpoint).toString(), {
      method: 'POST',
      headers: {
        // Authorization: `Bearer ${token}`
        'Content-Type': 'application/json'
      },
      body: car,
    })

    assert(res, 'Server responded')
    assert(res.status, 400)
  })
})
