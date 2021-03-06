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
 * Run the unit tests for the publishing jobs API in the authoring-api package.
 */
"use strict";

// Publishing Jobs REST
const PublishingJobsRestUnitTest = require("./lib/publishingJobs.rest.unit.js");
const publishingJobsRestUnitTest = new PublishingJobsRestUnitTest();
publishingJobsRestUnitTest.run();

// Publishing Jobs Helper
const PublishingJobsHelperUnitTest = require("./lib/publishingJobs.helper.unit.js");
const publishingJobsHelperUnitTest = new PublishingJobsHelperUnitTest();
publishingJobsHelperUnitTest.run();
