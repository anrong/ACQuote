/**
 * Created with IntelliJ IDEA.
 * User: mhnes
 * Date: 27/6/13
 * Time: 10:34 AM
 * To change this template use File | Settings | File Templates.
 */

    $scope.savePDF = function(){
        var doc = new jsPDF;
        doc.text(20, 20, 'Hello World!')
        doc.text('This is my first PDF generated for Atlas Copco')
        doc.addPage();
        doc.text(20, 20, 'This is a new page, dude');

        doc.save('first.pdf');
}