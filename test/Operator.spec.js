/* eslint-env mocha */
const expect = require('chai').expect;
const operator = require('../components/Operator');

describe('Convert to number Test', () => {
  it('convert "0" to 0', () => {
    expect(operator.number('0')).to.equal(0);
  });
  it('convert "1" to 1', () => {
    expect(operator.number('1')).to.equal(1);
  });
  it('convert "Test" to 0', () => {
    expect(operator.number('Test')).to.equal(0);
  });
  it('convert "" to 0', () => {
    expect(operator.number('')).to.equal(0);
  });
});

describe('Convert to Boolen', () => {
  it('convert "0" to false', () => {
    expect(operator.boolean('0')).to.false;
  });
  it('convert "1" to true', () => {
    expect(operator.boolean('1')).to.true;
  });
  it('convert null to false', () => {
    expect(operator.boolean(null)).to.false;
  });
  it('convert "" to false', () => {
    expect(operator.boolean('')).to.false;
  });
});

describe('Industrial Change Test', () => {
  it('Should return 4 when input 124', () => {
    expect(operator.industrialChange('124')).to.equal(4);
  });
  it('Should return 98 when input 112', () => {
    expect(operator.industrialChange('112')).to.equal(98);
  });
  it('Should return 1 when input 1', () => {
    expect(operator.industrialChange('1')).to.equal(1);
  });
  it('Should return empty string when input test string', () => {
    expect(operator.industrialChange('test')).to.equal('');
  });
  it('Should return empty string when input empty string', () => {
    expect(operator.industrialChange('')).to.equal('');
  });
});

describe('Subjobtype Change Test', () => {
  it('Should return 32 when input 160', () => {
    expect(operator.subjobtypeChange('160')).to.equal(32);
  });
  it('Should return 112 when input 112', () => {
    expect(operator.subjobtypeChange('112')).to.equal(112);
  });
  it('Should return empty string when input test string', () => {
    expect(operator.subjobtypeChange('test')).to.equal('');
  });
  it('Should return empty string when input empty string', () => {
    expect(operator.subjobtypeChange('')).to.equal('');
  });
});

describe('Marquee Urgent Change Test', () => {
  it('Should return 0 when input 3', () => {
    expect(operator.marqueeUrgentChange(3)).to.equal(0);
  });

  it('Should return 1 when input 1', () => {
    expect(operator.marqueeUrgentChange(1)).to.equal(1);
  });
});

describe('Change to Empty Test', () => {
  it('Should return empty when input XXXX', () => {
    expect(operator.changeToEmpty('XXXX')).to.empty;
  });
  it('Should return empty when input XXXXXX', () => {
    expect(operator.changeToEmpty('XXXXXX')).to.empty;
  });
  it('Should return Test when input Test', () => {
    expect(operator.changeToEmpty('Test')).to.equal('Test');
  });
});
