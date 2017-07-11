const operator = require('../components/Operator');

module.exports = {
  _id: 'runningnumber',
  name: 'companyname',
  business: {
    field: 'business',
    run: operator.number,
  },
  tel: 'tel',
  benefit: 'benefit',
  detail: 'detail',
  contactName: 'contactname',
  address: 'address',
  provinceCode: 'provincecode',
  districtCode: {
    field: 'amphoecode',
    run: operator.changeToEmpty,
  },
  subdistrictCode: {
    field: 'tamboncode',
    run: operator.changeToEmpty,
  },
  englishApply: {
    field: 'englishapply',
    run: operator.boolean,
  },
  longitude: 'coord_x',
  latitude: 'coord_y',
  industrial: 'industrialestate',
  travelToCompany: 'traveltothiscompany',
  logo: 'logonamenew',
  map: 'mapnamenew',
  lastUpdate: 'lastupdate',
  lastUpdateEx: 'lastupdateex',
  userId: 'user_id',
  applyMethod: 'applymethod',
};
