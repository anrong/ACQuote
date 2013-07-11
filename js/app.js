

var QuotationApp = angular.module('QuotationApp', []);


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


QuotationApp.factory('coverLetterFactory', function(){
   /*var customerName;
    if ($scope.customerName==undefined){
      customerName = "";
    }
    customerName = $scope.customerName;
          */

    var coverLetters=[{title: 'Letter 1', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt' +
        ' ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ' +
        'ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum' +
        ' dolore eu fugiat nulla pariatur. Excepteur sint occaecat ' +
        'cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
        {title: 'Letter 2', content:"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque " +
            "ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur " +
            "aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia " +
            "dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. " +
            "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? " +
            "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas " +
            "nulla pariatur?"},
        {title: 'Letter 3', content:'This is the third letter'}];



    //var coverLetters = $resource();


    var factory = {};
    factory.getCoverLetters = function(){
        return coverLetters;
    }
    factory.addCoverLetters = function (){

    }
    return factory;
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

QuotationApp.factory('customerFactory', function(){

})