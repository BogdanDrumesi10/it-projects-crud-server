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

app.use(bodyParser.urlencoded({extended:true}));

let port = 3333;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});

app.get('/', async (req, res) => {
    await utils.printDatabase(res);
});

app.post('/insert', (req, res) => {
    if (!req.body.project_name) {
        res.send("Project_name missing");
    } else if (!req.body.start_date) {
        res.send("Start_date missing");
    } else if (!req.body.target_end_date) {
        res.send("Target_end_date missing");
    } else if (!req.body.actual_end_date) {
        res.send("Actual_end_date missing");
    } else if (!req.body.created_on) {
        res.send("Created_on missing");
    } else if (!req.body.created_by) {
        res.send("Created_by missing");
    } else if (!req.body.modified_on) {
        res.send("Modified_on missing");
    } else if (!req.body.modified_by) {
        res.send("Modified_by missing");
    } else {
        utils.insertData(req.body.project_name, req.body.start_date,
            req.body.target_end_date, req.body.actual_end_date,
            req.body.created_on, req.body.created_by,
            req.body.modified_on, req.body.modified_by, res)
    }
});

app.post('/update', (req, res) => {
    if (!req.body.project_name) {
        res.send("Project_name missing");
    } else if (!req.body.start_date) {
        res.send("Start_date missing");
    } else if (!req.body.target_end_date) {
        res.send("Target_end_date missing");
    } else if (!req.body.actual_end_date) {
        res.send("Actual_end_date missing");
    } else if (!req.body.created_on) {
        res.send("Created_on missing");
    } else if (!req.body.created_by) {
        res.send("Created_by missing");
    } else if (!req.body.modified_on) {
        res.send("Modified_on missing");
    } else if (!req.body.modified_by) {
        res.send("Modified_by missing");
    } else if (!req.body.old_project_name) {
        res.send("Old_project_name missing");
    } else {
        utils.updateData(req.body.old_project_name,
            req.body.project_name, req.body.start_date,
            req.body.target_end_date, req.body.actual_end_date,
            req.body.created_on, req.body.created_by,
            req.body.modified_on, req.body.modified_by, res)
    }
});

app.post('/delete', (req, res) => {
   if (!req.body.project_name) {
       res.send("Project_name missing");
   } else {
       utils.deleteProject(req.body.project_name, res);
   }
});