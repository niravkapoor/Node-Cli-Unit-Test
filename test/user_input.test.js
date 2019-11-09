const expect = require('chai').expect;
const { constants } = require('os');
const { COLORS } = require('../constant/index');
const  { ENTER, executeWithInput, initProcess } = require('./execute_input.js');

describe("Create user input record",  () => {
    let child_process = null;
    before((done) => {
        child_process = initProcess('./server.js');
        done();
    });

    it("should create user record",  async () => {
        //remove the result of previous executed command
        child_process.updateResult('');
        //input the user input to create 2 student record
        await executeWithInput(child_process,['create 1 nirav 95%',ENTER, 'create 2 kapoor 75%', ENTER]);
        //update the callback of resolve and reject for this command with the child process
        const res = await child_process.updateCB();
        expect(res).to.include("Successfully, created the record");       
    })

    it("find a record", async () => {
        child_process.updateResult('');
        await executeWithInput(child_process,['find 1', ENTER]);
        const res = await child_process.updateCB();
        expect(res).to.include('Record:');
    });

    it("can show status", async () => {
        child_process.updateResult('');
        await executeWithInput(child_process,['status', ENTER]);
        const res = await child_process.updateCB();
        expect(res).to.include(`${COLORS.Blue}Roll No.\t\tName\t\t\tMarks${COLORS.Normal}\n1\t\t\tnirav\t\t\t95%\n2\t\t\tkapoor\t\t\t75%\n`);
    });

    after((done) => {
        child_process.kill(constants.signals.SIGTERM);
        done();
    })
});