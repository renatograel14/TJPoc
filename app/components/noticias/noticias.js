'use strict';
var isInit = true,
    helpers = require('../../utils/widgets/helper'),
    navigationProperty = require('../../utils/widgets/navigation-property'),

    service = require('./noticias-service'),
    // additional requires

    viewModel = require('./noticias-view-model'),
    slides = require('nativescript-slides/nativescript-slides'),
    LabelModule = require("ui/label"),
    ImageModule = require("ui/image");

function onListViewItemTap(args) {
    var itemData = viewModel.get('listItems')[args.index];

    helpers.navigate({
        moduleName: 'components/noticias/itemDetails/itemDetails',
        context: itemData.details
    });
}
exports.onListViewItemTap = onListViewItemTap;

function flattenLocationProperties(dataItem) {
    var propName, propValue,
        isLocation = function(value) {
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

var slides = require('nativescript-slides/nativescript-slides');

function onSlideContainerLoaded(args) {
    var slideContainer = args.object,
        listItems = viewModel.get('itemsList');

    console.log(listItems);   
    //Construct the slides
    slideContainer.addChild(getSlide("Page 1"));
    slideContainer.addChild(getSlide("Page 2"));
    slideContainer.addChild(getSlide("Page 3"));
    slideContainer.addChild(getSlide("Page 4"));
    slideContainer.addChild(getSlide("Page 5"));

}

function getSlide(text) {
    var slide = new slides.Slide();
    var Label = new LabelModule.Label();
    Label.text = text;
    Label.editable = false;
    slide.addChild(Label);

    return slide;
}

exports.onSlideContainerLoaded = onSlideContainerLoaded;



function pageLoaded(args) {
    var page = args.object;

    helpers.platformInit(page);
    page.bindingContext = viewModel;

    viewModel.set('isLoading', true);
    viewModel.set('listItems', []);

    function _fetchData() {
        var context = page.navigationContext;

        if (context && context.filter) {
            return service.getAllRecords(context.filter);
        }

        return service.getAllRecords();
    }

    _fetchData()
        .then(function(result) {
            var itemsList = [];

            result.forEach(function(item) {

                flattenLocationProperties(item);
                var date = new Date(item.Data);

                itemsList.push({

                    icon: '\ue0dc', //globe

                    image: item.Imagem,

                    header: item.Descricao,

                    description: date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear(),

                    // singleItem properties
                    details: item
                });
            });

            viewModel.set('listItems', itemsList);
            viewModel.set('isLoading', false);
        })
        .catch(function onCatch() {
            viewModel.set('isLoading', false);
        });
    // additional pageLoaded

    if (isInit) {
        isInit = false;

        // additional pageInit
    }
}

// START_CUSTOM_CODE_noticias
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_noticias
exports.pageLoaded = pageLoaded;