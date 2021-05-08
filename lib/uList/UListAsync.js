/**
 * Process with the asynchronous problems with `UList`.
 * @author Mibudin
 */
const UList = require("./UList").UList;
const Assert = require("assert");


/**
 * Process with the asynchronous problems with `UList`.
 */
class UListAsync
{
    /**
     * Construct an `UListAsync` objects to process with the asynchronous problems with `UList`.
     * @param {UList} uList The `UList` to connect to MongoDB and interact with the database.
     */
    constructor(uList)
    {
        this.ul = uList;
    }

    /**
     * Convert normal `UList` methods to ones packaged with `Promise` object.
     * @param {promiseProcess} process The statement of processing statement in the `Promise` object.
     * @returns {Promise} The `Promise` object of processing the relative statement.
     */
    toPromise(process)
    {
        const _this = this;
        return new Promise(
            function(resolve, reject)
            {
                try
                {
                    process(_this, resolve);
                }
                catch(err)
                {
                    console.error(err);
                    reject(err);
                }
            }
        );
    }

    /**
     * Connect to the MongoDB Client.\
     * NOTE: Do not use drop method in the method.\
     * Use `dropDatabase()` or `dropCollection()` instead.
     * @returns {Promise} The `Promise` object of processing the relative statement.\
     * NOTE: The `resolve()` method of `Promise` object returns:
     * @param {MongoCLient} client The Client of MongoDB.
     */
    connectToClient()
    {
        return this.toPromise(
            function(_this, resolve)
            {
                _this.ul.connectToClient(resolve);
            }
        );
    }

    /**
     * Connect to the database of MongoDB.\
     * NOTE: Do not use drop method in the method.\
     * Use `dropDatabase()` or `dropCollection()` instead.
     * @returns {Promise} The `Promise` object of processing the relative statement.\
     * NOTE: The `resolve()` method of `Promise` object returns:
     * @param {"Db"} db The datebase of MongoDB.
     */
    connectToDB()
    {
        return this.toPromise(
            function(_this, resolve)
            {
                _this.ul.connectToDB(resolve);
            }
        );
    }

    /**
     * Connect to the collection of the database of MongoDB.\
     * NOTE: Do not use drop method in the method.\
     * Use `dropDatabase()` or `dropCollection()` instead.
     * @param {string} colleName The name of the the collection.
     * @returns {Promise} The `Promise` object of processing the relative statement.\
     * NOTE: The `resolve()` method of `Promise` object returns:
     * @param {"Colleciton"} colle The collection of MongoDB.
     */
    connectToColle(colleName)
    {
        return this.toPromise(
            function(_this, resolve)
            {
                _this.ul.connectToColle(colleName, resolve);
            }
        );
    }

    /**
     * Search one objects by the specific query.
     * @param {string} colleName The name of the the collection.
     * @param {"FilterQuery"} query The query used when searching obejects.
     * @param {Object} options The options used when searching obejects.
     * @returns {Promise} The `Promise` object of processing the relative statement.\
     * NOTE: The `resolve()` method of `Promise` object returns:
     * @param {Object} result The result of searching.
     */
    searchOne(colleName, query, options)
    {
        return this.toPromise(
            function(_this, resolve)
            {
                _this.ul.searchOne(colleName, query, options, resolve);
            }
        );
    }

    /**
     * Search the objects by the specific query.\
     * NOTE: The name of this method should be `searchMany()`
     * @param {string} colleName The name of the the collection.
     * @param {"FilterQuery"} query The query used when searching obejects.
     * @param {Object} options The options used when searching obejects.
     * @returns {Promise} The `Promise` object of processing the relative statement.\
     * NOTE: The `resolve()` method of `Promise` object returns:
     * @param {Object} result The result of searching.
     */
    searchMany(colleName, query, options)
    {
        return this.toPromise(
            function(_this, resolve)
            {
                _this.ul.searchBy(colleName, query, options, resolve);
            }
        );
    }

