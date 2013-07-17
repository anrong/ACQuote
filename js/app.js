

var QuotationApp = angular.module('QuotationApp', ['ngSanitize']);


QuotationApp.config(function($routeProvider) {
    $routeProvider
        .when(
        '/quotation',
        {
            controller:'QuotationCtrl',
            templateUrl:'partials/quotation-view.html'
        }
    )
        .when(
        '/products',
        {
            controller:'ProductsCtrl',
            templateUrl:'partials/products-view.html'
        }
    )
        .when(
         '/info',
        {
            controller:'InfoCtrl',
            templateUrl:'partials/info-view.html'
        }
        )
        .otherwise(
        {
            redirectTo:'/quotation'
        }
    );
});


QuotationApp.factory('productFactory', function(){
    var baseProducts = [];
    var tempProducts = [];
  //  var quotedProducts = [];
    var products = PRODUCTS;
    var factory = {};
    factory.getBaseProducts = function () {
        j = 0;
      for (i = 0; i < products.length; i++) {
            if (products[i].Class=="Base") {
            baseProducts[j]=products[i];
                j++;
           }
      }
        return baseProducts;
    }
    factory.getPumps = function (){
        j = 0;
        for (i = 0; i < products.length; i++) {
            if (products[i].Class=="Pump") {
                tempProducts[j]=products[i];
                j++;
            }
        }
        return tempProducts;
    }

    return factory;
    /*
    factory.addQuotedProducts = function(newProduct){
        quotedProducts.push(newProduct)
    }

    factory.getQuotedProducts = function () {
        return quotedProducts;
    } */
})




