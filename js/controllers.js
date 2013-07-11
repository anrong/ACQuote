


var IndexCtrl = function($rootScope, $scope){

   // $rootScope.selectedLetter = "";

	$scope.saveState = function(){
		var quotation = {};
		quotation.products = [];
		quotation.settings = $rootScope.settings;

		for(i = 0; i < $rootScope.products.length; i++){
			if($rootScope.products[i].checked == true){
				quotation.products.push($rootScope.products[i]);
			}
		}	

		var blob = new Blob([JSON.stringify(quotation, undefined, 2)], {type: "text/plain;charset=utf-8"});
        saveAs(blob, "Quotation.json");
	}
    $scope.getSomeText = function() {
        var text;
        text = $scope.someText;
        if ($scope.someText == undefined) {
            return  'There is no text yet'
        }
        return text;
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

    $rootScope.productDesc=false;

    $rootScope.setContent = function(text){
        $rootScope.letterText=text;
    }

    $rootScope.setNotes = function(text){
        $rootScope.notes=text;
    }

    tinymce.init({
        selector: "textarea#area1",
        theme: "modern",
        width: 300,
        height: 300
    });


    // Load and Save Module
    $scope.saveTextAsFile = function()
    {
        var textToWrite = $scope.letterText;
        var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
        var fileNameToSaveAs = $scope.saveName;

        var downloadLink = document.createElement("a");
        downloadLink.download = fileNameToSaveAs;
        downloadLink.innerHTML = "Download File";
        if (window.webkitURL != null)
        {
            downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
        }
        else
        {
            downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
            downloadLink.onclick = destroyClickedElement;
            downloadLink.style.display = "none";
            document.body.appendChild(downloadLink);
        }

        downloadLink.click();
    }

    function destroyClickedElement(event)
    {
        document.body.removeChild(event.target);
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

};




var QuotationCtrl = function($rootScope, $scope){

    //$rootScope.productDesc.check(false);

    if($rootScope.settings == undefined){
        $rootScope.settings = {};
    }

    if($rootScope.products==undefined){
        $rootScope.products = new Array()
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
        if(today.getMonth()<10){
            return "0"+today.getMonth().toString();
        }
        return today.getMonth().toString();
    }
    $rootScope.year = today.getFullYear();



    //Included Parts


    //Cover Letter
    $scope.includeLetter = function (){
        if($rootScope.letterText!=undefined){
            return true;
        }
        return false;
    }


    //Second Quote
    $scope.secondQuote = function(){
    for (i=0; i<$rootScope.products.length; i++){
        if ($rootScope.products[i].Quoted2 == true){
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
    // Doesn't work?
    $scope.includeDesc = function () {
        if($rootScope.productDesc.checked===true){
            return true;
        }
        return false;
    }


    //Notes
    $scope.includeNotes = function () {
        if($rootScope.notes==undefined || $rootScope.notes==""){
            return false;
        }
        return true;
    }

    // Generates the total Amounts
    $rootScope.TotalSum = function(){
        var value = 0;
        for (i=0; i<$rootScope.products.length; i++){
            if ($rootScope.products[i].Quoted == true){
                value = value + $rootScope.products[i].StdCost*$rootScope.products[i].Quantity;
            }
        }
        return value;
    }
    $rootScope.TotalSum2 = function(){
        var value = 0;
        for (i=0; i<$rootScope.products.length; i++){
            if ($rootScope.products[i].Quoted2 == true){
                value = value + $rootScope.products[i].StdCost*$rootScope.products[i].Quantity2;
            }
        }
        return value;
    }

    $scope.getProductQuantity = function (product){
        if(product==undefined){
            return 0;
        }
    }

};



var ProductsCtrl = function ($rootScope, $scope, productFactory) {
    $rootScope.products = PRODUCTS;
    $rootScope.baseProducts = productFactory.getBaseProducts();
    $rootScope.pumps = productFactory.getPumps();

    $rootScope.getStdCost = function (baseProduct){
        if(baseProduct==undefined){
            return "";
        }
        return baseProduct.StdCost;
    }
  /*  $scope.checkProduct = function(){
        for (i=0; i < $scope.products.length; i++){
            if($scope.selectedBase.Part==$scope.products[i].Part){
                $scope.products.checked = true;
            }
        }
        return $scope.products;
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

    $rootScope.addClick = function() {

        //Adds the base
        for (i=0; i < $scope.products.length; i++){
            if($scope.selectedBase.Part==$scope.products[i].Part){
                $scope.products[i].Quoted=true;
                $scope.products[i].Quantity=1;

            }
        }

        //Adds the Mud pump
        for (i=0; i < $scope.products.length; i++){
            if($scope.selectedPump==$scope.products[i].Part){
                $scope.products[i].Quoted=true;
                $scope.products[i].Quantity=1;

            }
        }

        //Adds the Truck
        for (i=0; i < $scope.products.length; i++){
            if($scope.selectedTruck==$scope.products[i].Part){
                $scope.products[i].Quoted=true;
                $scope.products[i].Quantity=1;
            }
        }

    }
    $rootScope.addClick2 = function() {
        for (i=0; i < $scope.products.length; i++){
            if($scope.selectedBase.Part==$scope.products[i].Part){
                $scope.products[i].Quoted2=true;
                $scope.products[i].Quantity2=1;
                // $scope.products[i].checked = true;
            }
        }
        for (i=0; i < $scope.products.length; i++){
            if($scope.selectedPump==$scope.products[i].Part){
                $scope.products[i].Quoted2=true;
                $scope.products[i].Quantity2=1;
                //  $scope.products[i].checked = true;
            }
        }

        //Adds the Truck
        for (i=0; i < $scope.products.length; i++){
            if($scope.selectedTruck==$scope.products[i].Part){
                $scope.products[i].Quoted2=true;
                $scope.products[i].Quantity2=1;
            }
        }
        // $scope.selectedBase="";
    }

   //Why doesn't this work??
   $rootScope.resetAll = function (){
       $scope.selectedPump="";
       $scope.selectedPump.value="";
       return $scope.selectedPump;
    }
};




    //$rootScope.selectedLetter = $rootScope.coverLetters[0];
    //s=$scope.letterText;

/*
function Ctrl($scope) {
    $scope.form = {selectedPump: "WARRANTY,STANDARD,T3W"};
}

  */

/*
function CoverLetterCtrl($scope, coverLetterFactory) {
      //Dessa ska hämtas från någon typ av fil

    $scope.coverLetters = coverLetterFactory.getCoverLetters();

    $scope.selectedLetter = $scope.coverLetters[0];
     */
     /*
    if ($scope.selectedLetter.title=="Letter 1"){
        $scope.coverLetter.letterContent="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut " +
            "labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea " +
            "commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. " +
            "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
       */
