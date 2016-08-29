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
    var slideContainer = args.object;
    slideContainer.addChild(getSlide("Faça seus testes!", "https://bs1.cdn.telerik.com/image/v1/ng2phf9jo8zf5lzs/https://bs3.cdn.telerik.com/v1/ng2phf9jo8zf5lzs/d323d860-5b28-11e6-b87d-f9326cc2fa1a?1470415847461"));
    slideContainer.addChild(getSlide("Santos recebe terceiro workshop do Projeto 'Justiça Bandeirante'", "https://bs1.cdn.telerik.com/image/v1/ng2phf9jo8zf5lzs/https://bs1.cdn.telerik.com/v1/ng2phf9jo8zf5lzs/2a85c640-5a5c-11e6-a2dd-9509f1afe86a?1470415884329"));
}

function getSlide(text, image) {
    var slide = new slides.Slide(),
        Label = new LabelModule.Label(),
        Image = new ImageModule.Image();

    Image.src = image;
    Image.cssClass = 'image-slide';
    Label.text = text;
    slide.addChild(Image);    
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