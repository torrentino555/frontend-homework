'use strict';

const filter = (str, dictValidTags) =>
    str.replace(new RegExp('[&"\'<>]', 'g'), match => {
        const dictNotValidLiterals = new Map([
          ['&', '&amp;'],
          ["'", '&#39;'],
          ['"', '&quot;'],
          ['<', '&lt;'],
          ['>', '&gt;']
        ]);
        return dictNotValidLiterals.get(match);
    }).replace(
      new RegExp('&lt;(\/?)(' + dictValidTags.join('|') + ')&gt;', 'g'),
      (match, p1, p2) => '<' + p1 + p2 + '>');
