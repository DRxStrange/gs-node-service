/*
* You are allowed to study this software for learning and local * development purposes only. Any other use without explicit permission by Mindgrep, is prohibited.
* © 2022 Mindgrep Technologies Pvt Ltd
*/
import { describe, it, expect, path } from './common';
import { fail } from 'assert';
import { logger } from '../core/logger';

/*
 For all the functions which doesn't return JSON output and return some specific
 output, separate *.test.ts file needs to be created for each such test case.
 Mention each test case and its expected result separately.
*/

const testName = path.basename(__filename).split('.')[0];
const fixDir = path.join(__dirname, 'fixtures', testName);

describe(testName, () => {
    it('parallelThreeFn', async () => {
        try {
            const testId = 'parallelThreeFn';
            const result = await require(`${fixDir}/${testId}`).default();
            logger.debug('result: %o',result);

            expect(result.one).to.be.an('Object');
            expect(result.one.success).to.equal(true);
            expect(result.one.code).to.equal(200);
            expect(result.one.message).to.equal('OK');
            expect(result.one.data.json.task_id).to.equal('parallel task1');
            expect(result.two).to.be.an('Object');
            expect(result.two.success).to.equal(true);
            expect(result.two.data).to.equal('parallel task2');
            expect(result.three).to.be.an('Object');
            expect(result.three.success).to.equal(true);
            expect(result.three.data).to.equal(12);
        } catch(error) {
            logger.error('error: %s',<Error>error);
            fail(<Error>error);
        }
    });
    it('parallelFnSeriesOutput', async () => {
        try {
            const testId = 'parallelFnSeriesOutput';
            const result = await require(`${fixDir}/${testId}`).default();
            logger.debug('result: %o',result);

            expect(result.parallel_output_task1).to.be.an('Object');
            expect(result.parallel_output_task1.success).to.equal(true);
            expect(result.parallel_output_task1.code).to.equal(200);
            expect(result.parallel_output_task1.message).to.equal('OK');
            expect(result.parallel_output_task1.data.json.task_id).to.equal('parallel task1');
            expect(result.parallel_output_task2).to.be.an('Object');
            expect(result.parallel_output_task2.success).to.equal(true);
            expect(result.parallel_output_task2.data).to.equal('parallel task2');
            expect(result.parallel_output_task3).to.be.an('Object');
            expect(result.parallel_output_task3.success).to.equal(true);
            expect(result.parallel_output_task3.data).to.equal(12);
        } catch(error) {
            logger.error('error: %s',<Error>error);
            fail(<Error>error);
        }
    });
});
