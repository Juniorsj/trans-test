module.exports = mapKey => (message) => {
  if (!message && typeof message !== 'object') return {};

  const data = {};
  for (const key in mapKey) {
    const value = mapKey[key];
    if (value instanceof Array && value.length) {
      const str = [];
      let hasAtt = false;
      value.forEach((element) => {
        if (message[element]) {
          hasAtt = true;
          str.push(message[element]);
        }
      });
      if (hasAtt) data[key] = `<li>${str.join('<li>')}`;
    } else if (typeof value === 'object' && Object.prototype.hasOwnProperty.call(message, value.field)) {
      data[key] = mapKey[key].run(message[value.field]);
    } else if (Object.prototype.hasOwnProperty.call(message, value)) {
      data[key] = message[value];
    }
  }

  return data;
};
