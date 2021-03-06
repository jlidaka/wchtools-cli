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
"use strict";

const BaseCommand = require("../lib/baseCommand");

const dxAuthoring = require("dxauthoringapi");
const loginHelper = dxAuthoring.login;
const utils = dxAuthoring.utils;
const i18n = utils.getI18N(__dirname, ".json", "en");
const ora = require("ora");

class PublishCommand extends BaseCommand {
    /**
     * Create a PublishCommand object.
     *
     * @param {object} program A Commander program object.
     */
    constructor (program) {
        super(program);
    }

    displayJobStatus(self, helper, logger, jobId, apiOptions) {
        helper.getPublishingJob(jobId, apiOptions)
            .then(function (job) {
                self.successMessage(i18n.__("cli_publishing_job_status", {job_status: job.state}));
                if (self.getCommandLineOption("verbose")) {
                    logger.info(i18n.__("cli_publishing_job_details", {job_details: JSON.stringify(job, null, "    ")}));
                }
                self.resetCommandLineOptions();
            })
            .catch(function (err) {
                const curError = i18n.__("cli_publishing_job_error", {message: err.message});
                self.errorMessage(curError);
                self.resetCommandLineOptions();
            });

    }

    /**
     * Create a new publishing job.
     */
    doPublish () {
        const logger = this.getLogger();
        const mode = this.getCommandLineOption("rebuild") ? "REBUILD" : "UPDATE";
        const statusJobId = this.getCommandLineOption("status");
        const jobParameters = {"mode": mode};
        const helper = dxAuthoring.getPublishingJobsHelper();
        const self = this;

        // Handle the necessary command line options.
        self.handleAuthenticationOptions().then(function () {
            // Login using the current options.
            const apiOptions = self.getApiOptions();
            loginHelper.login(apiOptions)
                .then(function (/*results*/) {
                    if (statusJobId) {
                        self.displayJobStatus(self, helper, logger, statusJobId, apiOptions);
                    } else {
                        BaseCommand.displayToConsole(i18n.__('cli_publishing_job_started'));
                        self.spinner = ora();
                        self.spinner.start();
                        helper.createPublishingJob(jobParameters, apiOptions)
                            .then(function (job) {
                                const createIdMsg = i18n.__('cli_publishing_job_created', {id: job.id});
                                if (self.spinner) {
                                    self.spinner.stop();
                                }
                                self.successMessage(createIdMsg);
                                if (self.getCommandLineOption("verbose")) {
                                    logger.info(i18n.__("cli_publishing_job_details", {job_details: JSON.stringify(job, null, "    ")}));
                                }
                                self.resetCommandLineOptions();
                            })
                            .catch(function (err) {
                                const curError = i18n.__("cli_publishing_job_error", {message: err.message});
                                if (self.spinner) {
                                    self.spinner.stop();
                                }
                                self.errorMessage(curError);
                                self.resetCommandLineOptions();
                            });
                    }
                })
                .catch(function (err) {
                    const curError = i18n.__("cli_publishing_job_error", {message: err.message});
                    self.errorMessage(curError);
                    self.resetCommandLineOptions();
                });
        });
    }

    /**
     * Reset the command line options for this command.
     *
     * NOTE: This is used to reset the values when the command is invoked by the mocha testing. Normally the process
     * ends after the command is executed and so these values go away. But when running the tests, the process isn't
     * terminated and these values need to be reset.
     */
    resetCommandLineOptions () {
        this.setCommandLineOption("rebuild", undefined);
        this.setCommandLineOption("status", undefined);
        super.resetCommandLineOptions();
    }
}

function publishCommand (program) {
    program
        .command('publish')
        .description(i18n.__('cli_publishing_description'))
        .option('-v --verbose',          i18n.__('cli_opt_verbose'))
        .option('-r --rebuild',          i18n.__('cli_publishing_opt_rebuild'))
        .option('--status <id>',        i18n.__('cli_publishing_opt_status'))
        .option('--user <user>',         i18n.__('cli_opt_user_name'))
        .option('--password <password>', i18n.__('cli_opt_password'))
        .action(function (options) {
            const command = new PublishCommand(program);
            if (command.setCommandLineOptions(options, this)) {
                command.doPublish();
            }
        });
}

module.exports = publishCommand;
