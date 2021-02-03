function nullCheck(obj, listOfParams) {
  for (var param of listOfParams) {
    if (obj[param] == undefined) return false;
  }
  return true;
}

module.exports = nullCheck;
