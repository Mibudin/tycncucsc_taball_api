"use strict";

/**
 * Connect to MongoDB and interact with the database.
 * @author Mibudin
 */
const MongoClient = require("mongodb").MongoClient;
const Db = require("mongodb").Db;
const Assert = require("assert");

/**
 * Connect to MongoDB and interact with the database.
 */
class UList
{
    /**
     * Construct an `UList` object to interact with MongoDB.
     * @param {string} hostname The hostname of URL to MongoDB client.
     * @param {number} port The port of URL of MongoDB client.
     * @param {string} dbName The name of the database.
     */
    constructor(hostname, port, dbName)
    {
        this.hostname = hostname;
        this.port = port;
        this.dbName = dbName;

        this.client = null;
        this.database = null;
    }

    /**
     * Get the URL to MongoDB client.
     * @returns The URL to MongoDB client.
     */
    getUrl()
    {
        return `mongodb://${this.hostname}:${this.port}/`;
    }

    /**
     * Connect to the MongoDB Client.\
     * NOTE: Do not use drop method in the method.\
     * Use `dropDatabase()` or `dropCollection()` instead.
     * @param {processClient} processClient Deal with the client.
     */
    connectToClient(processClient)
    {
        if(this.client === null)
        {
            const _this = this;
            MongoClient.connect(this.getUrl(), UList.getDefaultClientOption(),
                function(err, client)
                {
                    Assert.strictEqual(err, null, `Failed to connect to MongoDB.`);
                    // processClient(client);
                    // client.close();
                    _this.client = client;
                    processClient(_this.client);
                }
            );
        }
        else
        {
            processClient(this.client);
        }
    }

    /**
     * Connect to the database of MongoDB.\
     * NOTE: Do not use drop method in the method.\
     * Use `dropDatabase()` or `dropCollection()` instead.
     * @param {processDB} processDB Deal with the database.
     */
    connectToDB(processDB)
    {
        if(this.database === null || this.client === null)
        {
            const _this = this;
            this.connectToClient(
                function(client)
                {
                    _this.database = client.db(_this.dbName);
                    processDB(_this.database, client);
                }
            );
        }
        else
        {
            processDB(this.database, this.client);
        }
    }

    /**
     * Connect to the collection of the database of MongoDB.\
     * NOTE: Do not use drop method in the method.\
     * Use `dropDatabase()` or `dropCollection()` instead.
     * @param {string} colleName The name of the the collection.
     * @param {processColle} processColle Deal with the collection.
     */
    connectToColle(colleName, processColle)
    {
        this.connectToDB(
            function(database, client)
            {
                database.collection(colleName,
                    function(err, collection)
                    {
                        Assert.strictEqual(err, null, `Failed to connect to collection: ${colleName}.`);
                        processColle(collection, database, client);
                    }
                );
            }
        );
    }

    /**
     * Search one objects by the specific query.
     * @param {string} colleName The name of the the collection.
     * @param {"FilterQuery"} query The query used when searching obejects.
     * @param {Object} options The options used when searching obejects.
     * @param {searchCallback} callback The callback dealing with the result of searching objects.
     */
    searchOne(colleName, query, options, callback)
    {
        this.connectToColle(colleName,
            function(collection)
            {
                collection.findOne(query, options,
                    function(err, result)
                    {
                        Assert.strictEqual(err, null, `Failed to find objects.`);
                        callback(result);
                    }
                );
            }
        );
    }

    /**
     * Search the objects by the specific query.\
     * NOTE: The name of this method should be `searchMany()`
     * @param {string} colleName The name of the the collection.
     * @param {"FilterQuery"} query The query used when searching obejects.
     * @param {Object} options The options used when searching obejects.
     * @param {searchCallback} callback The callback dealing with the result of searching objects.
     */
    searchBy(colleName, query, options, callback)
    {
        this.connectToColle(colleName,
            function(collection)
            {
                collection.find(query, options)
                    .toArray(
                        function(err, result)
                        {
                            Assert.strictEqual(err, null, `Failed to find objects.`);
                            callback(result);
                        }
                    );
            }
        );
    }

