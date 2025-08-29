
function alternateCapsReverse(str) {
  let reversed = str.split('').reverse().join('');
  let result = '';
  for (let i = 0; i < reversed.length; i++) {
    result += i % 2 === 0
      ? reversed[i].toUpperCase()
      : reversed[i].toLowerCase();
  }
  return result;
}

module.exports = { alternateCapsReverse };
