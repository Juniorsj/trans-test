/* eslint-env mocha */
const expect = require('chai').expect;
const rewire = require('rewire');

const Validator = rewire('../components/Validator');

describe('Validator Test', () => {
  describe('Jobthai Email Validator Test', () => {
    const fieldname = 'email';
    const data = {
      valid: 'test@gmail.com',
      multivalid: 'test@gmail.com,test2@gmail.com',
      invalid: 'test',
      multiInvalid: 'test@gmail.com,test',
      invalidjobthaidomain: 'test@jobthai.com',
      invalidexampledomain: 'test@example.com',
    };

    const rules = { [fieldname]: 'emailjobthai' };

    const msg = `The ${fieldname} format is invalid or domain is @jobthai.com, @example.com`;
    it('Email is valid', () => {
      const validator = new Validator({ [fieldname]: data.valid }, rules);
      expect(validator.passes()).to.true;
      expect(validator.errors.all()).to.empty;
    });

    it('Multi Email are valid', () => {
      const validator = new Validator({ [fieldname]: data.multivalid }, rules);
      expect(validator.passes()).to.true;
      expect(validator.errors.all()).to.empty;
    });

    it('Email is invalid because its not email format', () => {
      const validator = new Validator({ [fieldname]: data.invalid }, rules);
      expect(validator.passes()).to.false;
      expect(validator.errors.all()).to.not.empty;
      expect(validator.errors.first(fieldname)).to.equal(msg);
    });

    it('Some Email is invalid because its not email format', () => {
      const validator = new Validator({ [fieldname]: data.multiInvalid }, rules);
      expect(validator.passes()).to.false;
      expect(validator.errors.all()).to.not.empty;
      expect(validator.errors.first(fieldname)).to.equal(msg);
    });

    it ('Email is invalid because jobthai domain', () => {
      const validator = new Validator({ [fieldname]: data.invalidjobthaidomain }, rules);
      expect(validator.passes()).to.false;
      expect(validator.errors.all()).to.not.empty;
      expect(validator.errors.first(fieldname)).to.equal(msg);
    });

    it('Email is invalid because example domain', () => {
      const validator = new Validator({ [fieldname]: data.invalidexampledomain }, rules);
      expect(validator.passes()).to.false;
      expect(validator.errors.all()).to.not.empty;
      expect(validator.errors.first(fieldname)).to.equal(msg);
    });
  });

  describe('Html tag Validator Test', () => {
    const fieldname = 'title';
    const data = {
      valid: 'Test',
      invalid: '<br>Test</br>',
    };
    const rules = {
      [fieldname]: 'nothtml',
    };
    const msg = `The ${fieldname} must not contrain html tag`;
    it('Data is valid', () => {
      const validator = new Validator({ [fieldname]: data.valid }, rules);
      expect(validator.passes()).to.true;
      expect(validator.errors.all()).to.empty;
    });

    it('Data is invalid', () => {
      const validator = new Validator({ [fieldname]: data.invalid }, rules);
      expect(validator.passes()).to.false;
      expect(validator.errors.all()).to.not.empty;
      expect(validator.errors.first(fieldname)).to.equal(msg);
    });
  });

  describe('Email Validate Test', () => {
    const data = {
      valid: 'Test@gmail.com',
      invalid: 'test',
    };
    const validate = Validator.__get__('emailValidate');
    it('Valid email', () => {
      expect(validate(data.valid)).to.not.null;
    });

    it('Invalid email', () => {
      expect(validate(data.invalid)).to.null;
    });
  });

  describe('Email Domain Validate Test', () => {
    const data = {
      valid: 'test@gmail.com',
      jobthaiDomain: 'test@jobthai.com',
      exampleDomain: 'test@example.com',
    };
    const validate = Validator.__get__('emailDomainValidate');
    it('Email Domain is valid', () => {
      expect(validate(data.valid)).to.true;
    });
    it('Jobthai Domain is invalid', () => {
      expect(validate(data.jobthaiDomain)).to.false;
    });
    it('Example Domain is invalie', () => {
      expect(validate(data.exampleDomain)).to.false;
    });
  });
});
