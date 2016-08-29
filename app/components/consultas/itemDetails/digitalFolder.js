var helpers = require('../../../utils/widgets/helper'),

  dialogs = require('ui/dialogs'),

  dataService = require('../../../dataProviders/pocTjsp');

function navigatedTo (args) {
  var page = args.object;

  page.navigationContext.pageTitle = 'Pasta Digital';
  page.navigationContext.digitalFolder = [{
    'title': 'Páginas de 21 até 21',
    'icon': '\ue096'
  }, {
    'title': 'Páginas de 21 até 41',
    'icon': '\ue096'
  }, {
    'title': 'Páginas de 21 até 21',
    'icon': '\ue096'
  }, {
    'title': 'Páginas de 21 até 21',
    'icon': '\ue096'
  }, {
    'title': 'Páginas de 21 até 21',
    'icon': '\ue096'
  }, {
    'title': 'Páginas de 21 até 21',
    'icon': '\ue096'
  }];

  // context changes
  page.bindingContext = page.navigationContext;
}

exports.navigatedTo = navigatedTo;
