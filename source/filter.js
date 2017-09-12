'use strict';

const filter = function(str) {
  var dictTags = {'script' : '', '/script' : '', 'a' : '', '/a' : '', 'img' : '', '/img' : ''};
  var result = "";
  var indexLastWrite = null;
  var gtValid = false;
  for (var i = 0; i < str.length; i++) {
    if (str[i] === '<') {
      result += str.substring((indexLastWrite == null) ? 0 : indexLastWrite, i);
      indexLastWrite = i + 1;

      var leftI = i + 1;
      var tag = null;
      for (; leftI < str.length && str[leftI] != '<' && str[leftI] != '>'; leftI++) {
        if (tag == null && str[leftI] == ' ')
          tag = str.substring(i + 1, leftI);
      }
      tag = (tag == null) ? str.substring(i + 1, leftI) : tag;

      if (leftI == str.length || str[leftI] == '<' || tag in dictTags) {
        result += '&lt;';
      } else {
        result += '<';
        gtValid = true;
      }

    } else if (str[i] === '>') {
      if (gtValid) {
        result += str.substring(indexLastWrite, i + 1);
      } else {
        result += str.substring((indexLastWrite == null) ? 0 : indexLastWrite, i) + '&gt;';
      }
      indexLastWrite = i + 1;
    } else if (str[i] === '&') {
      result += str.substring((indexLastWrite == null) ? 0 : indexLastWrite, i + 1) + 'amp;';
      indexLastWrite = i + 1;
    } else if (str[i] === '\'') {
      result += str.substring((indexLastWrite == null) ? 0 : indexLastWrite, i) + '&#39;';
      indexLastWrite = i + 1;
    } else if (str[i] === '"') {
      result += str.substring((indexLastWrite == null) ? 0 : indexLastWrite, i) + '&quot;';
      indexLastWrite = i + 1;
    }
  }
  result += str.substring((indexLastWrite == null) ? 0 : indexLastWrite, str.length);
  return result;
}
