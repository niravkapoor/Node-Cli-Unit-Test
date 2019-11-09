
const COLORS = {
    FgBlack: "\x1b[30m%s\x1b[0m",
    FgRed: "\x1b[31m%s\x1b[0m",
    FgGreen: "\x1b[32m%s\x1b[0m",
    FgYellow: "\x1b[33m%s\x1b[0m",
    FgBlue: "\x1b[34m%s\x1b[0m",
    FgMagenta: "\x1b[35m%s\x1b[0m",
    FgCyan: "\x1b[36m%s\x1b[0m",
    FgWhite: "\x1b[37m%s\x1b[0m",
    BgBlack: "\x1b[40m%s\x1b[0m",
    BgRed: "\x1b[41m%s\x1b[0m",
    BgGreen: "\x1b[42m%s\x1b[0m",
    BgYellow: "\x1b[43m%s\x1b[0m",
    BgBlue: "\x1b[44m%s\x1b[0m",
    BgMagenta: "\x1b[45m%s\x1b[0m",
    BgCyan: "\x1b[46m%s\x1b[0m",
    CYAN: "\x1b[36m%s\x1b[0m",
    Green: "\x1b[32m",
    Normal: "\x1b[0m",
    Blue: "\x1b[34m",
    BGBrightCyan: "\x1b[34m%s\x1b[0m",
    Magenta: "\x1b[35m",
    Red: "\x1b[31m",
    Yellow: "\x1b[33m"
}

const QUESTIONS = {
    startWith: `${COLORS.Blue}Welcome to the Program...!!!${COLORS.Normal}\nType any of the below command\n1. To create a student record: ${COLORS.Red}create <roll_no> <name> <marks> ${COLORS.Normal}\n2. Find the student using roll no. : ${COLORS.Red}find <roll_no>${COLORS.Normal}\n3. Print the status: ${COLORS.Red}status${COLORS.Normal}`,
    startWithSequence: `${COLORS.Blue}Welcome to the Program...!!!.Create 3 student record${COLORS.Normal}\n`,
    createStudent: `Create a student record by typing : ${COLORS.Red}create <roll_no> <name> <marks> ${COLORS.Normal}`,
    findStudent: `Roll No. to find a record ? : ${COLORS.Red}find <roll_no>${COLORS.Normal}`,
    status: `View status : ${COLORS.Red}status${COLORS.Normal}`
}

const REPLY = {
    rollExist: 'This roll no. already exist',
    printStatus: (list) => {
        let str =  `${COLORS.Blue}Roll No.\t\tName\t\t\tMarks${COLORS.Normal}\n`;
        list.forEach((ele) => {
            str += `${ele.roll}\t\t\t${ele.name}\t\t\t${ele.marks}\n`
        })
        return str;
    },
    stdCreated: 'Successfully, created the record',
    rollNotExist: `This roll no. doesn't exist`,
    cmndNotFound: 'Command not found.'
}

const KEYWORDS = {
    FIND: 'find',
    STATUS: 'status',
    CREATE: 'create'
}

module.exports = {
    QUESTIONS,
    COLORS,
    KEYWORDS,
    REPLY
}