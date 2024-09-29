import * as path from 'path';
import * as assert from 'assert';
import * as ttm from 'azure-pipelines-task-lib/mock-test';

describe('RevealSecret task', function () {

    before( function() {
    });

    after(() => {
    });

    it('should succeed and encode value of a secret variable', function(done: Mocha.Done) {
        this.timeout(60000);
        let tp: string = path.join(__dirname, 'success.js');
        let tr: ttm.MockTestRunner = new ttm.MockTestRunner(tp);
    
        tr.runAsync().then(() => {
            assert.equal(tr.succeeded, true, 'should have succeeded');
            assert.equal(tr.warningIssues.length, 0, 'should have no warnings');
            assert.equal(tr.errorIssues.length, 0, 'should have no errors');
            assert.equal(tr.stdout.indexOf('t-o-p- -s-e-c-r-e-t') >= 0, true, 'should display encoded value of a secret variable');
            done();
        }).catch((error) => {
            done(error); // Ensure the test case fails if there's an error.
        });
    });
});