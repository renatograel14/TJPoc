var application = require("application");


/* Live Edit */

var liveedit = require('nativescript-liveedit');

liveedit.restartFile('*');
liveedit.restartFile('app.css');
/*************/

application.start({ moduleName: "components/homeView/homeView" });
