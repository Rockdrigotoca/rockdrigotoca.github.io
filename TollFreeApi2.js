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
 
        var tableData = [];
        tollfreeTableRows.each(function (i, row) {

 
          // Build a row from the parsed response
          tableData.push({
            'GUID':  $($tollfreeTableColumnsInRow[0]).string(),
            'DNIS': $($tollfreeTableColumnsInRow[0]).float(),
            'appear':    $($tollfreeTableColumnsInRow[1]).float(),
            'callerID':  $($tollfreeTableColumnsInRow[0]).float(),
            'DestinationNumber': $($tollfreeTableColumnsInRow[0]).float(),
            'setuptime':    $($tollfreeTableColumnsInRow[1]).date(),
            'timeanswer':  $($tollfreeTableColumnsInRow[0]).date(),
            'timeend': $($tollfreeTableColumnsInRow[0]).date(),
            'durationSeconds':    $($tollfreeTableColumnsInRow[1]).float()
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