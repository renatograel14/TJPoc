var helpers = require('../../../utils/widgets/helper'),

    dialogs = require('ui/dialogs'),

    dataService = require('../../../dataProviders/pocTjsp');

function navigatedTo(args) {
    var page = args.object;

    page.navigationContext.pageTitle = "Processo";
        
    // context changes
    page.bindingContext = page.navigationContext;
}

exports.navigatedTo = navigatedTo;