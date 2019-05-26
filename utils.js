const sqlite3 = require('sqlite3').verbose();

// open database on hdd (./database/sqlite3.db)
const db = new sqlite3.Database(`./database/sqlite3.db`, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log(`Connected to the in-memory SQlite database.`);
    createTableIfNotExists();
});

exports.db = db;

function createTableIfNotExists() {
    // CREATE DATABASE TABLE
    db.run(`CREATE TABLE IF NOT EXISTS it_projects (
        project_id INTEGER PRIMARY KEY AUTOINCREMENT,
        project_name TEXT NOT NULL,
        start_date INTEGER NOT NULL,
        target_end_date INTEGER NOT NULL,
        actual_end_date INTEGER NOT NULL,
        created_on INTEGER NOT NULL,
        created_by TEXT NOT NULL,
        modified_on INTEGER NOT NULL,
        modified_by TEXT NOT NULL
        )`);
}

function checkData(obj, res) {
    if (!isNaN(obj.project_name)) {
        console.log("Project_name is not a string");
        res.send("Project_name is not a string");
        return "NOK";
    } else if (isNaN(obj.start_date)) {
        console.log("Start_date is not a number");
        res.send("Start_date is not a number");
        return "NOK";
    } else if (isNaN(obj.target_end_date)) {
        console.log("Target_end_date is not a number");
        res.send("Target_end_date is not a number");
        return "NOK";
    } else if (isNaN(obj.actual_end_date)) {
        console.log("Actual_end_date is not a number");
        res.send("Actual_end_date is not a number");
        return "NOK";
    } else if (isNaN(obj.created_on)) {
        console.log("Created_on is not a number");
        res.send("Created_on is not a number");
        return "NOK";
    } else if (!isNaN(obj.created_by)) {
        console.log("Created_by is not a string");
        res.send("Created_by is not a string");
        return "NOK";
    } else if (isNaN(obj.modified_on)) {
        console.log("Modified_on is not a number");
        res.send("Modified_on is not a number");
        return "NOK";
    } else if (!isNaN(obj.modified_by)) {
        console.log("Modified_by is not a string");
        res.send("Modified_by is not a string");
        return "NOK";
    } else {
        console.log("Check data types successfully!");
        return "OK";
    }
}

// exports.insertDummyData = () => {
//     let dummyData = {
//         project_name: "Test Project Name",
//         start_date: new Date().getTime(),
//         target_end_date: new Date().getTime(),
//         actual_end_date: new Date().getTime(),
//         created_on: new Date().getTime(),
//         created_by: "Bogdan",
//         modified_on: new Date().getTime(),
//         modified_by: "Bogdan modifify"
//     };
//
//     if (checkData(dummyData, null) === "OK") {
//         db.run(`INSERT INTO it_projects(project_name, start_date, target_end_date, actual_end_date,
//             created_on, created_by, modified_on, modified_by) VALUES
//             ('${dummyData.project_name}', '${dummyData.start_date}', '${dummyData.target_end_date}',
//             '${dummyData.actual_end_date}', '${dummyData.created_on}', '${dummyData.created_by}',
//             '${dummyData.modified_on}', '${dummyData.modified_by}')`);
//     } else {
//         console.log("Row invalid");
//     }
// };

exports.insertData = (project_name, start_date, target_end_date, actual_end_date,
                      created_on, created_by, modified_on, modified_by, res) => {
    let testObj = {
        project_name: project_name,
        start_date: start_date,
        target_end_date: target_end_date,
        actual_end_date: actual_end_date,
        created_on: created_on,
        created_by: created_by,
        modified_on: modified_on,
        modified_by: modified_by
    };
    console.log(testObj);
    if (checkData(testObj, res) === "OK") {
        db.run(`INSERT INTO it_projects(project_name, start_date, target_end_date, actual_end_date,
            created_on, created_by, modified_on, modified_by) VALUES
            ('${project_name}', '${start_date}', '${target_end_date}',
            '${actual_end_date}', '${created_on}', '${created_by}',
            '${modified_on}', '${modified_by}')`, (err) => {
            if (err) {
                console.log(`Error adding project "${project_name}" ${err}`);
                res.send(`Error adding project "${project_name}" ${err}`);
            } else {
                console.log(`Successfully added project "${project_name}"`);
                res.send(`Successfully added project "${project_name}"`)
            }});
    } else {
        console.log("Row invalid");
        //res.send("Inavlid insert");
    }
};

exports.updateData = (old_project_name, project_name, start_date, target_end_date, actual_end_date,
    created_on, created_by, modified_on, modified_by, res) => {
    let testObj = {
        project_name: project_name,
        start_date: start_date,
        target_end_date: target_end_date,
        actual_end_date: actual_end_date,
        created_on: created_on,
        created_by: created_by,
        modified_on: modified_on,
        modified_by: modified_by
    };
    if (checkData(testObj, res) === "OK") {
        db.run(`UPDATE it_projects SET
        project_name='${project_name}',
        start_date=${start_date},
        target_end_date=${target_end_date},
        actual_end_date=${actual_end_date},
        created_on=${created_on},
        created_by='${created_by}',
        modified_on=${modified_on},
        modified_by='${modified_by}'
        WHERE project_name LIKE '${old_project_name}'`, (err) => {
            if (err) {
                console.log(`Error updating project "${project_name}" ${err}`);
                res.send(`Error updating project "${project_name}" ${err}`);
            } else {
                console.log(`Successfully updated project "${project_name}"`);
                res.send(`Successfully updated project "${project_name}"`)
            }
        })
    } else {
        console.log("Row invalid");
    }
};

exports.deleteProject = (project_name, res) => {
    db.run(`DELETE FROM it_projects WHERE project_name='${project_name}'`, (err) => {
        if (err) {
            console.log(`Error deleting project "${project_name}" ${err}`);
            res.send(`Error deleting project "${project_name}" ${err}`);

        } else {
            console.log(`Successfully deleted project "${project_name}"`);
            res.send(`Successfully deleted project "${project_name}"`);
        }
    })
};

exports.printDatabase = (res) => {
    db.all(`SELECT * 
       FROM it_projects`, (err, rows) => {
        if (err) {
            console.error(err.message);
            res.send(`Error in showing database`);
        }
        res.send(rows);
    });
};