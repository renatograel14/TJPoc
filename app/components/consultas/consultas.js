'use strict';

var movimentosItens = [
    { 'descricao': '15:30 - Remetirods os Autos p Tribunal de Justiça / Colégio Recursal'},
    { 'descricao': '15:30 - Remetirods os Autos p Tribunal de Justiça / Colégio Recursal'},
    { 'descricao': '15:30 - Remetirods os Autos p Tribunal de Justiça / Colégio Recursal'},
    { 'descricao': '15:30 - Remetirods os Autos p Tribunal de Justiça / Colégio Recursal'},
    { 'descricao': '15:30 - Remetirods os Autos p Tribunal de Justiça / Colégio Recursal'},
    { 'descricao': '15:30 - Remetirods os Autos p Tribunal de Justiça / Colégio Recursal'},
    { 'descricao': '15:30 - Remetirods os Autos p Tribunal de Justiça / Colégio Recursal'},
    { 'descricao': '15:30 - Remetirods os Autos p Tribunal de Justiça / Colégio Recursal'},
    { 'descricao': '15:30 - Remetirods os Autos p Tribunal de Justiça / Colégio Recursal'},
    { 'descricao': '15:30 - Remetirods os Autos p Tribunal de Justiça / Colégio Recursal'}
];


var isInit = true,
    helpers = require('../../utils/widgets/helper'),
    navigationProperty = require('../../utils/widgets/navigation-property'),
    service = require('./consultas-service'),
    viewModel = require('./consultas-view-model'),
    searchBarModule = require('ui/search-bar');

function onListViewItemTap(args) {
    var itemData = viewModel.get('listItems')[args.index];
    
    console.log(itemData);

    helpers.navigate({
        moduleName: 'components/consultas/itemDetails/itemDetails',
        context: itemData
    });
}
exports.onListViewItemTap = onListViewItemTap;



function flattenLocationProperties(dataItem) {
    var propName, propValue,
        isLocation = function (value) {
            return propValue && typeof propValue === 'object' &&
                propValue.longitude && propValue.latitude;
        };

    for (propName in dataItem) {
        if (dataItem.hasOwnProperty(propName)) {
            propValue = dataItem[propName];
            if (isLocation(propValue)) {
                dataItem[propName] =
                    'Latitude: ' + propValue.latitude +
                    'Longitude: ' + propValue.longitude;
            }
        }
    }
}
// additional functions



function pageLoaded(args) {
    var page = args.object;

    helpers.platformInit(page);
    page.bindingContext = viewModel;

    viewModel.set('isLoading', true);
    viewModel.set('listItems', []);
    viewModel.set('goSearch', goSearch);





    function goSearch(event) {
        viewModel.set('isLoading', true);
        _fetchData()
            .then(function (result) {
                var itemsList = [];
                result.forEach(function (item) {

                    flattenLocationProperties(item);

                    itemsList.push({
                        Numero: item.Numero,
                        Assunto: item.Assunto,
                        Movimentos: movimentosItens
                    });
                });

                if (itemsList.length === 0) {
                    viewModel.set('resultSearch','Nenhum resultado encontrado!');
                } else { 
                    viewModel.set('resultSearch','Resultados');
                }

                viewModel.set('listItems', itemsList);
                viewModel.set('isLoading', false);
            })
            .catch(function onCatch() {
                viewModel.set('isLoading', false);
            });
    }


    var searchBar = page.getViewById("search");
    searchBar.on(searchBarModule.SearchBar.submitEvent, goSearch);

    viewModel.set('isLoading', false);

    function _fetchData() {
        var pageFilter = viewModel.get('searchField');
        if (pageFilter) {
            console.log('Filter:',pageFilter);
            return service.getAllRecords({'Numero': pageFilter });
        }

        return service.getAllRecords();
    }

   
    // additional pageLoaded

    if (isInit) {
        isInit = false;

        // additional pageInit
    }
}

// START_CUSTOM_CODE_consultas
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_consultas
exports.pageLoaded = pageLoaded;