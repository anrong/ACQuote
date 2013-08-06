/*
<!-- QuickQuote-->
<!-- Copyright Atlas Copco & Erik Sparre 2013-->
<!-- For use within the Atlas Copco Group only-->
<!-- Developed by: Erik Sparre -->
<!-- Contact: erik.sparre@gmail.com -->
<!-- Developed using AngularJS Framework -->
<!-- User manual and tutorial can be found in User Manual.docx -->
*/


var IndexCtrl = function($rootScope, $scope){

    //$rootScope.selectedLetter = "";

    $rootScope.quotation = {};
    $rootScope.currencies = CURRENCIES;
    $rootScope.quotation.currency = $rootScope.currencies[0];
    $rootScope.quotation.products = PRODUCTS;

    for (i=0; i < $rootScope.quotation.products.length; i++){
        $rootScope.quotation.products[i].StdCost=Math.round($rootScope.quotation.products[i].StdCost*100)/100;
    }

    for (i=0; i < $rootScope.quotation.products.length; i++){
        $rootScope.quotation.products[i].StdCost2=$rootScope.quotation.products[i].StdCost;
    }
    for (i=0; i < $rootScope.quotation.products.length; i++){
        $rootScope.quotation.products[i].Cost=$rootScope.quotation.products[i].StdCost*$rootScope.quotation.currency.Rate;
    }
    for (i=0; i < $rootScope.quotation.products.length; i++){
        $rootScope.quotation.products[i].Cost2=$rootScope.quotation.products[i].StdCost2*$rootScope.quotation.currency.Rate;
    }





    $scope.saveState = function(name){


		var blob = new Blob([JSON.stringify($rootScope.quotation, undefined, 2)], {type: "application/x-download;charset=utf-8"});
        saveAs(blob,name+$rootScope.year+".json");
	}

    $scope.loadState = function(){
        var fileToLoad = document.getElementById("loadState").files[0];

        var fileReader = new FileReader();
        fileReader.onload = function(fileLoadedEvent)
        {
            var JsonTextFromFileLoaded = fileLoadedEvent.target.result;

            $rootScope.quotation = JSON.parse(JsonTextFromFileLoaded);
            $rootScope.$apply($rootScope.quotation);

        };
        fileReader.readAsText(fileToLoad, "UTF-8");
    }

  /*  $scope.savePDF = function(){
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

    }  */
}


var InfoCtrl = function ($rootScope,$scope) {
    $rootScope.coverLetters = LETTERS;

    $rootScope.quotation.terms = TERMS;


    $rootScope.quotation.productDesc=false;

    $rootScope.setContent = function(text){
        $rootScope.quotation.letterText=text;
    }

    $rootScope.setNotes = function(text){
        $rootScope.quotation.notes=text;
    }

    $rootScope.setTerms = function(text){
        $rootScope.quotation.termsText=text;
    }



    // Load and Save Module


    $scope.saveTextAsFile = function(name){
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
            if(textFromFileLoaded.charAt(0) === '"')
                textFromFileLoaded = textFromFileLoaded.substr(1);
            textFromFileLoaded = textFromFileLoaded.replace(/"([^"]*)$/,'$1');
            textFromFileLoaded = textFromFileLoaded.replace(/\\n/g, "");
            $scope.setContent(textFromFileLoaded);
            $rootScope.$apply($rootScope.length);
        };
        fileReader.readAsText(fileToLoad, "UTF-8");

    }
    $scope.loadNoteAsText = function()
    {
        var noteToLoad = document.getElementById("noteToLoad").files[0];

        var fileReader = new FileReader();
        fileReader.onload = function(fileLoadedEvent)
        {
            var textFromFileLoaded = fileLoadedEvent.target.result;
            if(textFromFileLoaded.charAt(0) === '"')
                textFromFileLoaded = textFromFileLoaded.substr(1);
            textFromFileLoaded = textFromFileLoaded.replace(/"([^"]*)$/,'$1');
            textFromFileLoaded = textFromFileLoaded.replace(/\\n/g, "");
            $scope.setNotes(textFromFileLoaded);
            $rootScope.$apply($rootScope.length);
        };
        fileReader.readAsText(noteToLoad, "UTF-8");

    }


     /*
    $scope.terms = function(selectedTerms){
        if (selectedTerms=='Standard Terms'){
            return $rootScope.quotation.terms.Content;
        }
        return "";
    }

    //$rootScope.categories = getCategories();



    /*Product Description
    $rootScope.includeDesc = function (productDesc, included) {
        if (included==true){
            console.log('Included desc')
            for(key in $rootScope.quotation.productDescriptions){
                if ($rootScope.quotation.productDescriptions[key].Name == productDesc.Name){
                    $rootScope.quotation.productDescriptions[key].Included = true;
                }
            }
        } else{
       /* for(key in $rootScope.quotation.productDescriptions){
            if ($rootScope.quotation.productDescriptions[key].Name == productDesc.Name){
                $rootScope.quotation.productDescriptions[key].Included = false;
            }
        }
        }
    }

    */
};




