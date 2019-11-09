const readLine = require('readline');
const { QUESTIONS, COLORS, KEYWORDS, REPLY } = require('./constant/index');

function App() {
    let standardInput = null;
    let studentList = null;

    this.init = () => {
        studentList = {};
        standardInput = readLine.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: false
        });

        standardInput.on('line', start);
        console.log(QUESTIONS.createStudent);
    }

    function start(data) {
        try{
            const inputObj = new Set();
            data.split(" ").forEach((ele) => {
                if(!inputObj.has(ele)){
                    inputObj.add(ele);
                }
            });

            switch(true){
                case !!inputObj.has(KEYWORDS.CREATE):
                    createStudent(data);
                    break;
                case !!inputObj.has(KEYWORDS.STATUS):
                    printStatus(data);
                    break;
                case !!inputObj.has(KEYWORDS.FIND):
                    findStudent(data);
                    break;
                default:
                    console.log(COLORS.FgRed, REPLY.cmndNotFound);
                    break;
            }

        }
        catch(err){
            console.log('Error in start', err);
        }
    }

    function createStudent(data){
        try{
            const [ word, roll, name, marks] = data.split(" ");
            if(!studentList[roll]){
                studentList[roll] = { roll, name, marks }
                if(Object.keys(studentList).length < 3){
                    console.log(QUESTIONS.createStudent);
                }else{
                    console.log(QUESTIONS.findStudent);
                }
            }else{
                console.log(COLORS.FgRed, REPLY.rollExist);
                console.log(QUESTIONS.findStudent);
            }
        }
        catch(err){
            console.log('Error in createStudent', err)
        }
    }

    function findStudent(data){
        try{
            const [word, roll] = data.split(" ");
            if(studentList[roll]){
                console.log(COLORS.FgGreen, `Record: JSON.stringify(studentList[roll])`);
                console.log(QUESTIONS.status);
            }else{
                console.log(COLORS.FgRed, REPLY.rollExist);
                console.log(QUESTIONS.findStudent);
            }
        }
        catch(err){
            console.log('Error in findStudent', err)
        }
    }

    function printStatus() {
        try{
            console.log(REPLY.printStatus(Object.values(studentList)));
        }
        catch(err){
            console.log('Error in printStatus', err)
        }
    }

}

new App().init()