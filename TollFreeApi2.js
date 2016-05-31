(function () {
    var myConnector = tableau.makeConnector();
 
    myConnector.getColumnHeaders = function() {
        var fieldNames = ['GUID', 'DNIS', 'appear', 'callerID', 'DestinationNumber', 'setuptime', 'timeanswer', 'timeend', 'durationSeconds'];
        var fieldTypes = ['string', 'float', 'float', 'float', 'date', 'date', 'date', 'float'];
        tableau.headersCallback(fieldNames, fieldTypes);
    };

    var tableInfo = {
        id : "callForwardAPIdata",
        alias : "Llamadas provenientes de Call Forwarding",
        columns : cols
    };

    schemaCallback([tableInfo]);
};
 
 myConnector.getTableData = function () {
    var connectionUrl = "www.tollfreeforwarding.com/api?u=AdminMxSr&p=7401&range=lastMonth&format=xml";

    var xhr = $.ajax({
      url: getConnectionUrl(connectionUrl),
      success: function (response) {
        var stockTableRows = $(response).find('#stockTable tr');
        stockTableRows = stockTableRows.not(':first'); // Removes the first row which is the header

        var tableData = [];
        stockTableRows.each(function (i, row) {

          var $stockTableColumnsInRow = $(row).find('td');

          // Build a row from the parsed response
          tableData.push({
            'Ticker':  $($stockTableColumnsInRow[0]).find('a').text(),
            'Company': $($stockTableColumnsInRow[0]).text(),
            'Date':    $($stockTableColumnsInRow[1]).text(),
            'Segment': SEGMENT_KEY[$($stockTableColumnsInRow[2]).find('img').attr('alt')],
            'Call':    CALL_ICON[$($stockTableColumnsInRow[3]).find('img').attr('alt')],
            'Price':   parseFloat($($stockTableColumnsInRow[4]).text().substring(1)) // remove currency, and convert to Float.
          });
        });
        tableau.dataCallback(tableData, "", false);
      }
    });
  };
 
    tableau.registerConnector(myConnector);
    $(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "callForwardAPIdata";
        tableau.submit();
    });
});
})();