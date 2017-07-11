exports.number = input => Number(input) || 0;

exports.boolean = input => this.number(input) !== 0;

exports.industrialChange = (code) => {
  const industrialMap = {
    124: 4,
    112: 98,
  };
  const input = this.number(code);
  if (industrialMap[input]) return industrialMap[input];
  return input || '';  // if code is text will return ''
};

exports.subjobtypeChange = (code) => {
  const subjobtypeMap = {
    160: 32,
  };
  const input = this.number(code);
  if (subjobtypeMap[input]) return subjobtypeMap[input];
  return input || '';
};

exports.marqueeUrgentChange = (code) => {
  if (this.number(code) === 3) return 0;
  return this.number(code);
};

exports.changeToEmpty = (value) => {
  const valueToEmpty = ['XXXX', 'XXXXXX'];
  if (valueToEmpty.includes(value)) return '';
  return value;
};
