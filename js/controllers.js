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

    $rootScope.addresses = ADDRESSES;

    $rootScope.quotation.productDesc=false;

    $rootScope.selectedFooter = $rootScope.addresses[0];

    $rootScope.setContent = function (text) {

        console.log($rootScope.selectedFooter);

        $rootScope.quotation.letterText = text;
        /*var editText;
        editText = '<tr><td>';
        var split = text.split("\n");
        var le = split.length

        for (i = 0; i < le; i++) {
            if (i == 15) {
                //alert(editText);
                //Added by Rajaneesh
                editText = editText + "<table cellpadding='0' cellspacing='0' style='height:80px; width:100%'>";
                editText = editText + "<tr class='CoverLetterFooter'>";
                editText = editText + " <td class='coverLetterFooterText' colspan='4' style='border-bottom:solid 2px black;'>";
                editText = editText + "<div style='height:12px;'>";
                editText = editText + "<h6 align='left;'>Atlas Copco Group Centre</h6>";
                editText = editText + "</div>";
                editText = editText + "</td>";
                editText = editText + "</tr>";

                editText = editText + "<tr class='CoverLetterFooter'>";
                editText = editText + "<td class='coverLetterFooterText'>";
                editText = editText + "<div style='height:5px;>";
                editText = editText + "Atlas Copco AB";
                editText = editText + "</div>";
                editText = editText + " </td>";
                editText = editText + "<td>";
                editText = editText + "<div style='height:5px;'>";
                editText = editText + "Visitors' address:";
                editText = editText + "</div>";
                editText = editText + " </td>";
                editText = editText + "<td>";
                editText = editText + "<div style='height:5px;'>";
                editText = editText + $rootScope.selectedFooter.Phone;
                editText = editText + "</div>";
                editText = editText + "</td>";
                editText = editText + "<td>";
                editText = editText + "<div style='height:5px;'>";
                editText = editText + "A Public Company (publ)";
                editText = editText + " </div>";
                editText = editText + "</td>";
                editText = editText + "</tr>";

                editText = editText + "<tr class='CoverLetterFooter'>";
                editText = editText + "<td class='coverLetterFooterText'>";
                editText = editText + "<div style='height:5px;'>";
                editText = editText + $rootScope.selectedFooter.Address1;
                editText = editText + "</div>";
                editText = editText + "</td>";
                editText = editText + "<td>";
                editText = editText + "<div style='height:5px;'>";
                editText = editText + $rootScope.selectedFooter.VisitAddress;
                editText = editText + "</div>";
                editText = editText + "</td>";
                editText = editText + "<td>";
                editText = editText + "<div style='height:5px;'>";
                editText = editText + $rootScope.selectedFooter.Fax;
                editText = editText + "</div>";
                editText = editText + "</td>";
                editText = editText + "<td>";
                editText = editText + "<div style='height:5px;'>";
                editText = editText + $rootScope.selectedFooter.RegNo;
                editText = editText + "</div>";
                editText = editText + "</td>";
                editText = editText + "</tr>";

                editText = editText + "<tr class='CoverLetterFooter'>";
                editText = editText + "<td class='coverLetterFooterText'>";
                editText = editText + "<div style='height:5px;'>";
                editText = editText + $rootScope.selectedFooter.Country;
                editText = editText + "</div>";
                editText = editText + "</td>";
                editText = editText + "<td>";
                editText = editText + "<div style='height:5px;'>";
                editText = editText + $rootScope.selectedFooter.City;
                editText = editText + "</div>";
                editText = editText + "</td>";
                editText = editText + "<td>";
                editText = editText + "<div style='height:5px;'>";
                editText = editText + $rootScope.selectedFooter.WebPage;
                editText = editText + "</div>";
                editText = editText + "</td>";
                editText = editText + "<td>";
                editText = editText + "<div style='height:5px;'>";
                editText = editText + $rootScope.selectedFooter.RegOffice;
                editText = editText + "</div>";
                editText = editText + "</td>";
                editText = editText + " </tr>";
                editText = editText + "</table></td></tr>";


            }



            editText = editText + split[i]+"</td></tr><tr><td>";

        }
        if (le < 15) {
            for (j = 0; j < (15 - le)*2; j++) {

                editText = editText+ "&nbsp;</td></tr><tr><td>";
            }

            editText = editText + "<table   height='100%' width='100%'>";
            editText = editText + "<tr class='CoverLetterFooter'>";
            editText = editText + " <td class='coverLetterFooterText' colspan='4' style='border-bottom:solid 2px black;'>";
            // editText = editText + "<div style='height:12px;'>";
            editText = editText + "<h6 align='left;'>Atlas Copco Group Centre</h6>";
            // editText = editText + "</div>";
            editText = editText + "</td>";
            editText = editText + "</tr>";

            editText = editText + "<tr class='CoverLetterFooter'>";
            editText = editText + "<td class='coverLetterFooterText'>";
            // editText = editText + "<div style='height:5px;>";
            editText = editText + "Atlas Copco AB";
            // editText = editText + "</div>";
            editText = editText + " </td>";
            editText = editText + "<td>";
            //editText = editText + "<div style='height:5px;'>";
            editText = editText + "Visitors' address:";
            // editText = editText + "</div>";
            editText = editText + " </td>";
            editText = editText + "<td>";
            //  editText = editText + "<div style='height:5px;'>";
            editText = editText + "Telephone: + 46(0)87438000";
            // editText = editText + "</div>";
            editText = editText + "</td>";
            editText = editText + "<td>";
            // editText = editText + "<div style='height:5px;'>";
            editText = editText + "A Public Company (publ)";
            // editText = editText + " </div>";
            editText = editText + "</td>";
            editText = editText + "</tr>";

            editText = editText + "<tr class='CoverLetterFooter'>";
            editText = editText + "<td class='coverLetterFooterText'>";
            editText = editText + "<div style='height:5px;'>";
            editText = editText + "SE-10523 Stockholm";
            editText = editText + "</div>";
            editText = editText + "</td>";
            editText = editText + "<td>";
            editText = editText + "<div style='height:5px;'>";
            editText = editText + "Sickla Industrivag 3";
            editText = editText + "</div>";
            editText = editText + "</td>";
            editText = editText + "<td>";
            editText = editText + "<div style='height:5px;'>";
            editText = editText + "Fax: + 46(0)86449045";
            editText = editText + "</div>";
            editText = editText + "</td>";
            editText = editText + "<td>";
            editText = editText + "<div style='height:5px;'>";
            editText = editText + " Reg. No: 556014-2720";
            editText = editText + "</div>";
            editText = editText + "</td>";
            editText = editText + "</tr>";

            editText = editText + "<tr class='CoverLetterFooter'>";
            editText = editText + "<td class='coverLetterFooterText'>";
            editText = editText + "<div style='height:5px;'>";
            editText = editText + "Sweden";
            editText = editText + "</div>";
            editText = editText + "</td>";
            editText = editText + "<td>";
            editText = editText + "<div style='height:5px;'>";
            editText = editText + "Nacka";
            editText = editText + "</div>";
            editText = editText + "</td>";
            editText = editText + "<td>";
            editText = editText + "<div style='height:5px;'>";
            editText = editText + "www.atlascopco.com (http://www.atlascopco.com)";
            editText = editText + "</div>";
            editText = editText + "</td>";
            editText = editText + "<td>";
            editText = editText + "<div style='height:5px;'>";
            editText = editText + "Reg. Office Nacka";
            editText = editText + "</div>";
            editText = editText + "</td>";
            editText = editText + " </tr>";
            editText = editText + "</table></td></tr>";



        }
        $rootScope.quotation.letterText = "<table  height='100%' width='100%' class='coverLetter' >" + editText + "</table>";*/
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

    //$scope.selectedBase = "";

    $rootScope.currencyChange = function(){
        for (i=0; i < $rootScope.quotation.products.length; i++){
            $rootScope.quotation.products[i].Cost=$rootScope.quotation.products[i].StdCost*$rootScope.quotation.currency.Rate;
        }
    }

    console.log($rootScope.quotation.products);

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
            if(productClass==$rootScope.quotation.products[i].Category){
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
            if($rootScope.quotation.products[i].Category!='Base' && $rootScope.quotation.products[i].BoxType==BoxType){
                cat.push($rootScope.quotation.products[i].Category)
            }
        }
        return eliminateDuplicates(cat);
    }

    console.log($scope.getCategories('Radio'))

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
                items[j]= {Category: cat[j], products: []};
                for (i = 0; i < $rootScope.quotation.products.length; i++){
                    if (cat[j]== $rootScope.quotation.products[i].Category && $rootScope.quotation.products[i].BoxType=='Radio'){
                        items[j].products.push($rootScope.quotation.products[i])
                        items[j].selected="";

                    }
                }
            }
            return items;
        }
        if(BoxType=='Check'){
        for (j = 0; j < cat.length; j++){
            items[j]= {Category: cat[j], products: []};
            for (i = 0; i < $rootScope.quotation.products.length; i++){
                if (cat[j]== $rootScope.quotation.products[i].Category && $rootScope.quotation.products[i].BoxType=='Check'){
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
                        if($rootScope.quotation.products[i].Dep==$scope.selectedBase.Part){
                            $rootScope.quotation.products[i].Quoted=true;
                            $rootScope.quotation.products[i].Quantity=1;
                            //  $scope.selectedRadio[j]="";
                        }
                    }
                }
            }

            //Adds the checked values
            for (i=0; i < $rootScope.quotation.products.length; i++){
                for(j=0; j < $scope.checkBoxCategories.length; j++){
                    for(k=0; k < $scope.checkBoxCategories[j].products.length; k++){
                        if(($scope.checkBoxCategories[j].products[k].Part==$rootScope.quotation.products[i].Part) && ($scope.checkBoxCategories[j].products[k].checked==true)){
                            if($rootScope.quotation.products[i].Dep==$scope.selectedBase.Part){
                                $rootScope.quotation.products[i].Quoted=true;
                                $rootScope.quotation.products[i].Quantity=1;
                                //  $scope.selectedRadio[j]="";
                            }
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
                        if($rootScope.quotation.products[i].Dep==$scope.selectedBase.Part){
                            $rootScope.quotation.products[i].Quoted2=true;
                            $rootScope.quotation.products[i].Quantity2=1;
                            //  $scope.selectedRadio[j]="";
                        }
                       // $scope.selectedRadio[j]="";
                    }
                }
            }
            for (i=0; i < $rootScope.quotation.products.length; i++){
                for(j=0; j < $scope.checkBoxCategories.length; j++){
                    for(k=0; k < $scope.checkBoxCategories[j].products.length; k++){
                        if(($scope.checkBoxCategories[j].products[k].Part==$rootScope.quotation.products[i].Part) && ($scope.checkBoxCategories[j].products[k].checked==true)){
                            if($rootScope.quotation.products[i].Dep==$scope.selectedBase.Part){
                                $rootScope.quotation.products[i].Quoted2=true;
                                $rootScope.quotation.products[i].Quantity2=1;
                                //  $scope.selectedRadio[j]="";
                            }
                           // $scope.checkBoxCategories[j].products[k].checked=false;
                        }
                    }
                }
            }
        }
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

    $rootScope.settings.order = "Type";
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
                descriptions[key].imgsrc[i] = descriptions[key].Name+" "+j+".jpg";
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
                specifications[key].imgsrc[i] = specifications[key].Name+" "+j+".jpg";
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