    /**
     * Push one object into the colleciton of the database.
     * @param {string} colleName The name of the the collection.
     * @param {Object} obj The object push into the colleciton of the database.
     * @param {pushCallback} callback The callback dealing with the result of pushing one object.
     */
    pushOne(colleName, obj, callback)
    {
        this.connectToColle(colleName,
            function(collection)
            {
                collection.insertOne(obj,
                    function(err, result)
                    {
                        Assert.strictEqual(err, null, `Failed to push one object.`);
                        callback(result);
                    }
                );
            }
        );
    }

    /**
     * Push many objects into the colleciton of the database.
     * @param {string} colleName The name of the the collection.
     * @param {Object[]} objs The objects push into the colleciton of the database.
     * @param {pushCallback} callback The callback dealing with the result of pushing objects.
     */
    pushMany(colleName, objs, callback)
    {
        this.connectToColle(colleName,
            function(collection)
            {
                collection.insertMany(objs,
                    function(err, result)
                    {
                        Assert.strictEqual(err, null, `Failed to push many objects.`);
                        callback(result);
                    }
                );
            }
        );
    }

    /**
     * Update one(first found) object in the collection of the database.
     * @param {string} colleName The name of the the collection.
     * @param {"FilterQuery"} query The query used when searching obejects.
     * @param {"UpdateQuery"} updateQuery The query used to update the obeject.
     * @param {updateCallback} callback The callback dealing with the result of updating object.
     */
    updateOne(colleName, query, updateQuery, callback)
    {
        this.connectToColle(colleName,
            function(collection)
            {
                collection.updateOne(query, updateQuery,
                    function(err, result)
                    {
                        Assert.strictEqual(err, null, `Failed to update one object.`);
                        callback(result);
                    }
                );
            }
        );
    }

    /**
     * Update many(all which meeted the query) objects in the collection of the database.
     * @param {string} colleName The name of the the collection.
     * @param {"FilterQuery"} query The query used when searching obejects.
     * @param {"UpdateQuery"} updateQuery The query used to update the obejects.
     * @param {updateCallback} callback The callback dealing with the result of updating objects.
     */
    updateMany(colleName, query, updateQuery, callback)
    {
        this.connectToColle(colleName,
            function(collection)
            {
                collection.updateMany(query, updateQuery,
                    function(err, result)
                    {
                        Assert.strictEqual(err, null, `Failed to update many objects.`);
                        callback(result);
                    }
                );
            }
        );
    }

    /**
     * Delete one(first found) object from the collection of the database.
     * @param {string} colleName The name of the the collection.
     * @param {"FilterQuery"} query The query used when searching obejects.
     * @param {deleteCallback} callback The callback dealing with the result of deleting object.
     */
    deleteOne(colleName, query, callback)
    {
        this.connectToColle(colleName,
            function(collection)
            {
                collection.deleteOne(query,
                    function(err, result)
                    {
                        Assert.strictEqual(err, null, `Failed to delete one object.`);
                        callback(result);
                    }
                );
            }
        );
    }

    /**
     * Delete many(all which meeted the query) objects from the collection of the database.
     * @param {string} colleName The name of the the collection.
     * @param {"FilterQuery"} query The query used when searching obejects.
     * @param {deleteCallback} callback The callback dealing with the result of deleting objects.
     */
    deleteMany(colleName, query, callback)
    {
        this.connectToColle(colleName,
            function(collection)
            {
                collection.deleteMany(query,
                    function(err, result)
                    {
                        Assert.strictEqual(err, null, `Failed to delete many objects.`);
                        callback(result);
                    }
                );
            }
        );
    }

    /**
     * Count how many documents in the colleciton.\
     * WARNING: This function has not existed in MongoDB 2.4.14.
     * @param {string} colleName The name of the colleciton to be counted.
     * @param {"FilterQuery"} query The query used when counting obejects.
     * @param {Object} options The options used when counting obejects.
     * @param {countCallback} callback The callback dealing with the result of counting objects.
     */
    countColleDocs(colleName, query, options, callback)
    {
        this.connectToColle(colleName,
            function(collection)
            {
                collection.countDocuments(query, options,
                    function(err, result)
                    {
                        Assert.strictEqual(err, null, `Failed to count documents of colle: ${colleName}.`);
                        callback(result);
                    }
                );
            }
        );
    }

