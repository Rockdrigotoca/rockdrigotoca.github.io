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
 
    myConnector.getData = function (table, doneCallback) {
    var GUID = "",
        DNIS = 0,
        callerID = 0,
        DestinationNumber = 0,
        setuptime = 0;
        timeanswer = 0;
        timend = 0;
        durationSeconds = 0;                

    $.getXML("http://www.tollfreeforwarding.com/api?u=AdminMxSr&p=7401&range=lastMonth&format=html", function (resp) {
        var feat = resp.features; 

        for (var i = 0, len = feat.length; i < len; i++) {
            GUID = feat[i].properties.GUID;
            DNIS = feat[i].properties.DNIS;
            callerID = feat[i].properties.callerID;
            DestinationNumber = feat[i].properties.DestinationNumber;
            setuptime = feat[i].properties.setuptime;
            timeanswer = feat[i].properties.timeanswer;
            timend = feat[i].properties.timend;
            durationSeconds = feat[i].properties.durationSeconds;


            tableData.push({
                "GUID" : GUID,
                "DNIS" : DNIS,
                "appear" : appear,
                "callerID" : callerID,
                "DestinationNumber" : DestinationNumber,
                "setuptime" : setuptime,
                "timeanswer" : timeanswer,
                "timend" : timend,
                "durationSeconds" : durationSeconds
            });
        }

        table.appendRows(tableData);

        doneCallback();
    });
};
 
    tableau.registerConnector(myConnector);
    $(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "Toll Free Api";
        tableau.submit();
    });
});
})();