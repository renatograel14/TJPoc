'use strict';
var menuItems,
    observable = require('data/observable'),
    navigationViewModel = new observable.Observable();

menuItems = [{
    "title": "TJSPMóvel",
    "moduleName": "components/homeView/homeView",
    "icon": "\ue0dd"
}, {
    "title": "Notícias",
    "moduleName": "components/noticias/noticias",
    "icon": "\ue204"
}, {
    "title": "Serviços",
    "moduleName": "components/servicos/servicos",
    "icon": "\ue0da"
}, {
    "title": "Consulta de Processos",
    "moduleName": "components/consultas/consultas",
    "icon": "\ue0e9"
}];

navigationViewModel.set('menuItems', menuItems);
navigationViewModel.set('backButtonHidden', true);

module.exports = navigationViewModel;