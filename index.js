const sqlite3 = require('sqlite3').verbose();

// open database in memory
let db = new sqlite3.Database(`./database/sqlite3.db`, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log(`Connected to the in-memory SQlite database.`);
});

const dummyData = {
    project_name: "Test",
    start_date: 1,
    target_end_date: 2,
    actual_end_date: 3,
    created_on: new Date(),
    created_by: "Bogdan",
    modified_on: new Date(),
    modified_by: "Bogdan modifify"
};

// CREATE DATABASE TABLE
db.run('CREATE TABLE IF NOT EXISTS it_projects (' +
    'project_id INTEGER PRIMARY KEY AUTOINCREMENT,' +
    'project_name TEXT NOT NULL,' +
    'start_date INTEGER NOT NULL,' +
    'target_end_date INTEGER NOT NULL,' +
    'actual_end_date INTEGER NOT NULL,' +
    'created_on INTEGER NOT NULL,' +
    'created_by TEXT NOT NULL,' +
    'modified_on INTEGER NOT NULL,' +
    'modified_by TEXT NOT NULL)');

db.run(`INSERT INTO it_projects(project_name, start_date, target_end_date, actual_end_date,
        created_on, created_by, modified_on, modified_by) VALUES
        ('${dummyData.project_name}', '${dummyData.start_date}', '${dummyData.target_end_date}',
        '${dummyData.actual_end_date}', '${dummyData.created_on}', '${dummyData.created_by}',
        '${dummyData.modified_on}', '${dummyData.modified_by}')`);

db.serialize(() => {
    db.each(`SELECT *
           FROM it_projects`, (err, row) => {
        if (err) {
            console.error(err.message);
        }
        console.log(row.project_id + '\t' + row.project_name + '\t' + row.start_date + '\t' + row.target_end_date);
    });
});

