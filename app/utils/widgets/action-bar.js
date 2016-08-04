'use strict';

var frameModule = require('ui/frame');


function onIndex() {
    var topmost = frameModule.topmost();

    topmost.navigate('navigation/navigation');
}

// exports.onBack = onBack;
exports.onIndex = onIndex;
