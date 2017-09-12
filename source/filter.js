'use strict';

const filter = function(str) {
  var dictTags = new Map([
    ['script', ''],
    ['/script', ''],
    ['a', ''],
    ['/a', ''],
    ['img', ''],
    ['/img', '']
  ]);
  var result = "";
  var indexLastWrite = null;
  var gtValid = false;
  Array.prototype.map.call(str, function(x, i) {
    switch (x) {
      case '<':
        result += str.substring((indexLastWrite == null) ? 0 : indexLastWrite, i);
        indexLastWrite = i + 1;

        var leftI = i + 1;
        var tag = null;
        for (; leftI < str.length && str[leftI] != '<' && str[leftI] != '>'; leftI++) {
          if (tag == null && str[leftI] == ' ')
            tag = str.substring(i + 1, leftI);
        }
        tag = (tag == null) ? str.substring(i + 1, leftI) : tag;

        if (leftI == str.length || str[leftI] == '<' || dictTags.has(tag)) {
          result += '&lt;';
        } else {
          result += '<';
          gtValid = true;
        }
        break;

      case '>':
        if (gtValid) {
          result += str.substring(indexLastWrite, i + 1);
        } else {
          result += str.substring((indexLastWrite == null) ? 0 : indexLastWrite, i) + '&gt;';
        }
        indexLastWrite = i + 1;
        break;

      case '&':
        result += str.substring((indexLastWrite == null) ? 0 : indexLastWrite, i + 1) + 'amp;';
        indexLastWrite = i + 1;
        break;

      case '\'':
        result += str.substring((indexLastWrite == null) ? 0 : indexLastWrite, i) + '&#39;';
        indexLastWrite = i + 1;
        break;

      case '"':
        result += str.substring((indexLastWrite == null) ? 0 : indexLastWrite, i) + '&quot;';
        indexLastWrite = i + 1;
        break;
    }
  });
  result += str.substring((indexLastWrite == null) ? 0 : indexLastWrite, str.length);
  return result;
}
