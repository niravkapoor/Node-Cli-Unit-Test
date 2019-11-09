const expect = require('chai').expect;
const { constants } = require('os');
const { COLORS } = require('../constant/index');
const  { ENTER, executeWithInput, initProcess } = require('./execute.js');

describe("Create user input record",  () => {
    let child_process = null;
    before((done) => {
        child_process = initProcess('./app.js');
        done();
    });

    it("should execute sequence of command",  async () => {
        const res = await executeWithInput(child_process,['create 1 nirav 95%',ENTER, 'create 2 kapoor 75%', ENTER, 'find 1', ENTER, 'status']);
        expect(res).to.include(`${COLORS.Blue}Roll No.\t\tName\t\t\tMarks${COLORS.Normal}\n1\t\t\tnirav\t\t\t95%\n2\t\t\tkapoor\t\t\t75%\n`);      
    })

    after((done) => {
        child_process.kill(constants.signals.SIGTERM);
        done();
    })
});