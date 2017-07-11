/* eslint-env mocha */
const expect = require('chai').expect;
const Transform = require('../index');

const data = {
  runningnumber: 607187,
  salary: '15,000 - 21,000',
  companycode: '24020',
  date: '2014-09-16 14:00:05',
  lastupdateex: '2014-09-16 17:24:18',
  numberofposition: '2 ',
  jobtype: 'Computer',
  province: '0',
  active: '1',
  pass: '1',
  jobtitle: 'Web Programer',
  jobdescription: 'สามารถเขียนโปรแกรมด้วย Asp.net,php โดยใช้ฐานข้อมูลได้',
  worklocation: '',
  attr1: 'testAtt1',
  attr2: 'testAtt2',
  attr3: 'testAtt3',
  attr4: 'testAtt4',
  attr5: 'testAtt5',
  attr6: 'testAtt6',
  attr7: 'testAtt7',
  attr8: 'testAtt8',
  attr9: 'testAtt9',
  attr10: 'testAtt10',
  subjobtype: '160',
  email: 'test@gmail.com',
  countrycode: '',
  provincecode: '01',
  amphoecode: '0122',
  tamboncode: '012201',
  jobstitlecode: '2230222',
  contactname: 'test contact name',
  contacttel: 'test contact tel',
  contactaddress: 'test contact address',
  coord_x: '0.00000000',
  coord_y: '0.00000000',
  productordercode: '0',
  onlinestatus: '0',
  proxyemail: 'dtc14_43@trustmail.jobthai.com',
  isproxyemaildisabled: '0',
  isfordisabled: '0',
  isinindustrialestate: 'N',
  industrialestate: '32',
  gender: '0',
  age: '0',
  industrialprovince: '',
  jobtypecode: '46',
  addresscode: '012201',
  address_type: 'Tambon',
  marqueeurgent: '0',
  jobtitlestatus: '1',
};

const expectResult = {
  _id: data.runningnumber,
  companyId: data.companycode,
  title: data.jobtitle,
  jobType: data.jobtype,     // อาจจะมีการเปลี่ยน code
  subJobType: 32,   // อาจจะมีการเปลี่ยน code
  contactAddress: data.contactaddress,
  contactName: data.contactname,
  contactTel: data.contacttel,
  provinceCode: data.provincecode,
  districtCode: data.amphoecode,
  subdistrictCode: data.tamboncode,
  numberOfPosition: data.numberofposition,
  salary: data.salary,
  disabledPerson: Number(data.isfordisabled),
  marqueeUrgent: Number(data.marqueeurgent),
  description: data.jobdescription,
  onlineStatus: data.onlinestatus,
  email: data.email,
  proxyEmail: data.proxyemail,
  isProxyEmailDisabled: data.isproxyemaildisabled,
  longitude: data.coord_x,
  latitude: data.coord_y,
  workLocation: data.worklocation,
  properties: `<li>${data.attr1}<li>${data.attr2}<li>${data.attr3}<li>${data.attr4}<li>${data.attr5}<li>${data.attr6}<li>${data.attr7}<li>${data.attr8}<li>${data.attr9}<li>${data.attr10}`,
  industrial: Number(data.industrialestate),
  lastupdate: data.date,
};

describe('Transform Job Data and data is valid Test', () => {
  it('transform all necessary field', () => {
    const transform = new Transform('job', data);
    expect(transform.get()).to.eql(expectResult);
    expect(transform.validate()).to.true;
    expect(transform.errors()).to.empty;
  });

  it('not unnecessary input field then transform and return all necessary field', () => {
    const input = JSON.parse(JSON.stringify(data));
    delete input.countrycode;
    delete input.jobtitlestatus;
    const transform = new Transform('job', input);
    expect(transform.get()).to.eql(expectResult);
    expect(transform.validate()).to.true;
    expect(transform.errors()).to.empty;
  });

  it('not input logonamenew and result dont have logo field', () => {
    const input = JSON.parse(JSON.stringify(data));
    delete input.salary;
    const result = JSON.parse(JSON.stringify(expectResult));
    delete result.salary;
    const transform = new Transform('job', input);
    expect(transform.get()).to.eql(result);
    expect(transform.validate()).to.true;
    expect(transform.errors()).to.empty;
  });

  it('Transform success but valid failed because some field is require', () => {
    const input = JSON.parse(JSON.stringify(data));
    delete input.runningnumber;
    const result = JSON.parse(JSON.stringify(expectResult));
    delete result._id;
    const transform = new Transform('job', input);
    expect(transform.get()).to.eql(result);
    expect(transform.validate()).to.false;
    expect(transform.errors()._id).to.not.empty;
  });

  it('Transform success but valid failed because type is wrong', () => {
    const input = {
      runningnumber: 'test',
      salary: true,
      companycode: 'test',
      date: 'test',
      lastupdateex: 'test',
      numberofposition: true,
      jobtype: true,
      active: '1',
      pass: '1',
      jobtitle: '<li>test',
      jobdescription: true,
      worklocation: true,
      attr1: true,
      attr2: true,
      attr3: true,
      attr4: true,
      attr5: true,
      attr6: true,
      attr7: true,
      attr8: true,
      attr9: true,
      attr10: true,
      subjobtype: 'test',
      email: 'test@gmail',
      provincecode: '011',
      amphoecode: '01221',
      tamboncode: '0122011',
      contactname: true,
      contacttel: true,
      contactaddress: true,
      coord_x: true,
      coord_y: true,
      onlinestatus: 2,
      proxyemail: 1,
      isproxyemaildisabled: 3,
      isfordisabled: 3,
      isinindustrialestate: 'N',
      industrialestate: 'test',
      marqueeurgent: 4,
      jobtitlestatus: '1',
    };

    const result = {
      _id: input.runningnumber,
      companyId: input.companycode,
      title: input.jobtitle,
      jobType: input.jobtype,     // อาจจะมีการเปลี่ยน code
      subJobType: '',   // อาจจะมีการเปลี่ยน code
      contactAddress: input.contactaddress,
      contactName: input.contactname,
      contactTel: input.contacttel,
      provinceCode: input.provincecode,
      districtCode: input.amphoecode,
      subdistrictCode: input.tamboncode,
      numberOfPosition: input.numberofposition,
      salary: input.salary,
      disabledPerson: input.isfordisabled,
      marqueeUrgent: input.marqueeurgent,
      description: input.jobdescription,
      onlineStatus: input.onlinestatus,
      email: input.email,
      proxyEmail: input.proxyemail,
      isProxyEmailDisabled: input.isproxyemaildisabled,
      longitude: input.coord_x,
      latitude: input.coord_y,
      workLocation: input.worklocation,
      properties: `<li>${input.attr1}<li>${input.attr2}<li>${input.attr3}<li>${input.attr4}<li>${input.attr5}<li>${input.attr6}<li>${input.attr7}<li>${input.attr8}<li>${input.attr9}<li>${input.attr10}`,
      industrial: '',
      lastupdate: input.date,
    };

    const invalidKeys = Object.keys(result);
    //  field are auto convert, They never be invalid.
    invalidKeys.splice(invalidKeys.indexOf('industrial'), 1);
    invalidKeys.splice(invalidKeys.indexOf('properties'), 1);
    invalidKeys.splice(invalidKeys.indexOf('subJobType'), 1);

    const transform = new Transform('job', input);
    expect(transform.get()).to.eql(result);
    expect(transform.validate()).to.false;
    expect(transform.errors()).to.have.all.keys(invalidKeys);
  });
});