var ProductsCtrl = function ($rootScope, $scope, productFactory) {
/*    if ($rootScope.quotation.products == undefined){
        $rootScope.quotation.products = PRODUCTS;
    } */
    $rootScope.quotation.baseProducts = productFactory.getBaseProducts();

    $rootScope.currencyChange = function(){
        for (i=0; i < $rootScope.quotation.products.length; i++){
            $rootScope.quotation.products[i].Cost=$rootScope.quotation.products[i].StdCost*$rootScope.quotation.currency.Rate;
        }
    }

    $rootScope.currencyChange();


    $rootScope.getStdCost = function (baseProduct){
        if(baseProduct==undefined){
            return "";
        }
        return baseProduct.StdCost;
    }


    $rootScope.removeClick = function (product, quote){
        if(quote=='Main'){
            product.Quoted=false;
            product.Quantity=0;
        }
        if(quote=='Second'){
            product.Quoted2=false;
            product.Quantity2=0;

        }
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

    $scope.getCategories = function(BoxType){
        cat = [];
        for(i=0; i < $rootScope.quotation.products.length; i++){
            if($rootScope.quotation.products[i].Class!='Base' && $rootScope.quotation.products[i].BoxType==BoxType){
                cat.push($rootScope.quotation.products[i].Class)
            }
        }
        return eliminateDuplicates(cat);
    }

    function eliminateDuplicates(cat) {
        var i,
            len=cat.length,
            out=[],
            obj={};

        for (i=0;i<len;i++) {
            obj[cat[i]]=0;
        }
        for (i in obj) {
            out.push(i);
        }
        return out;
    }

    $scope.categorizedProducts = function (BoxType){
        var cat = [];
        cat = $scope.getCategories(BoxType);
        items = [];
        if(BoxType=='Radio'){
            for (j = 0; j < cat.length; j++){
                items[j]= {class: cat[j], products: []};
                for (i = 0; i < $rootScope.quotation.products.length; i++){
                    if (cat[j]== $rootScope.quotation.products[i].Class && $rootScope.quotation.products[i].BoxType=='Radio'){
                        items[j].products.push($rootScope.quotation.products[i])
                        items[j].selected="";

                    }
                }
            }
            return items;
        }
        if(BoxType=='Check'){
        for (j = 0; j < cat.length; j++){
            items[j]= {class: cat[j], products: []};
            for (i = 0; i < $rootScope.quotation.products.length; i++){
                if (cat[j]== $rootScope.quotation.products[i].Class && $rootScope.quotation.products[i].BoxType=='Check'){
                    items[j].products.push($rootScope.quotation.products[i])
                }
            }
        }
        return items;
        }
    }



    $scope.radioBoxCategories = $scope.categorizedProducts('Radio');
    $scope.checkBoxCategories = $scope.categorizedProducts('Check');



    $rootScope.addCustom = function (product){
        product.Quoted=true;
        product.Quantity=1;
    }

    $rootScope.addCustom2 = function (product){
        product.Quoted2=true;
        product.Quantity2=1;
    }

    $scope.selectedRadio = [];
    var cat= new Array();
    $scope.selectedCheck = [cat,[]];

    $rootScope.addClick = function(value) {

        if(value=='1'){

            for (i=0; i < $rootScope.quotation.products.length; i++){
                if($scope.selectedBase.Part==$rootScope.quotation.products[i].Part){
                    $rootScope.quotation.products[i].Quoted=true;
                    $rootScope.quotation.products[i].Quantity=1;
                }
            }

            //Adds the radio values
            for (i=0; i < $rootScope.quotation.products.length; i++){
                for(j=0; j < $scope.selectedRadio.length; j++){
                    if($scope.selectedRadio[j]==$rootScope.quotation.products[i].Part){
                        $rootScope.quotation.products[i].Quoted=true;
                        $rootScope.quotation.products[i].Quantity=1;
                      //  $scope.selectedRadio[j]="";
                    }
                }
            }

            //Adds the checked values
            for (i=0; i < $rootScope.quotation.products.length; i++){
                for(j=0; j < $scope.checkBoxCategories.length; j++){
                    for(k=0; k < $scope.checkBoxCategories[j].products.length; k++){
                        if(($scope.checkBoxCategories[j].products[k].Part==$rootScope.quotation.products[i].Part) && ($scope.checkBoxCategories[j].products[k].checked==true)){
                            $rootScope.quotation.products[i].Quoted=true;
                            $rootScope.quotation.products[i].Quantity=1;
                          //  $scope.checkBoxCategories[j].products[k].checked=false;
                        }
                    }
                }
            }
        }

        if(value=='2') {
            for (i=0; i < $rootScope.quotation.products.length; i++){
                if($scope.selectedBase.Part==$rootScope.quotation.products[i].Part){
                    $rootScope.quotation.products[i].Quoted2=true;
                    $rootScope.quotation.products[i].Quantity2=1;
                }
            }

            for (i=0; i < $rootScope.quotation.products.length; i++){
                for(j=0; j < $scope.selectedRadio.length; j++){
                    if($scope.selectedRadio[j]==$rootScope.quotation.products[i].Part){
                        $rootScope.quotation.products[i].Quoted2=true;
                        $rootScope.quotation.products[i].Quantity2=1;
                       // $scope.selectedRadio[j]="";
                    }
                }
            }
            for (i=0; i < $rootScope.quotation.products.length; i++){
                for(j=0; j < $scope.checkBoxCategories.length; j++){
                    for(k=0; k < $scope.checkBoxCategories[j].products.length; k++){
                        if(($scope.checkBoxCategories[j].products[k].Part==$rootScope.quotation.products[i].Part) && ($scope.checkBoxCategories[j].products[k].checked==true)){
                            $rootScope.quotation.products[i].Quoted2=true;
                            $rootScope.quotation.products[i].Quantity2=1;
                           // $scope.checkBoxCategories[j].products[k].checked=false;
                        }
                    }
                }
            }
        }


       /*
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
        } */
    }
   $rootScope.resetAll = function (){
       for (i=0; i < $rootScope.quotation.products.length; i++){
           for(j=0; j < $scope.selectedRadio.length; j++){
               $scope.selectedRadio[j]="";
           }
       }
       for (i=0; i < $rootScope.quotation.products.length; i++){
           for(j=0; j < $scope.checkBoxCategories.length; j++){
               for(k=0; k < $scope.checkBoxCategories[j].products.length; k++){
                       $scope.checkBoxCategories[j].products[k].checked=false;
                   }
               }
           }
       }

};


var QuotationCtrl = function($rootScope, $scope){


    if($rootScope.settings == undefined){
        $rootScope.settings = {};
    }

    if($rootScope.quotation.products==undefined){
        $rootScope.quotation.products = new Array()
    }

    //Date Control

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

    $rootScope.settings.order = "Description";
    $rootScope.settings.reverse = false;

    $rootScope.isSelected = function(product){
        if(product.checked == true){
            return true;
        }
        return false;
    }



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
        return value;
    }


    $rootScope.numberWithCommas = function (number){
        return numberWithCommas(Math.round(number*100)/100);
    }

    // Generates the total Amounts
    $rootScope.TotalSum = function(){
        var value = 0;
        for (i=0; i<$rootScope.quotation.products.length; i++){
            if ($rootScope.quotation.products[i].Quoted == true){
                value = value + $rootScope.quotation.products[i].Cost*$rootScope.quotation.products[i].Quantity;
            }
        }
        return value;
    }
    $rootScope.TotalSum2 = function(){
        var value = 0;
        for (i=0; i<$rootScope.quotation.products.length; i++){
            if ($rootScope.quotation.products[i].Quoted2 == true){
                value = value + $rootScope.quotation.products[i].Cost2*$rootScope.quotation.products[i].Quantity2;
            }
        }
        return value;
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    $scope.getProductQuantity = function (product){
        if(product==undefined){
            return 0;
        }
    }

    $scope.getDiscount = function (rate, quote){
        var amount;
        if (rate==""||rate==undefined){
            return 0;
        }
        if (quote=='1'){

            amount = $rootScope.TotalSum()*rate/100;
            return amount;
        }
        else if (quote =='2'){
            amount = $rootScope.TotalSum2()*rate/100;

            return amount;
        }

    }

    $rootScope.includeDiscount = function (quote){

        if(quote==1){
            if($rootScope.quotation.Discount=="" || $rootScope.quotation.Discount==0 || $rootScope.quotation.Discount==undefined){
                return false;
            }
            return true;
        }
        if($rootScope.quotation.Discount2=="" || $rootScope.quotation.Discount2==0 || $rootScope.quotation.Discount2==undefined){
            return false;
        }
        return true;
    }

    var descriptions = DESCRIPTIONS;
    getDescriptions = function () {
        for(key in descriptions){
            descriptions[key].imgsrc = [];
            j=1;
            for (i=0; i < descriptions[key].ImageCount; i++){
                descriptions[key].imgsrc[i] = descriptions[key].Name+" "+j+".png";
                j++;
            }
                //descriptions[key].Included = false;
        }
        return descriptions;
    }

    $rootScope.quotation.productDescriptions = getDescriptions();


    $scope.descIsIncluded = function(descName){
        for(key in $rootScope.quotation.productDescriptions){
            if ($rootScope.quotation.productDescriptions[key].included!= undefined){
                if ($rootScope.quotation.productDescriptions[key].Name == descName){
                    if ($rootScope.quotation.productDescriptions[key].included == true){
                        return true
                    }
                }
            }
        }
        return false;
    }

    $scope.includeDesc = function () {
        for(key in $rootScope.quotation.productDescriptions){
            if ($rootScope.quotation.productDescriptions[key].included == true){
                return true
            }
        }
        return false;
    }

    $scope.includeSpec = function () {
        for(key in $rootScope.quotation.technicalSpecifications){
            if ($rootScope.quotation.technicalSpecifications[key].included == true){
                return true
            }
        }
        return false;
    }

    var specifications = SPECIFICATIONS;
    getSpecifications = function () {
        for(key in specifications){
            specifications[key].imgsrc = [];
            j=1;
            for (i=0; i < specifications[key].ImageCount; i++){
                specifications[key].imgsrc[i] = specifications[key].Name+" "+j+".png";
                j++;
            }
            //descriptions[key].Included = false;
        }
        return specifications;
    }

    $rootScope.quotation.technicalSpecifications = getSpecifications();

    $scope.specIsIncluded = function(specName){
        for(key in $rootScope.quotation.technicalSpecifications){
            if ($rootScope.quotation.technicalSpecifications[key].included!= undefined){
                if ($rootScope.quotation.technicalSpecifications[key].Name == specName){
                    if ($rootScope.quotation.technicalSpecifications[key].included == true){
                        return true
                    }
                }
            }
        }
        return false;
    }


};


