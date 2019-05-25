const utils = require('./utils');

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

utils.db.serialize(async () => {
    await sleep(1000);

    utils.printDatabase();
});