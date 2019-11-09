## Node Js , Command Line app unit testing framework.
This application, explain the process of writing unit test cases for node js - cli application.

Application is based on test scenario's of creating the student record.

Following , commands are supported in the application :
1. User can create the student recod by typing : create <roll_no> <name> <marks>
For ex: create 1 nirav 95%
2. User can find any record using : find <roll_no>
For ex: find 1
3. User can check the status of created record: status

Program explain two different scenarios :

1. File : **server.js** , to start the app type **npm run input**.
It will asks, one of the above commands to be entered by the user.It moves step by step input from the user and performs the activity.

2 File : **app.js** , to start the app type **npm run seq**
It will asks, one of the above commands to be entered by the user. But, it first takes all the input from the user to create atleast 3 student records and then move to the other commands.

## Setup
1. **npm install** : to install the dependencies.
2. **npm run test** : to run the unit test cases.
3. **npm run input** and **npm run seq** : to run the individual testing scenarios

## Unit Testing Framework
To run the test case : **npm run test**

It will execute the two different testin scenarios : 
**sequence.test.js** and **user_input.test.js**

Also , shows the unit test coverage.

Two files : 
1. **execute_input.js** : It takes the input from different unit test cases, and keeps the process active to have the shared instance of result with each test case.

2. **execute.js**: It takes the sequence of input at once from the unit test case and then kills the process. Individual test case will not share the result with each other.


