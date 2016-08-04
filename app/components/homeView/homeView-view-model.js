'use strict';
var ViewModel,
    Observable = require('data/observable').Observable;
// additional requires

ViewModel = new Observable({

    pageTitle: 'TJSPMóvel',
    HomeItens: [{
        "type": "Consulta de Processos",
        "title": "Por Nome",
        "moduleName": "components/consultas/consultas",
        "icon": "\ue0e9"
    },{
        "type": "Consulta de Processos",        
        "title": "Por Nome da Parte",
        "moduleName": "components/consultas/consultas",
        "icon": "\ue0e9"
    },{
        "type": "Noticias",        
        "title": "Ultimas Noticias",
        "moduleName": "components/noticias/noticias",
        "icon": "\ue204"
    },{
        "type": "Serviços",
        "title": "Certidão",        
        "moduleName": "components/consultas/consultas",
        "icon": "\ue0da"
    },{
        "type": "Serviços",
        "title": "Família",        
        "moduleName": "components/consultas/consultas",
        "icon": "\ue0da"
    }],
    // additional properties
});

// START_CUSTOM_CODE_homeView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_homeView
module.exports = ViewModel;