(function () {
    var myConnector = tableau.makeConnector();
 
    myConnector.getColumnHeaders = function() {
        var fieldNames = ['date', 'visits'];
        var fieldTypes = ['date', 'float'];
        tableau.headersCallback(fieldNames, fieldTypes);
    };

    var tableInfo = {
        id : "similarWebAPIdata",
        alias : "Datos de Similar Web",
        columns : cols
    };

    schemaCallback([tableInfo]);
};
 
 myConnector.getTableData = function () {
    var connectionUrl = "https://api.similarweb.com/v1/website/metroscubicos.com/total-traffic-and-engagement/visits?api_key=2536e00f4120a5c347aef0c849b97e47&start_date=2016-01&end_date=2016-04&main_domain_only=false&granularity=monthly";

      var data = JSON.parse(fetch_visitors);
    return data.EstimatedVisitors;

        tableau.dataCallback(tableData, "", false);
  };
 
    tableau.registerConnector(myConnector);
    $(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "similarWebAPIdata";
        tableau.submit();
    });
});
})();