    /**
     * Push one object into the colleciton of the database.
     * @param {string} colleName The name of the the collection.
     * @param {Object} obj The object push into the colleciton of the database.
     * @returns {Promise} The `Promise` object of processing the relative statement.\
     * NOTE: The `resolve()` method of `Promise` object returns:
     * @param {Object} result The result of pushing.
     */
    pushOne(colleName, obj)
    {
        return this.toPromise(
            function(_this, resolve)
            {
                _this.ul.pushOne(colleName, obj, resolve);
            }
        );
    }

    /**
     * Push many objects into the colleciton of the database.
     * @param {string} colleName The name of the the collection.
     * @param {Object[]} objs The objects push into the colleciton of the database.
     * @returns {Promise} The `Promise` object of processing the relative statement.\
     * NOTE: The `resolve()` method of `Promise` object returns:
     * @param {Object} result The result of pushing.
     */
    pushMany(colleName, objs)
    {
        return this.toPromise(
            function(_this, resolve)
            {
                _this.ul.pushMany(colleName, objs, resolve);
            }
        );
    }

    /**
     * Update one(first found) object in the collection of the database.
     * @param {string} colleName The name of the the collection.
     * @param {"FilterQuery"} query The query used when searching obejects.
     * @param {"UpdateQuery"} updateQuery The query used to update the obeject.
     * @returns {Promise} The `Promise` object of processing the relative statement.\
     * NOTE: The `resolve()` method of `Promise` object returns:
     * @param {Object} result The result of updating.
     */
    updateOne(colleName, query, updateQuery)
    {
        return this.toPromise(
            function(_this, resolve)
            {
                _this.ul.updateOne(colleName, query, updateQuery, resolve);
            }
        );
    }

    /**
     * Update many(all which meeted the query) objects in the collection of the database.
     * @param {string} colleName The name of the the collection.
     * @param {"FilterQuery"} query The query used when searching obejects.
     * @param {"UpdateQuery"} updateQuery The query used to update the obejects.
     * @returns {Promise} The `Promise` object of processing the relative statement.\
     * NOTE: The `resolve()` method of `Promise` object returns:
     * @param {Object} result The result of updating.
     */
    updateMany(colleName, query, updateQuery)
    {
        return this.toPromise(
            function(_this, resolve)
            {
                _this.ul.updateMany(colleName, query, updateQuery, resolve);
            }
        );
    }

    /**
     * Delete one(first found) object from the collection of the database.
     * @param {string} colleName The name of the the collection.
     * @param {"FilterQuery"} query The query used when searching obejects.
     * @returns {Promise} The `Promise` object of processing the relative statement.\
     * NOTE: The `resolve()` method of `Promise` object returns:
     * @param {Object} result The result of deleting.
     */
    deleteOne(colleName, query)
    {
        return this.toPromise(
            function(_this, resolve)
            {
                _this.ul.deleteOne(colleName, query, resolve);
            }
        );
    }

    /**
     * Delete many(all which meeted the query) objects from the collection of the database.
     * @param {string} colleName The name of the the collection.
     * @param {"FilterQuery"} query The query used when searching obejects.
     * @returns {Promise} The `Promise` object of processing the relative statement.\
     * NOTE: The `resolve()` method of `Promise` object returns:
     * @param {Object} result The result of deleting.
     */
    deleteMany(colleName, query)
    {
        return this.toPromise(
            function(_this, resolve)
            {
                _this.ul.deleteMany(colleName, query, resolve);
            }
        );
    }

    /**
     * Drop the database.
     * @returns {Promise} The `Promise` object of processing the relative statement.\
     * NOTE: The `resolve()` method of `Promise` object returns:
     * @param {Object} result The result of dropping the datebase.
     */
    dropDatabase()
    {
        return this.toPromise(
            function(_this, resolve)
            {
                _this.ul.dropDatabase(resolve);
            }
        );
    }

    /**
     * Drop the colleciotn.\
     * NOTE: not exiting colleciotn can not be dropped. (or ERROR: `ns not found`)
     * @param {string} colleName The name of the colleciton to be dropped.
     * @returns {Promise} The `Promise` object of processing the relative statement.\
     * NOTE: The `resolve()` method of `Promise` object returns:
     * @param {Object} result The result of dropping the collection.
     */
    dropCollection(colleName)
    {
        return this.toPromise(
            function(_this, resolve)
            {
                _this.ul.dropCollection(colleName, resolve);
            }
        );
    }

