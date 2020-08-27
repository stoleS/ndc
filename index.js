const medicines = require('./ndc-map.json')
const axios = require('axios')

const token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiY3ZldGFsZWtzYW5kcmFzYW5pQGdtYWlsLmNvbSIsImlzYWRtaW4iOnRydWV9.qRdoppW0VRboj4rhPpdfjlosJ16goog_cBvspHfrHvU'

const url = 'https://oss-development.cloud:2010/fp/lekovi'

const tokenMediaHeader = {
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
}

let successfull = 0
let failed = 0

sendMedicines().then(() =>
  console.log(`SUCCESSFULL ~> ${successfull} ::: FAILED ~> ${failed}`)
)

async function sendMedicines () {
  for (const medicine of medicines) {
    try {
      await axios(buildReqConfig(medicine))
      console.log(
        `[${successfull + 1}/${
          medicines.length
        }] Successfully sent medicine with barcode ~> ${medicine.BARCODE}`
      )
      successfull++
    } catch (error) {
      console.log(
        `[${failed + 1}/${
          medicines.length
        }] Failed to send medicine with barcode ~> ${medicine.BARCODE}`
      )
      failed++
    }
  }
}

function buildReqConfig (medicine) {
  return {
    method: 'post',
    url,
    headers: tokenMediaHeader.headers,
    data: JSON.stringify(medicine)
  }
}
