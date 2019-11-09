const { spawn } = require('child_process');
const { existsSync } = require('fs');
const { constants } = require('os');

function initProcess(processPath) {
    if (!processPath || !existsSync(processPath)) {
        throw new Error('Process not found');
    }

    let successCB = null, errorCB = null, result = "";
    const child_process =  spawn('node', [processPath]);
    child_process.stderr.on('data', data => {
        console.log('error:', data.toString());
    });
    
    child_process.stdout.on('data', data => {
        result += data.toString();
        setTimeout(() => {
            successCB && successCB(result);
        }, 400)
    });

    child_process.stderr.once('data', (err, data) => {
        errorCB && errorCB(err.toString());
        child_process.kill(constants.signals.SIGTERM);
    });

    child_process.on('error', (err) => {
        errorCB && errorCB(err.toString());
        child_process.kill(constants.signals.SIGTERM);
    });

    const updateCB = () => {
        return new Promise((resolve, reject) => {
           successCB = resolve;
           errorCB = reject;
        })
       
    }

    const updateResult = () => {
        //empty the result of previous test case
        result = "";
    }

    child_process.updateCB = updateCB;
    child_process.updateResult = updateResult;

    return child_process;
}

function executeWithInput(child_process, inputs = []) {
    if (!Array.isArray(inputs) && !inputs.length) {
        throw new Error('Input are in not correct format');
    }
    const timeout = 100

    const iterate = (inputs, resolve, reject) => {
        if (!inputs.length) {
            resolve(true);
            return;
        }
        
        setTimeout(() => {
            child_process.stdin.write(inputs[0]);
            iterate(inputs.slice(1), resolve, reject);
        }, timeout);
    };
    return new Promise((resolve, reject) => { iterate(inputs, resolve, reject)});
}

module.exports = {
    executeWithInput,
    initProcess,
    ENTER: '\x0D',
};