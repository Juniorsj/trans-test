/* eslint-env mocha */
const expect = require('chai').expect;
const Transform = require('../index');

const data = {
  runningnumber: 177736,
  companyname: 'THiNKNET Co., Ltd. (test2)',
  companynamesort: 'THiNKNET Co., Ltd. (test2)',
  address: '323 อาคารยูไนเต็ดเซ็นเตอร์ สีลม',
  tel: '02-353-6999',
  website: '',
  active: '1',
  postalcode: '',
  contactname: 'aaaaaab',
  jobsspace: '5',
  createdate: '2015-12-04 00:00:00',
  lastupdate: '2017-03-17 13:30:11',
  lastupdateex: '2017-06-24 13:14:00',
  pass: '1',
  business: '5',
  pay: 'Yes',
  englishapply: '0',
  detail: 'fcxzvcxvcxzdffs&lt;br&gt;&lt;br&gt;&lt;center&gt;&lt;img src=/img/logopicmap/pic/177736_pic_1.jpeg alt=&quot;THiNKNET Co., Ltd.&quot; title=&quot;THiNKNET Co., Ltd.&quot;&gt;&lt;/center&gt;',
  benefit: '',
  applymethod: '',
  applicationtemplate: '1',
  countrycode: 'TH',
  provincecode: '01',
  amphoecode: '0125',
  tamboncode: '012504',
  coord_x: '100.53141200',
  coord_y: '13.72706400',
  isinindustrialestate: 'N',
  industrialestate: '',
  traveltothiscompany: '',
  applicationtheme: '0',
  logonamenew: '177736_logo_25.png',
  mapnamenew: '',
  lastlogindate: '2016-10-31 11:10:53',
  user_id: '79719',
};

const expectResult = {
  _id: data.runningnumber,
  name: data.companyname,
  tel: data.tel,
  business: Number(data.business),
  benefit: data.benefit,
  detail: data.detail,
  contactName: data.contactname,
  address: data.address,
  provinceCode: data.provincecode,
  districtCode: data.amphoecode,
  subdistrictCode: data.tamboncode,
  longitude: data.coord_x,
  latitude: data.coord_y,
  industrial: data.industrialestate,
  travelToCompany: data.traveltothiscompany,
  logo: data.logonamenew,
  map: data.mapnamenew,
  englishApply: data.englishapply !== '0',
  applyMethod: data.applymethod,
  lastUpdate: data.lastupdate,
  lastUpdateEx: data.lastupdateex,
  userId: data.user_id,
};

describe('Transform Company Data and Validate Test', () => {
  it('transform all necessary field', () => {
    const transform = new Transform('company', data);
    expect(transform.get()).to.eql(expectResult);
    expect(transform.validate()).to.true;
    expect(transform.errors()).to.empty;
  });

  it('not unnecessary input field then transform and return all necessary field', () => {
    const input = JSON.parse(JSON.stringify(data));
    delete input.applicationtemplate;
    delete input.lastlogindate;
    const transform = new Transform('company', input);
    expect(transform.get()).to.eql(expectResult);
    expect(transform.validate()).to.true;
    expect(transform.errors()).to.empty;
  });

  it('not input logonamenew and result dont have logo field', () => {
    const input = JSON.parse(JSON.stringify(data));
    delete input.logonamenew;
    const result = JSON.parse(JSON.stringify(expectResult));
    delete result.logo;
    const transform = new Transform('company', input);
    expect(transform.get()).to.eql(result);
    expect(transform.validate()).to.true;
    expect(transform.errors()).to.empty;
  });

  it('Transform success but valid failed because some field is require', () => {
    const input = JSON.parse(JSON.stringify(data));
    delete input.runningnumber;
    const result = JSON.parse(JSON.stringify(expectResult));
    delete result._id;
    const transform = new Transform('company', input);
    expect(transform.get()).to.eql(result);
    expect(transform.validate()).to.false;
    expect(transform.errors()._id).to.not.empty;
  });

  it('Transform success but valid failed because type is wrong', () => {
    const input = {
      runningnumber: 'test',
      companyname: true,
      companynamesort: 1,
      address: 1,
      tel: true,
      website: '',
      active: '1',
      postalcode: '',
      contactname: true,
      jobsspace: '5',
      createdate: '2015-12-04 00:00:00',
      lastupdate: 'test',
      lastupdateex: 'test',
      pass: '1',
      business: 'test',
      pay: 'Yes',
      englishapply: 'test',
      detail: true,
      benefit: true,
      applymethod: true,
      applicationtemplate: '1',
      countrycode: 'TH',
      provincecode: '011',
      amphoecode: '01251',
      tamboncode: '0125041',
      coord_x: 'test',
      coord_y: 'test',
      isinindustrialestate: 'N',
      industrialestate: true,
      traveltothiscompany: true,
      applicationtheme: '0',
      logonamenew: true,
      mapnamenew: true,
      lastlogindate: '2016-10-31 11:10:53',
      user_id: 'test',
    };

    const result = {
      _id: input.runningnumber,
      name: input.companyname,
      tel: input.tel,
      business: Number(input.business) || 0,
      benefit: input.benefit,
      detail: input.detail,
      contactName: input.contactname,
      address: input.address,
      provinceCode: input.provincecode,
      districtCode: input.amphoecode,
      subdistrictCode: input.tamboncode,
      longitude: input.coord_x,
      latitude: input.coord_y,
      industrial: input.industrialestate,
      travelToCompany: input.traveltothiscompany,
      logo: input.logonamenew,
      map: input.mapnamenew,
      englishApply: (Number(input.englishapply) || 0) !== 0,
      applyMethod: input.applymethod,
      lastUpdate: input.lastupdate,
      lastUpdateEx: input.lastupdateex,
      userId: input.user_id,
    };
    const invalidKey = Object.keys(result);

    // business and englishApply field are auto convert to boolean, They never be invalid.
    invalidKey.splice(invalidKey.indexOf('business'), 1);
    invalidKey.splice(invalidKey.indexOf('englishApply'), 1);
    const transform = new Transform('company', input);
    expect(transform.get()).to.eql(result);
    expect(transform.validate()).to.false;
    expect(transform.errors()).to.have.all.keys(invalidKey);
  });
});
