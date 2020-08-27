const ndc = require('./ndc.json')
const fs = require('fs')

const spread = []

ndc.results.forEach((medicine, i) => {
  const packaged = [...getPackaged(medicine)]
  const mapped = [...dbMap(packaged)]
  spread.push(...mapped)
})

let data = JSON.stringify(spread)

fs.writeFileSync('ndc-map.json', data)

function getPackaged (medicine) {
  const medicinePackage = medicine
  const packaged = []
  if (medicine.packaging) {
    medicine.packaging.forEach(package => {
      medicinePackage.packaging = package
      packaged.push({ ...medicinePackage })
    })
  } else {
    packaged.push(medicinePackage)
  }
  return packaged
}

function dbMap (packaged) {
  const packageMap = []
  packaged.forEach(package =>
    packageMap.push({
      BARCODE: package.packaging?.package_ndc || "",
      NAZIV: package.brand_name || "",
      KOLICINA_KUTIJA: null,
      JED_MER: null,
      INN: package.generic_name || "",
      RXCUI: package.openfda?.rxcui?.join(','),
      PROIZVODJAC: package.labeler_name || "",
      NOSILAC_DOZVOLE: package.labeler_name || "",
      VRSTA_LEKA: null,
      SIFRA_PROIZVODJACA: null,
      SIFRA_NOSIOCA_DOZVOLE: null,
      OBLIK_DOZA: package.dosage_form || "",
      INDIKATOR_VRSTE: 'H',
      PAKOVANJE: package.packaging?.description || ""
    })
  )
  return packageMap
}
