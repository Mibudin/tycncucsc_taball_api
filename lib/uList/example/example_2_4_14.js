/**
 * The example program testing using `UList`.
 * NOTE: For MongoDB version 2.4.14.
 * NOTE: For MongoDB NodeJS Dirver version 2.2.19.
 * @author Mibudin
 */

// Import `UList`.
const UList = require("../UList").UList;

// Import `UListAsync`.
const UListAsync = require("../UListAsync").UListAsync;

// Import the index information of MongoDB.
const dbIndex = require("./exampleIndex.json");

// Import the data to be pushed into the database.
const data = require("./exampleData.json");


// Construct a new `UListAsync` object.
const ula = new UListAsync(new UList(dbIndex.host, dbIndex.port, dbIndex.db.name));

/**
 * Construct a `AsyncFunction` `example()` to test `UListAsync`.\
 * NOTE: Many methods of `UListAsync` object return `Promise` objects.\
 * Use `async function` so that we can use `await` to deal with `Promise` objects more conveniently.
 * @async
 */
async function example()
{
    // Use `dropDatabase()` to drop this database first to clear the remains.
    console.log("The result of dropping database: " + await ula.dropDatabase());
    console.log();

    // Use `connectToDB()` to log the name of the database.
    console.log("DB Name: " + (await ula.connectToDB()).databaseName);
    console.log();

    // Use `connectToColle()` to log the name of the database.
    console.log("Colle Alpha Name: " + (await ula.connectToColle(dbIndex.db.colles.alpha)).collectionName);
    console.log("Colle Bata Name: "  + (await ula.connectToColle(dbIndex.db.colles.beta )).collectionName);
    console.log();

    // Use `pushOne()` to push something into the collection one by one.
    console.log("The result of pushing item into colle Alpha: ");
    console.log((await ula.pushOne(dbIndex.db.colles.alpha, data.alpha[0])).result);
    console.log("The result of pushing item into colle Alpha: ");
    console.log((await ula.pushOne(dbIndex.db.colles.alpha, data.alpha[1])).result);
    console.log();

    // Use `pushMany()` to push all in same time.
    console.log("The result of pushing item into colle Beta: ");
    console.log((await ula.pushMany(dbIndex.db.colles.beta, data.beta)).result);
    console.log();

    // // WARNING: This function has not existed in MongoDB 2.4.14.
    // // Use `countColleDocs()` to see how many objects in collection Alpha.
    // console.log("Amount of objects in colleciton Alpha: " + await ula.countColleDocs(dbIndex.db.colles.alpha));
    // console.log();

    // WARNING: This function is deprecated in MongoDB 3.6.13.
    // Use `countColle()` to estimate how many objects in collection Alpha.
    console.log("(Estimated) amount of objects in colleciton Alpha: " + await ula.countColle(dbIndex.db.colles.alpha, {}, {}));
    console.log();

    // Use `searchMany()` to search what objects in collection Alpha.
    console.log("The result of searching colle Alpha: ");
    console.log(await ula.searchMany(dbIndex.db.colles.alpha, {}, {}));
    console.log();

    // WARNING: Projection features, `projection`, have not existed in MongoDB 2.4.14, using `fields` instead.
    // WARNING: Fields features, `fields, are deprecated in MongoDB 3.6.13.
    // Use `searchMany()` to search what objects in collection Alpha (excluding the property `_id`).
    // Set the parameter `options` as `{projection: {_id: 0}}` to hide the property `_id`.
    console.log("The result of searching colle Alpha (exclude `_id`): ");
    console.log(await ula.searchMany(dbIndex.db.colles.alpha, {}, {fields: {_id: 0}}));
    console.log();

    // Use `searchMany()` to search what objects in collection Alpha (ONLY including the property `name`).
    // Set the parameter `options` as `{projection: {name: 1}}` to just returning the property `name`.
    console.log("The result of searching colle Alpha (ONLY include `name`): ");
    console.log(await ula.searchMany(dbIndex.db.colles.alpha, {}, {fields: {name: 1}}));
    console.log();

    // Use `searchMany()` to search what objects in collection Alpha (excluding the property `_id` and limiting the returned amount to 1).
    // Set the parameter `options` as `{limit: 1}` to hide the property `_id` and to limit the returned amount to 1.
    console.log("The result of searching colle Alpha (exclude `_id`, return 1): ");
    console.log(await ula.searchMany(dbIndex.db.colles.alpha, {}, {fields: {_id: 0}, limit: 1}));
    console.log();

    // Use `searchOne()` to search the object(s) within {id: 1} in collection Beta.
    console.log("The result of searching colle Beta (id: 1): ");
    console.log(await ula.searchOne(dbIndex.db.colles.beta, {id: 1}, {fields: {_id: 0}}));
    console.log();

    // Use `searchOne()` to search the object(s) within {id: 2} in collection Beta.
    console.log("The result of searching colle Beta (id: 2): ");
    console.log(await ula.searchOne(dbIndex.db.colles.beta, {id: 2}, {fields: {_id: 0}}));
    console.log();

    // Use `searchOne()` to search the object(s) within {id: 3} in collection Beta.
    console.log("The result of searching colle Beta (id: 3): ");
    console.log(await ula.searchOne(dbIndex.db.colles.beta, {id: 3}, {fields: {_id: 0}}));
    console.log();

    // Use `searchMany()` to search the object(s) within {id: 3} in collection Beta.
    console.log("The result of searching colle Beta (id: 3): ");
    console.log(await ula.searchMany(dbIndex.db.colles.beta, {id: 3}, {fields: {_id: 0}}));
    console.log();

    // Use `searchMany()` to search the object(s) within {info: {status: "meditating"}} in collection Beta.
    console.log("The result of searching colle Beta (info.status: \"meditating\"): ");
    console.log(await ula.searchMany(dbIndex.db.colles.beta, {"info.status": "meditating"}, {fields: {_id: 0}}));
    console.log();

    // Use `searchOne()` to search the object(s) within {name: "beta_test_2"} in collection Beta.
    console.log("The result of searching colle Beta (name: \"beta_test_2\"): ");
    console.log(await ula.searchOne(dbIndex.db.colles.beta, {name: "beta_test_2"}, {fields: {_id: 0}}));
    console.log();

    // Use `deleteMany()` to delete the object(s) within {realName: "ἑωσφόρος"} in collection Beta.
    console.log("The result of deleting object(s) colle Beta (realName: \"ἑωσφόρος\"): ");
    console.log((await ula.deleteMany(dbIndex.db.colles.beta, {realName: "ἑωσφόρος"})).result);
    console.log();

    // Use `updateOne()` to update the object(s) within {name: "beta_test_2"} in collection Beta.
    console.log("The result of updating colle Beta (name: \"beta_test_2\"): ");
    console.log((await ula.updateOne(dbIndex.db.colles.beta, {name: "beta_test_2"}, {$set: {id: 2, realName: "Satoshi Nakamoto"}})).result);
    console.log();

    // Use `searchMany()` to search what objects in collection Alpha.
    console.log("The result of searching colle Alpha (exclude `_id`): ");
    console.log(await ula.searchMany(dbIndex.db.colles.beta, {}, {fields: {_id: 0}}));
    console.log();

    // Use `closeClient()` to close the current MongoDB Client.
    await ula.closeClient();
    console.log("The MongoDB Client is closed.");
    console.log();
}

// Conduct `example()`
example();
