'use strict';

const filter = function(str) {
    str = str.replace(new RegExp('[&"\'<>]', 'g'), function(match) {
        // Экранирование всех запрещенных символов
        switch (match) {
            case '&':
                return '&amp;';
            case "'":
                return '&#39;';
            case '"':
                return '&quot;';
            case '<':
                return '&lt;';
            case '>':
                return '&gt;';
        }
    });
    str = str.replace(new RegExp('&lt;([a-zA-Z]*)&gt;|&lt;\/([a-zA-Z]*)&gt;', 'g'), function(match, p1, p2) {
        // Нахождение всех допустимых html-тегов и запись их в текст
        let dictValidTags = new Map([
            ['strong', ''],
            ['em', ''],
            ['b', ''],
            ['br', ''],
            ['h1', ''],
            ['h2', ''],
            ['h3', ''],
            ['h4', ''],
            ['h5', ''],
            ['h6', ''],
            ['hr', ''],
            ['label', ''],
            ['p', ''],
            ['span', ''],
            ['ul', ''],
            ['ol', ''],
            ['li', ''],
            ['table', ''],
            ['td', ''],
            ['th', ''],
            ['i', ''],
            ['strong']
        ]);
        if (dictValidTags.has(p1)) {
            return '<' + p1 + '>';
        } else if (dictValidTags.has(p2)) {
            return '</' + p2 + '>';
        }
        return match;
    });
    return str;
};
