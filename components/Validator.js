const Validator = require('validatorjs');

const emailValidate = email => email.match(/^[A-Z0-9._+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);

const emailDomainValidate = (email) => {
  const disallowableDomain = ['example.com', 'jobthai.com'];
  const value = email.split('@');
  const lastItem = value[value.length - 1];
  return !disallowableDomain.includes(lastItem);
};

Validator.register('emailjobthai', (value, requirement, attribute) => { // requirement parameter defaults to null
  let newValue = value;
  let valid = true;
  if (!(newValue instanceof Array)) newValue = value.split(',');
  newValue.forEach((element) => {
    const email = element.trim();
    if (!(emailValidate(email) && emailDomainValidate(email))) {
      valid = false;
    }
  });
  return valid;
}, 'The :attribute format is invalid or domain is @jobthai.com, @example.com');

Validator.register('nothtml', (value, requirement, attribute) => !(value.match(/(<([^>]+)>)/ig) && value.match(/<|>/ig)),
'The :attribute must not contrain html tag');

function leapYear(year) {
  return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
}

Validator.register('datetime', (inDate, requirement, attribute) => {
  const valid = true;
    // reformat if supplied as mm.dd.yyyy (period delimiter)
  if (typeof inDate === 'string') {
    const pos = inDate.indexOf('.');
    if ((pos > 0 && pos <= 6)) {
      inDate = inDate.replace(/\./g, '-');
    }
  }

  const testDate = new Date(inDate);
  const yr = testDate.getFullYear();
  const mo = testDate.getMonth();
  const day = testDate.getDate();

  const daysInMonth = [31, (leapYear(yr) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (yr < 1000) { return false; }
  if (isNaN(mo)) { return false; }
  if (mo + 1 > 12) { return false; }
  if (isNaN(day)) { return false; }
  if (day > daysInMonth[mo]) { return false; }

  return valid;
});

module.exports = Validator;
