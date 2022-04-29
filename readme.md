# Details
Name: Andrew Sofia
Position: Team Lead
Language: NodeJS / typescript

# Running the application
```
git clone https://gitlab.com/ausenco-rylson/rylson8.git
cd rylson8
npm run install-all
npm start 
```

# Part 2 sections

## Part 1

New UI would be constucted through adding an Angular and Websockets interface.
User interface would consist of buttons for halt, resume, and quit with inputs for numbers for timer and values
Changes would be required:

- Angular project added to current code base

Server Side Processing:
- Installing and configuring Express within NodeJS project
- Create Express routes and websockets (websockets used to broadcast the messages previous deplayed to console)
- Breakup "Main.ts" file into sub-utils if required. 
- Update the notication handler to work with a websocket handler.

Single Page Application:
- Migrate code and logic to Angular Application for browser specific sessions.

## Part 2

To make this system "production ready" i would perform the following:

If Server side processing: 
- due to the potential for multi-clients i would create a authentication portal and adjust the program to accomidate multiple timers per client if we wanted to maintain calculations on server side or place all logic in a "single page" application and therefore unique to each browser instance. 

For All:
- add elements of TDD around the calculations to ensure we dont have any errors. 
- create webpack and docker deployment configurations
- DevOps build and deployment pipelines

## Part 3

Interesting question, like all coding tests you can either go very in depth and spend alot of time on it or the opposing and spend very little. I think a recommended time restriction or expected level of detail would be useful. Potentially even replace some elements with psuedo coding examples as takes less time and allows your to analyse the candidates thought process (we do this in our internal coding test).