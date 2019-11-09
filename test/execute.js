const { spawn } = require('child_process');
const { existsSync } = require('fs');

function initProcess(processPath) {
    if (!processPath || !existsSync(processPath)) {
        throw new Error('Process not found');
    }
    
    return spawn('node', [processPath]);
}

function executeWithInput(child_process, inputs = []) {
    if (!Array.isArray(inputs) && !inputs.length) {
        throw new Error('Input are in not correct format');
    }
    const timeout = 100;

    let timeout_kill, result = null;;
    
    const iterate = inputs => {
         if (!inputs.length) {
            child_process.stdin.end(); 
            return;
        }

        timeout_kill = setTimeout(() => {
            child_process.stdin.write(inputs[0]);
            iterate(inputs.slice(1));
        }, timeout);
    };

    const promise = new Promise((resolve, reject) => {
        child_process.stderr.on('data', data => {
            console.log('error', data.toString());
        });
        
        child_process.stdout.on('data', data => {
            result += data.toString();
        });

        child_process.stderr.once('data', err => {
            child_process.stdin.end();

            if (timeout_kill) {
                clearTimeout(timeout_kill);
            }
            reject(err.toString());
        });

        child_process.on('error', reject);
        
        iterate(inputs);

        child_process.stdout.on('end', data => {
            resolve(result);
        })
    });
    
    return promise;
}

module.exports = {
    initProcess,
    executeWithInput,
    ENTER: '\x0D',
};