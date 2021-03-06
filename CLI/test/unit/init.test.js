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
'use strict';
const expect = require("chai").expect;
const sinon = require("sinon");
const dxAuthoring = require("dxauthoringapi");
const options = dxAuthoring.options;
const xman = require("../../xman");


describe("init", function() {
    describe("init command", function() {
        it("test init user param", function(done) {
            // Execute the command to set the user.
            let error;
            const stubGet = sinon.stub(options, "setOptions");
            xman.parseArgs(['', process.cwd() + "/index.js", 'init', '--user', 'testUser'])
                // Handle a fulfilled promise.
                .then(function (msg) {
                    expect (msg).to.contain('Done');
                })
                // Handle a rejected promise, or a failed expectation from the "then" block.
                .catch(function () {
                    // This is not expected. Pass the error to the "done" function to indicate a failed test.
                    error = new Error("The command should have succeeded.");
                })
                // Handle the cleanup.
                .finally(function () {
                    // Call mocha's done function to indicate that the test is over.
                    stubGet.restore();
                    done(error);
                });
        });
        it("test fail extra param", function(done) {
            // Execute the command to list the items to the download directory.
            let error;
            xman.parseArgs(['', process.cwd() + "/index.js", 'init', 'foo'])
                // Handle a fulfilled promise.
                .then(function () {
                    // This is not expected. Pass the error to the "done" function to indicate a failed test.
                    error = new Error("The command should have failed.");
                })
                // Handle a rejected promise, or a failed expectation from the "then" block.
                .catch(function (msg) {
                    // The stub should only have been called once, and it should have been before the spy.
                    expect (msg).to.contain('Invalid argument');
                })
                // Handle the cleanup.
                .finally(function () {
                    // Call mocha's done function to indicate that the test is over.
                    done(error);
                });
        });
    });
});