    /**
     * Count (or maybe estimate) how many documents in the colleciton.\
     * WARNING: This function is deprecated in MongoDB 3.6.13.
     * @param {string} colleName The name of the colleciton to be counted.
     * @param {"FilterQuery"} query The query used when counting obejects.
     * @param {Object} options The options used when counting obejects.
     * @param {countCallback} callback The callback dealing with the result of counting objects.
     */
    countColle(colleName, query, options, callback)
    {
        this.connectToColle(colleName,
            function(collection)
            {
                collection.count(query, options,
                    function(err, result)
                    {
                        Assert.strictEqual(err, null, `Failed to count documents of colle: ${colleName}.`);
                        callback(result);
                    }
                );
            }
        );
    }

    /**
     * Close the MongoDB Client.\
     * NOTE: After calling it, any operations about the MongoDB Client would re-connect to the new one.
     * @param {closeCallback} callback The callback dealing with the result of closing the MongoDB Client.
     */
    closeClient(callback)
    {
        this.client.close(false, callback);
        this.client = null;
    }

    /**
     * Drop the database.\
     * NOTE: Had better not to use this.\
     * NOTE: (Maybe) no more once closing the MongoDB Client.
     * @param {dropCallback} callback The callback of dealing with the result of dropping the database.
     */
    dropDatabase(callback)
    {
        // const _dbName = this.dbName;
        // MongoClient.connect(this.getUrl(), UList.getDefaultClientOption(),
        //     function(err, client)
        //     {
        //         Assert.strictEqual(err, null, `Failed to connect to MongoDB.`);
        //         client.db(_dbName).dropDatabase(
        //             function(err, result)
        //             {
        //                 Assert.strictEqual(err, null, `Failed to drop the database: ${_dbName}.`);
        //                 client.close();  // Must in this callback.
        //                 callback(result);
        //             }
        //         );
        //     }
        // );

        const _this = this;
        this.connectToDB(
            function(database, client)
            {
                database.dropDatabase(
                    function(err, result)
                    {
                        Assert.strictEqual(err, null, `Failed to drop the database: ${_this.dbName}.`);
                        // client.close();  // Must in this callback.
                        callback(result);
                    }
                );
                _this.db === null;
            }
        );
    }

    /**
     * Drop the colleciotn.\
     * NOTE: Had better not to use this.\
     * NOTE: not exiting colleciotn can not be dropped. (or ERROR: `ns not found`)
     * @param {string} colleName The name of the colleciton to be dropped.
     * @param {dropCallback} callback The callback of dealing with the result of dropping the colleciton.
     */
    dropCollection(colleName, callback)
    {
        // const _dbName = this.dbName;
        // MongoClient.connect(this.getUrl(), UList.getDefaultClientOption(),
        //     function(err, client)
        //     {
        //         Assert.strictEqual(err, null, `Failed to connect to MongoDB.`);
        //         client.db(_dbName).collection(colleName).drop(
        //             function(err, result)
        //             {
        //                 Assert.strictEqual(err, null, `Failed to drop the colleciton: ${colleName}.`);
        //                 client.close();  // Must in this callback.
        //                 callback(result);
        //             }
        //         );
        //     }
        // );

        this.connectToColle(colleName,
            function(collection)
            {
                collection.drop(
                    function(err, result)
                    {
                        Assert.strictEqual(err, null, `Failed to drop the colleciton: ${colleName}.`);
                        // client.close();  // Must in this callback.
                        callback(result);
                    }
                );
            }
        );
    }

    /**
     * Create the index of the collection.\
     * NOTE: Not test completly yet.
     * @param {string} colleName The name of the colleciton to be created the index in.
     * @param {object} keys The keys of the index to define how to sort the collection.
     * @param {object} options The options of creating the index.
     * @param {indexCallback} callback The callback of dealing with the result of creating the index of the collection.
     */
    createIndex(colleName, keys, options, callback)
    {
        this.connectToColle(colleName,
            function(collection)
            {
                collection.createIndex(keys, options,
                    function(err, result)
                    {
                        Assert.strictEqual(err, null, `Failed to create one index.`);
                        callback(result);
                    }
                );
            }
        );
    }

