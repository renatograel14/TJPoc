'use strict';
var isInit = true,
    helpers = require('../../utils/widgets/helper'),
    navigationProperty = require('../../utils/widgets/navigation-property'),
    // additional requires
    viewModel = require('./homeView-view-model');

// additional functions
function pageLoaded(args) {
    var page = args.object;

    helpers.platformInit(page);
    page.bindingContext = viewModel;
    // additional pageLoaded

    if (isInit) {
        isInit = false;
        // additional pageInit
    }
}

function onHomeItemTap(args) {

    var itemData = viewModel.get('HomeItens')[args.index];
    
    console.log(itemData);

    helpers.navigate({
        moduleName: itemData.moduleName,
        context: itemData.details   
    });

}
exports.onHomeItemTap = onHomeItemTap;

// START_CUSTOM_CODE_homeView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_homeView
exports.pageLoaded = pageLoaded;