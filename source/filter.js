'use strict';

const filter = function(str, dictValidTags) {
    return str.replace(new RegExp('[&"\'<>]', 'g'), function(match) {
        // Экранирование всех запрещенных символов
        const dictNotValidLiterals = new Map([
          ['&', '&amp;'],
          ["'", '&#39;'],
          ['"', '&quot;'],
          ['<', '&lt;'],
          ['>', '&gt;']
        ]);
        return dictNotValidLiterals.get(match);
    }).replace(
      new RegExp('&lt;(\/?)([a-zA-Z]*)&gt;', 'g'),
      function(match, p1, p2) {
        if (dictValidTags.indexOf(p2) != -1)
          return '<' + p1 + p2 + '>';
        return match;
    });
};
