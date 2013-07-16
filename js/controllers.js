


var IndexCtrl = function($rootScope, $scope){

    //$rootScope.selectedLetter = "";

    $rootScope.quotation = {};
    $rootScope.quotation.products = PRODUCTS;


	$scope.saveState = function(name){

        console.log("1");
		var blob = new Blob([JSON.stringify($rootScope.quotation, undefined, 2)], {type: "application/x-download;charset=utf-8"});
        saveAs(blob,name+".json");
	}

    $scope.loadState = function(){
        var fileToLoad = document.getElementById("loadState").files[0];

        var fileReader = new FileReader();
        fileReader.onload = function(fileLoadedEvent)
        {
            var JsonTextFromFileLoaded = fileLoadedEvent.target.result;

            $rootScope.quotation = JSON.parse(JsonTextFromFileLoaded);
            $rootScope.$apply(quotation);
            console.log($rootScope.quotation);

        };
        fileReader.readAsText(fileToLoad, "UTF-8");
    }

    $scope.savePDF = function(){
        var doc = new jsPDF('p','mm', 'a4'),
             margin = 20,
            verticalOffset = margin;
        lines = doc.setFont('Helvetica','')
            .setFontSize(12)
            .splitTextToSize('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt' +
                ' ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ' +
                'ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum' +
                ' dolore eu fugiat nulla pariatur. Excepteur sint occaecat ' +
                'cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 150)
        doc.text(20, verticalOffset, lines)
        verticalOffset += (lines.length + 20)
      //  var imgData = "./data/TATSU.jpg"
      //  doc.addImage(imgData, 'JPEG', 60,20)
        doc.addPage();
        doc.text(20, 20, $scope.getSomeText());

        doc.output('dataurlnewwindow', {});


    }
}



var InfoCtrl = function ($rootScope,$scope, coverLetterFactory) {
    $rootScope.coverLetters = coverLetterFactory.getCoverLetters();

    $rootScope.quotation.productDesc=false;

    $rootScope.setContent = function(text){
        $rootScope.quotation.letterText=text;
    }

    $rootScope.setNotes = function(text){
        $rootScope.quotation.notes=text;
    }

    /*Can I do data binding to this?
    tinymce.init({
        selector: "textarea#area1",
        theme: "modern",
        width: 300,
        height: 300
    });  */


    // Load and Save Module


    $scope.saveTextAsFile = function(name){
        console.log("1");
        var blob = new Blob([JSON.stringify($rootScope.quotation.letterText, undefined, 2)], {type: "application/x-download;charset=utf-8"});
        saveAs(blob,name+".txt");
    }

    $scope.loadFileAsText = function()
    {
        var fileToLoad = document.getElementById("fileToLoad").files[0];

        var fileReader = new FileReader();
        fileReader.onload = function(fileLoadedEvent)
        {
            var textFromFileLoaded = fileLoadedEvent.target.result;
            $scope.setContent(textFromFileLoaded);
        };
        fileReader.readAsText(fileToLoad, "UTF-8");
    }

    $rootScope.quotation.terms = {Title: 'Standard Terms', Content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt' +
        ' ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ' +
        'ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum' +
        ' dolore eu fugiat nulla pariatur. Excepteur sint occaecat ' +
        'cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'};

    $scope.terms = function(selectedTerms){
        if (selectedTerms=='Standard Terms'){
            return $rootScope.quotation.terms.Content;
        }
        return "";
    }

};




var ProductsCtrl = function ($rootScope, $scope, productFactory) {
/*    if ($rootScope.quotation.products == undefined){
        $rootScope.quotation.products = PRODUCTS;
    } */


    $rootScope.quotation.baseProducts = productFactory.getBaseProducts();
    $rootScope.quotation.selectedColdWeather = [];

    $rootScope.getStdCost = function (baseProduct){
        if(baseProduct==undefined){
            return "";
        }
        return baseProduct.StdCost;
    }
  /*  $scope.checkProduct = function(){
        for (i=0; i < $rootScope.quotation.products.length; i++){
            if($scope.selectedBase.Part==$rootScope.quotation.products[i].Part){
                $rootScope.quotation.products.checked = true;
            }
        }
        return $rootScope.quotation.products;
    };
    */
    $rootScope.removeClick = function (product){
        product.Quoted=false;
        product.Quantity=0;
    }
    $rootScope.removeClick2 = function (product){
        product.Quoted2=false;
        product.Quantity2=0;
    }

    $rootScope.showOptions = function (productClass){

        if($scope.selectedBase==undefined){
            return false;
        }
        for(i=0 ;i < $rootScope.quotation.products.length; i++){
            if(productClass==$rootScope.quotation.products[i].Class){
                if($rootScope.quotation.products[i].Dep==$scope.selectedBase.Part){
                    return true;
                }
            }
        }
        return false;
  }

    /*
    Add the products to the quote
    Automate this with some sort of for-loop
     */
    $rootScope.addClick = function() {

        /* How to automate this? Doesn't work
        var selections = ['$scope.selectedPump.Part', '$scope.selectedTruck.Part'];

         for (var key in selections)  {
             console.log(selections[key]);
             for (i=0; i < $rootScope.quotation.products.length; i++){
                 if(selections[key]==$rootScope.quotation.products[i].Part){
                     console.log("hej");
                     $rootScope.quotation.products[i].Quoted=true;
                     $rootScope.quotation.products[i].Quantity=1;
                 }
             }
         }
        */

        //Adds the base
        for (i=0; i < $rootScope.quotation.products.length; i++){
            if($scope.selectedBase.Part==$rootScope.quotation.products[i].Part){
                $rootScope.quotation.products[i].Quoted=true;
                $rootScope.quotation.products[i].Quantity=1;
            }
        }


        //Adds the Truck
        for (i=0; i < $rootScope.quotation.products.length; i++){
            if($scope.selectedTruck==$rootScope.quotation.products[i].Part){
                $rootScope.quotation.products[i].Quoted=true;
                $rootScope.quotation.products[i].Quantity=1;
            }
        }

        //Adds the Truck Options
        for (i=0; i < $rootScope.quotation.products.length; i++){
            if($scope.selectedTruckOption==$rootScope.quotation.products[i].Part){
                $rootScope.quotation.products[i].Quoted=true;
                $rootScope.quotation.products[i].Quantity=1;
            }
        }

        //Adds the Rotation Torque
        for (i=0; i < $rootScope.quotation.products.length; i++){
            if($scope.selectedTorque==$rootScope.quotation.products[i].Part){
                $rootScope.quotation.products[i].Quoted=true;
                $rootScope.quotation.products[i].Quantity=1;
            }
        }

        //Adds the Drill Pipe Setup
        for (i=0; i < $rootScope.quotation.products.length; i++){
            if($scope.selectedDrillPipe==$rootScope.quotation.products[i].Part){
                $rootScope.quotation.products[i].Quoted=true;
                $rootScope.quotation.products[i].Quantity=1;
            }
        }

        //Adds the Air Piping
        for (i=0; i < $rootScope.quotation.products.length; i++){
            if($scope.selectedAirPiping==$rootScope.quotation.products[i].Part){
                $rootScope.quotation.products[i].Quoted=true;
                $rootScope.quotation.products[i].Quantity=1;
            }
        }

        //Water Injection
        for (i=0; i < $rootScope.quotation.products.length; i++){
            if($scope.selectedWaterInjection==$rootScope.quotation.products[i].Part){
                $rootScope.quotation.products[i].Quoted=true;
                $rootScope.quotation.products[i].Quantity=1;
            }
        }

        //Adds the Drill Pipe Setup
        for (i=0; i < $rootScope.quotation.products.length; i++){
            if($scope.selectedDrillPipe==$rootScope.quotation.products[i].Part){
                $rootScope.quotation.products[i].Quoted=true;
                $rootScope.quotation.products[i].Quantity=1;
            }
        }

        //Adds the Hoists
        for (i=0; i < $rootScope.quotation.products.length; i++){
            if($scope.selectedHoist==$rootScope.quotation.products[i].Part){
                $rootScope.quotation.products[i].Quoted=true;
                $rootScope.quotation.products[i].Quantity=1;
            }
        }

        //Adds the Piping Handling
        for (i=0; i < $rootScope.quotation.products.length; i++){
            if($scope.selectedPipingHandling==$rootScope.quotation.products[i].Part){
                $rootScope.quotation.products[i].Quoted=true;
                $rootScope.quotation.products[i].Quantity=1;
            }
        }

        //Adds the Mud pump
        for (i=0; i < $rootScope.quotation.products.length; i++){
            if($scope.selectedPump==$rootScope.quotation.products[i].Part){
                $rootScope.quotation.products[i].Quoted=true;
                $rootScope.quotation.products[i].Quantity=1;
            }
        }

        //Adds the Cold Weather Package
        for (i=0; i < $rootScope.quotation.products.length; i++){
            if($rootScope.quotation.products[i].ColdWeather==true){
                $rootScope.quotation.products[i].Quoted=true;
                $rootScope.quotation.products[i].Quantity=1;
            }
        }

        //Adds the Miscellaneous
        for (i=0; i < $rootScope.quotation.products.length; i++){
            if($rootScope.quotation.products[i].Miscellaneous==true){
                $rootScope.quotation.products[i].Quoted=true;
                $rootScope.quotation.products[i].Quantity=1;
            }
        }

        //Adds Accessories
        for (i=0; i < $rootScope.quotation.products.length; i++){
            if($rootScope.quotation.products[i].Accessories==true){
                $rootScope.quotation.products[i].Quoted=true;
                $rootScope.quotation.products[i].Quantity=1;
            }
        }
    }


    $rootScope.addClick2 = function() {
        //Adds the base
        for (i=0; i < $rootScope.quotation.products.length; i++){
            if($scope.selectedBase.Part==$rootScope.quotation.products[i].Part){
                $rootScope.quotation.products[i].Quoted2=true;
                $rootScope.quotation.products[i].Quantity2=1;
                // $rootScope.quotation.products[i].checked = true;
            }
        }
        //Adds the Truck
        for (i=0; i < $rootScope.quotation.products.length; i++){
            if($scope.selectedTruck==$rootScope.quotation.products[i].Part){
                $rootScope.quotation.products[i].Quoted2=true;
                $rootScope.quotation.products[i].Quantity2=1;
            }
        }

        //Adds the Truck Options
        for (i=0; i < $rootScope.quotation.products.length; i++){
            if($scope.selectedTruckOption==$rootScope.quotation.products[i].Part){
                $rootScope.quotation.products[i].Quoted2=true;
                $rootScope.quotation.products[i].Quantity2=1;
            }
        }

        //Adds the Rotation Torque
        for (i=0; i < $rootScope.quotation.products.length; i++){
            if($scope.selectedTorque==$rootScope.quotation.products[i].Part){
                $rootScope.quotation.products[i].Quoted2=true;
                $rootScope.quotation.products[i].Quantity2=1;
            }
        }

        //Adds the Drill Pipe Setup
        for (i=0; i < $rootScope.quotation.products.length; i++){
            if($scope.selectedDrillPipe==$rootScope.quotation.products[i].Part){
                $rootScope.quotation.products[i].Quoted2=true;
                $rootScope.quotation.products[i].Quantity2=1;
            }
        }

        //Adds the Air Piping
        for (i=0; i < $rootScope.quotation.products.length; i++){
            if($scope.selectedAirPiping==$rootScope.quotation.products[i].Part){
                $rootScope.quotation.products[i].Quoted2=true;
                $rootScope.quotation.products[i].Quantity2=1;
            }
        }

        //Water Injection
        for (i=0; i < $rootScope.quotation.products.length; i++){
            if($scope.selectedWaterInjection==$rootScope.quotation.products[i].Part){
                $rootScope.quotation.products[i].Quoted2=true;
                $rootScope.quotation.products[i].Quantity2=1;
            }
        }

        //Adds the Drill Pipe Setup
        for (i=0; i < $rootScope.quotation.products.length; i++){
            if($scope.selectedDrillPipe==$rootScope.quotation.products[i].Part){
                $rootScope.quotation.products[i].Quoted2=true;
                $rootScope.quotation.products[i].Quantity2=1;
            }
        }

        //Adds the Hoists
        for (i=0; i < $rootScope.quotation.products.length; i++){
            if($scope.selectedHoist==$rootScope.quotation.products[i].Part){
                $rootScope.quotation.products[i].Quoted2=true;
                $rootScope.quotation.products[i].Quantity2=1;
            }
        }

        //Adds the Piping Handling
        for (i=0; i < $rootScope.quotation.products.length; i++){
            if($scope.selectedPipingHandling==$rootScope.quotation.products[i].Part){
                $rootScope.quotation.products[i].Quoted2=true;
                $rootScope.quotation.products[i].Quantity2=1;
            }
        }

        //Adds the Mud pump
        for (i=0; i < $rootScope.quotation.products.length; i++){
            if($scope.selectedPump==$rootScope.quotation.products[i].Part){
                $rootScope.quotation.products[i].Quoted2=true;
                $rootScope.quotation.products[i].Quantity2=1;
            }
        }

        //Adds the Cold Weather Package
        for (i=0; i < $rootScope.quotation.products.length; i++){
            if($rootScope.quotation.products[i].ColdWeather==true){
                $rootScope.quotation.products[i].Quoted2=true;
                $rootScope.quotation.products[i].Quantity2=1;
            }
        }

        //Adds the Miscellaneous
        for (i=0; i < $rootScope.quotation.products.length; i++){
            if($rootScope.quotation.products[i].Miscellaneous==true){
                $rootScope.quotation.products[i].Quoted2=true;
                $rootScope.quotation.products[i].Quantity2=1;
            }
        }

        //Adds Accessories
        for (i=0; i < $rootScope.quotation.products.length; i++){
            if($rootScope.quotation.products[i].Accessories==true){
                $rootScope.quotation.products[i].Quoted2=true;
                $rootScope.quotation.products[i].Quantity2=1;
            }
        }
    }


   //Why doesn't this work??
   $rootScope.resetAll = function (){
       $scope.selectedPump="";
       $scope.selectedPump.value="";
       return $scope.selectedPump;
    }
};


var QuotationCtrl = function($rootScope, $scope){

    //$rootScope.productDesc.check(false);

    if($rootScope.settings == undefined){
        $rootScope.settings = {};
    }

    if($rootScope.quotation.products==undefined){
        $rootScope.quotation.products = new Array()
    }


    //Date Control
    //Have to add a number on the month
    var today = new Date();
    $rootScope.day = function() {
        if(today.getDate()<10){
            return "0"+today.getDate().toString();
        }
        return today.getDate().toString();
    }
    $rootScope.month = function() {
        var month = today.getMonth();
        month = month + 1;
        if(month<10){
            return "0"+month.toString();
        }
        return month.toString();
    }
    $rootScope.year = today.getFullYear();



    /*Included Parts
     --------------------------
     */

    //Cover Letter
    $scope.includeLetter = function (){
        if($rootScope.quotation.letterText!=undefined){
            return true;
        }
        return false;
    }


    //Second Quote
    $scope.secondQuote = function(){
        for (i=0; i<$rootScope.quotation.products.length; i++){
            if ($rootScope.quotation.products[i].Quoted2 == true){
                return true;
            }
        }
        return false;
    }

    $rootScope.settings.order = "Description";
    $rootScope.settings.reverse = false;

    $rootScope.isSelected = function(product){
        if(product.checked == true){
            return true;
        }
        return false;
    }


    //Product Description
    $scope.includeDesc = function (productDesc) {
        if(productDesc==true){
            return true;
        }
        return false;
    }


    //Notes
    $scope.includeNotes = function () {
        if($rootScope.quotation.notes==undefined || $rootScope.quotation.notes==""){
            return false;
        }
        return true;
    }

    //Terms and conditions
    $scope.includeTerms = function () {
        if($rootScope.quotation.selectedTerms==undefined || $rootScope.quotation.selectedTerms=="" ){
            return false;
        }
        return true;
    }

    /* Price calculations
     ----------------------------
     */

    //Round the subtotals
    $rootScope.getSubTot = function (product, quantity){
        var value = product*quantity;
        return numberWithCommas(Math.round(value*100)/100);
    }

    // Generates the total Amounts
    $rootScope.TotalSum = function(){
        var value = 0;
        for (i=0; i<$rootScope.quotation.products.length; i++){
            if ($rootScope.quotation.products[i].Quoted == true){
                value = value + $rootScope.quotation.products[i].StdCost*$rootScope.quotation.products[i].Quantity;
            }
        }
        return numberWithCommas(Math.round(value*100)/100);
    }
    $rootScope.TotalSum2 = function(){
        var value = 0;
        for (i=0; i<$rootScope.quotation.products.length; i++){
            if ($rootScope.quotation.products[i].Quoted2 == true){
                value = value + $rootScope.quotation.products[i].StdCost*$rootScope.quotation.products[i].Quantity2;
            }
        }
        return numberWithCommas(Math.round(value*100)/100);
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    $scope.getProductQuantity = function (product){
        if(product==undefined){
            return 0;
        }
    }

};





    //$rootScope.selectedLetter = $rootScope.coverLetters[0];
    //s=$scope.letterText;

/*
function Ctrl($scope) {
    $scope.form = {selectedPump: "WARRANTY,STANDARD,T3W"};
}

  */