    /**
     * Ensure the index of the collection exiting or create it.\
     * NOTE: Not test completly yet.
     * @param {string} colleName The name of the colleciton to be ensured the index in.
     * @param {object} keys The keys of the index to define how to sort the collection.
     * @param {object} options The options of ensuring the index.
     * @param {indexCallback} callback The callback of dealing with the result of ensuring the index of the collection.
     */
    ensureIndex(colleName, keys, options, callback)
    {
        this.connectToColle(colleName,
            function(collection)
            {
                collection.ensureIndex(keys, options,
                    function(err, result)
                    {
                        Assert.strictEqual(err, null, `Failed to ensure one index.`);
                        callback(result);
                    }
                );
            }
        );
    }

    /**
     * Reindex all the indexes of the collection.\
     * NOTE: Not test completly yet.
     * @param {string} colleName The name of the colleciton to be reindexed the indexes in.
     * @param {object} options The options of reindexing the indexes.
     * @param {indexCallback} callback The callback of dealing with the result of reindexing the indexes of the collection.
     */
    reIndex(colleName, options, callback)
    {
        this.connectToColle(colleName,
            function(collection)
            {
                collection.reIndex(options,
                    function(err, result)
                    {
                        Assert.strictEqual(err, null, `Failed to reindex all indexes.`);
                        callback(result);
                    }
                );
            }
        );
    }

    /**
     * Drop the index from the collection.\
     * NOTE: Not test completly yet.
     * @param {string} colleName The name of the colleciton to be dropped the index in.
     * @param {string|object} indexName The name or the define of the index to be dropped.
     * @param {object} options The options of dropping the index.
     * @param {indexCallback} callback The callback of dealing with the result of dropping the index from the collection.
     */
    dropIndex(colleName, indexName, options, callback)
    {
        this.connectToColle(colleName,
            function(collection)
            {
                collection.dropIndex(indexName, options,
                    function(err, result)
                    {
                        Assert.strictEqual(err, null, `Failed to drop one index.`);
                        callback(result);
                    }
                );
            }
        );
    }

    /**
     * Drop all the indexes from the collection.\
     * NOTE: Not test completly yet.
     * @param {string} colleName The name of the colleciton to be dropped the indexes in.
     * @param {object} options The options of dropping the indexes.
     * @param {indexCallback} callback The callback of dealing with the result of dropping all the indexes from the collection.
     */
    dropIndexes(colleName, options, callback)
    {
        this.connectToColle(colleName,
            function(collection)
            {
                collection.dropIndexes(options,
                    function(err, result)
                    {
                        Assert.strictEqual(err, null, `Failed to drop all indexes.`);
                        callback(result);
                    }
                );
            }
        );
    }

    /**
     * Get the default client option to connect to MongoDB Client.
     * @static
     * @returns The default client option to connect to MongoDB Client.
     */
    static getDefaultClientOption()
    {
        return {useNewUrlParser: true, useUnifiedTopology: true};
    }
}


exports.UList = UList;


// Extend JSDoc

/**
 * Deal with the MongoDB Client.
 * @callback processClient
 * @param {MongoClient} client The client to be dealt with.
 */

/**
 * Deal with the database.
 * @callback processDB
 * @param {Db} database The database to be dealt with.
 * @param {MongoClient} [client] The client of the database.
 */

/**
 * Deal with the collection.
 * @callback processColle
 * @param {"Collection"} collection The collection to be dealt with.
 * @param {Db} [database] The database of the collection.
 * @param {MongoClient} [client] The client of the database of the collection.
 */

/**
 * Deal with the result of searching objects.
 * @callback searchCallback
 * @param {Object} result The result of searching objects.
 */

/**
 * Deal with the result of pushing object(s).
 * @callback pushCallback
 * @param {Object} result The result of pushing object(s).
 */

/**
 * Deal with the result of updating object(s).
 * @callback updateCallback
 * @param {Object} result The result of updating object(s).
 */

/**
 * Deal with the result of deleting object(s).
 * @callback deleteCallback
 * @param {Object} result The result of deleting object(s).
 */

/**
 * Deal with the result of counting object(s).
 * @callback countCallback
 * @param {Object} result The result of counting object(s).
 */

/**
 * Deal with the result of closing the MongoDB Client.
 * @callback closeCallback
 * @param {Object} result The result of closing the MongoDB Client.
 */

/**
 * Deal with the result of dropping databases or collecitons.
 * @callback dropCallback
 * @param {Object} result The result of dropping databases or collecitons.
 */

 /**
 * Deal with the result of dealing with the index of the collection.
 * @callback indexCallback
 * @param {Object} result The result of dealing with the index of the collection.
 */
