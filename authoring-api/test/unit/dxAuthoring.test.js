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
 * Unit tests for dxAuthoring.js.
 */
"use strict";

// Require the modules used by the test.
const UnitTest = require("./lib/base.unit.js");

// Require the local module being tested.
let dxauthoring = require(UnitTest.AUTHORING_API_PATH + "dxAuthoring.js");

describe("Unit tests for dxAuthoring.js", function () {
    describe("getPresentationsHelper", function () {
        it("should be a valid helper", function (done) {
            const helper = dxauthoring.getPresentationsHelper();
            expect(helper).to.be.ok;
            expect(helper).to.have.property("getVirtualFolderName");
            expect(helper).to.have.property("listModifiedLocalItemNames");
            expect(helper).to.have.property("createLocalItem");
            done();
        });
    });

    describe("getAssetsHelper", function () {
        it("should be a valid helper", function (done) {
            const helper = dxauthoring.getAssetsHelper();
            expect(helper).to.be.ok;
            expect(helper).to.have.property("getAssetFolderName");
            expect(helper).to.have.property("pushModifiedItems");
            expect(helper).to.have.property("deleteRemoteItem");
            done();
        });
    });

    describe("getItemTypeHelper", function () {
        it("should be a valid helper", function (done) {
            const helper = dxauthoring.getItemTypeHelper();
            expect(helper).to.be.ok;
            expect(helper).to.have.property("getEventEmitter");
            expect(helper).to.have.property("createRemoteItem");
            expect(helper).to.have.property("pullAllItems");
            done();
        });
    });

    describe("getContentHelper", function () {
        it("should be a valid helper", function (done) {
            const helper = dxauthoring.getContentHelper();
            expect(helper).to.be.ok;
            expect(helper).to.have.property("pushItem");
            expect(helper).to.have.property("pullModifiedItems");
            expect(helper).to.have.property("listRemoteDeletedNames");
            done();
        });
    });

    describe("getCategoriesHelper", function () {
        it("should be a valid helper", function (done) {
            const helper = dxauthoring.getCategoriesHelper();
            expect(helper).to.be.ok;
            expect(helper).to.have.property("createLocalItem");
            expect(helper).to.have.property("getLocalItem");
            expect(helper).to.have.property("pullAllItems");
            done();
        });
    });

    describe("getPublishingJobsHelper", function () {
        it("should be a valid helper", function (done) {
            const helper = dxauthoring.getPublishingJobsHelper();
            expect(helper).to.be.ok;
            expect(helper).to.have.property("createPublishingJob");
            expect(helper).to.have.property("getPublishingJob");
            expect(helper).to.have.property("cancelPublishingJob");
            done();
        });
    });

    describe("getPublishingSourcesHelper", function () {
        it("should be a valid helper", function (done) {
            const helper = dxauthoring.getPublishingSourcesHelper();
            expect(helper).to.be.ok;
            expect(helper).to.have.property("getName");
            expect(helper).to.have.property("pullItem");
            expect(helper).to.have.property("listModifiedRemoteItemNames");
            done();
        });
    });

    describe("utils", function () {
        it("should exist", function (done) {
            expect(dxauthoring.utils).to.be.ok;
            done();
        });
    });

    describe("options", function () {
        it("should exist", function (done) {
            expect(dxauthoring.options).to.be.ok;
            done();
        });
    });
});
