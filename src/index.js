let express = require('express');
let apiRoutes = require('./routers/api-routes');
let app = express();
var port = process.env.PORT || 8080;

app.use('/', apiRoutes);
app.listen(port, function () {
    console.log("Running case on port " + port);
});
