const utils = require('./utils');
const express = require('express');
const bodyParser = require('body-parser');

// function sleep (time) {
//     return new Promise((resolve) => setTimeout(resolve, time));
// }

// utils.db.serialize(async () => {
//     await sleep(1000);
//
//     // utils.insertData("DummyProject", 1,2,3,4,"Bogdan", 5, "Drumesi");
//     // utils.updateData("DummyProject2", "DummyProject3", 45,2,3,4,"Bogdan", 5, "Drumesi")
//
//     await sleep(1000);
//     utils.printDatabase();
// });
const app = express();
let port = 3333;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});

app.get('/', async (req, res) => {
    await utils.printDatabase(res);
});