export var minText = function (description, maxLength, maxLines) {
    if (maxLines === void 0) { maxLines = 3; }
    var result = '';
    var resultSplit = [];
    var length = 0;
    var split = description.split('>');
    for (var _i = 0, split_1 = split; _i < split_1.length; _i++) {
        var str = split_1[_i];
        if (length < maxLength) {
            if (str.startsWith('<p'))
                resultSplit.push(str);
            else if (str.length <= maxLength - length) {
                resultSplit.push(str.substring(0, maxLength - length));
                length += str.length;
            }
            else {
                var exp = str.substring(0, maxLength - length).split(' ');
                resultSplit.push(exp.slice(0, exp.length - 1).join(' ') + '...</p>');
                length += str.length;
            }
        }
    }
    result = resultSplit.join('>');
    result = result
        .split('</p>')
        .slice(0, maxLines)
        .join('</p>');
    if (!result.endsWith('...') &&
        !result.endsWith('...</p>') &&
        result.length > maxLength)
        result += '...</p>';
    return result;
};
//# sourceMappingURL=Utils.js.map