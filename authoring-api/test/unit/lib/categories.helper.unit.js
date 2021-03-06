/*
Copyright 2016 IBM Corporation

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
/**
 * Unit tests for the categoriesHelper object.
 */
"use strict";

// Require the super classes for this class.
const UnitTest = require("./base.unit.js");
const CategoriesUnitTest = require("./categories.unit.js");
const BaseHelperUnitTest = require("./base.helper.unit.js");
const sinon = require("sinon");

// Require the local module being tested.
const restApi = require(UnitTest.AUTHORING_API_PATH + "lib/categoriesREST.js").instance;
const fsApi = require(UnitTest.AUTHORING_API_PATH + "lib/categoriesFS.js").instance;
const helper = require(UnitTest.AUTHORING_API_PATH + "categoriesHelper.js").instance;
const path1 = CategoriesUnitTest.VALID_CATEGORIES_DIRECTORY + CategoriesUnitTest.VALID_CATEGORY_1;
const path2 = CategoriesUnitTest.VALID_CATEGORIES_DIRECTORY + CategoriesUnitTest.VALID_CATEGORY_2;
const badPath = CategoriesUnitTest.INVALID_CATEGORIES_DIRECTORY + CategoriesUnitTest.INVALID_CATEGORY_BAD_NAME;

class CategoriesHelperUnitTest extends BaseHelperUnitTest {
    constructor() {
        super();
    }

    run(){
        super.run(restApi, fsApi,helper,  path1, path2, badPath);
    }

    runAdditionalTests (restApi, fsApi, helper, path1, path2, badPath/*, type, itemMetadata1, itemMetadata2, badMetadata*/) {
        this.testCreateLocalItem(restApi, fsApi, helper, path1, path2, badPath);
    }

    testCreateLocalItem (restApi, fsApi, helper, path1, path2, badPath) {
        const self = this;
        describe("create local category", function () {

            it("should create a local category", function (done) {
                const stub = sinon.stub(fsApi, "newItem");
                const category = {"name":"testCreateLocal"};
                stub.resolves(category);
                self.addTestDouble(stub);

                let error;
                helper.createLocalItem(category)
                    .then(function(cat) {
                        expect(cat).to.not.be.empty;
                        expect(cat.name).to.equal(category.name);
                    })
                    .catch (function (err) {
                        // NOTE: A failed expectation from above will be handled here.
                        // Pass the error to the "done" function to indicate a failed test.
                        error = err;
                    })
                    .finally(function () {
                        // Call mocha's done function to indicate that the test is over.
                        done(error);
                    });
            });

            it("should fail if local category cannot be created", function (done) {
                const stub = sinon.stub(fsApi, "newItem");
                const ITEM_ERROR = "There was an error creating the local category.";
                stub.rejects(ITEM_ERROR);
                self.addTestDouble(stub);

                let error;
                helper.createLocalItem({"BAD":"STUFF"})
                    .then(function (/*items*/) {
                        // This is not expected. Pass the error to the "done" function to indicate a failed test.
                        error = new Error("The promise for createLocalItem should have been rejected.");
                    })
                    .catch(function (err) {
                        try {
                            // Verify that the stub was called once.
                            expect(stub).to.be.calledOnce;

                            // Verify that the expected error is returned.
                            expect(err.message).to.equal(ITEM_ERROR);
                        } catch (err) {
                            error = err;
                        }
                    })
                    .finally(function () {
                        // Call mocha's done function to indicate that the test is over.
                        done(error);
                    });
            });
        });
    }
}

module.exports = CategoriesHelperUnitTest;
