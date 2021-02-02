const express = require('express');

const app = express();

const config = require('./config/config');
const expressConfig = require('./config/expressConfig');
const routes = require('./routes');

expressConfig(app);
require('./config/mongoose')(app);
app.use(routes)

app.listen(config.PORT, () => {
    console.log(`Server is listening on port ${config.PORT}`);
})

