const Validator = require('../components/Validator');

const mappingKeyCompany = require('../resource/MappingKeyCompany');
const mappingKeyJob = require('../resource/MappingKeyJob');
const companyRules = require('../resource/CompanyRules');
const jobRules = require('../resource/JobRules');

const transformCompany = require('../src/Transform')(mappingKeyCompany);
const transformJob = require('../src/Transform')(mappingKeyJob);

function Transform(type, input) {
  const allowType = ['company', 'job'];
  if (!type || !allowType.includes(type)) throw new Error('Please input type eg. company, job');
  if (!input && typeof input !== 'object') throw new Error('Please input data to transform');
  this.type = type;
  this.input = input;
  const mapFunction = {
    company: {
      transform: transformCompany,
      rules: companyRules.transform,
    },
    job: {
      transform: transformJob,
      rules: jobRules.transform,
    },
  };
  this.result = mapFunction[type].transform(input);
  this.get = () => this.result;
  this.validate = () => {
    this.validation = new Validator(this.result, mapFunction[type].rules);
    return this.validation.passes();
  };
  this.errors = () => this.validation.errors.all();
}

module.exports = Transform;
