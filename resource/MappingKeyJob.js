const operator = require('../components/Operator');

module.exports = {
  _id: 'runningnumber',
  companyId: 'companycode',
  title: 'jobtitle',
  jobType: 'jobtype',
  subJobType: {
    field: 'subjobtype',
    run: operator.subjobtypeChange,
  },
  contactAddress: 'contactaddress',
  contactName: 'contactname',
  contactTel: 'contacttel',
  provinceCode: 'provincecode',
  districtCode: {
    field: 'amphoecode',
    run: operator.changeToEmpty,
  },
  subdistrictCode: {
    field: 'tamboncode',
    run: operator.changeToEmpty,
  },
  numberOfPosition: 'numberofposition',
  salary: 'salary',
  disabledPerson: {
    field: 'isfordisabled',
    run: operator.number,
  },
  marqueeUrgent: {
    field: 'marqueeurgent',
    run: operator.marqueeUrgentChange,
  },
  description: 'jobdescription',
  onlineStatus: 'onlinestatus',
  email: 'email',
  proxyEmail: 'proxyemail',
  isProxyEmailDisabled: 'isproxyemaildisabled',
  longitude: 'coord_x',
  latitude: 'coord_y',
  workLocation: 'worklocation',
  properties: ['attr1', 'attr2', 'attr3', 'attr4', 'attr5', 'attr6', 'attr7', 'attr8', 'attr9', 'attr10'],
  industrial: {
    field: 'industrialestate',
    run: operator.industrialChange,
  },
  lastupdate: 'date',
};