    /**
     * Count how many documents in the colleciton.
     * @param {string} colleName The name of the colleciton to be counted.
     * @returns {Promise} The `Promise` object of processing the relative statement.\
     * NOTE: The `resolve()` method of `Promise` object returns:
     * @param {Object} result The result of counting the documents in the colleciton.
     */
    countColleDocs(colleName)
    {
        return this.toPromise(
            function(_this, resolve)
            {
                _this.ul.connectToColle(colleName,
                    function(colle)
                    {
                        colle.countDocuments(
                            function(err, result)
                            {
                                Assert.equal(err, null, `Failed to count documents of colle: ${colleName}.`);
                                resolve(result);
                            }
                        );
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
     * @returns {Promise} The `Promise` object of processing the relative statement.\
     * NOTE: The `resolve()` method of `Promise` object returns:
     * @param {Object} result The result of creating the index of the collection.
     */
    createIndex(colleName, keys, options)
    {
        return this.toPromise(
            function(_this, resolve)
            {
                _this.ul.createIndex(colleName, keys, options, resolve);
            }
        );
    }

    /**
     * Ensure the index of the collection exiting or create it.\
     * NOTE: Not test completly yet.
     * @param {string} colleName The name of the colleciton to be created the index in.
     * @param {object} keys The keys of the index to define how to sort the collection.
     * @param {object} options The options of ensuring the index.
     * @returns {Promise} The `Promise` object of processing the relative statement.\
     * NOTE: The `resolve()` method of `Promise` object returns:
     * @param {Object} result The result of ensuring the index of the collection.
     */
    ensureIndex(colleName, keys, options)
    {
        return this.toPromise(
            function(_this, resolve)
            {
                _this.ul.ensureIndex(colleName, keys, options, resolve);
            }
        );
    }

    /**
     * Reindex all the indexes of the collection.\
     * NOTE: Not test completly yet.
     * @param {string} colleName The name of the colleciton to be reindexed the indexes in.
     * @param {object} options The options of reindexing the indexes.
     * @returns {Promise} The `Promise` object of processing the relative statement.\
     * NOTE: The `resolve()` method of `Promise` object returns:
     * @param {Object} result The result of reindexing the indexes of the collection.
     */
    reIndex(colleName, options)
    {
        return this.toPromise(
            function(_this, resolve)
            {
                _this.ul.reIndex(colleName, options, resolve);
            }
        );
    }

    /**
     * Drop the index from the collection.\
     * NOTE: Not test completly yet.
     * @param {string} colleName The name of the colleciton to be dropped the index in.
     * @param {string|object} indexName The name or the define of the index to be dropped.
     * @param {object} options The options of dropping the index.
     * @returns {Promise} The `Promise` object of processing the relative statement.\
     * NOTE: The `resolve()` method of `Promise` object returns:
     * @param {Object} result The result of dropping the index from the collection.
     */
    dropIndex(colleName, indexName, options)
    {
        return this.toPromise(
            function(_this, resolve)
            {
                _this.ul.dropIndex(colleName, indexName, options, resolve);
            }
        );
    }

    /**
     * Drop all the indexes from the collection.\
     * NOTE: Not test completly yet.
     * @param {string} colleName The name of the colleciton to be dropped the indexes in.
     * @param {object} options The options of dropping the indexes.
     * @returns {Promise} The `Promise` object of processing the relative statement.\
     * NOTE: The `resolve()` method of `Promise` object returns:
     * @param {Object} result The result of dropping all the indexes from the collection.
     */
    dropIndexes(colleName, options)
    {
        return this.toPromise(
            function(_this, resolve)
            {
                _this.ul.dropIndexes(colleName, options, resolve);
            }
        );
    }
}


exports.UListAsync = UListAsync;


// Extend JSDoc

/**
 * Processing statement in the `Promise` object.
 * @callback promiseProcess
 * @param {UListAsync} _this The `this` indicating to the `UListAsync` object.
 * @param {"promiseResolve"} resolve The resolve function fo the `Promise` object.
 */
