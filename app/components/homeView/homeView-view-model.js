'use strict';
var ViewModel,
    Observable = require('data/observable').Observable;
// additional requires

ViewModel = new Observable({

    pageTitle: 'TJSPMóvel',
    HomeItens: [{
        "title": "Consulta de Processos",
        "moduleName": "components/consultas/consultas",
        "icon": "\ue0e9"
    }],
    // additional properties
});

// START_CUSTOM_CODE_homeView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_homeView
module.exports = ViewModel;