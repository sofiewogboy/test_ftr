const prompts = require( 'prompt' );
var colors = require( "@colors/colors/safe" );
import { clearInterval } from 'timers';
import { NotificationHandler } from './utils/notificationHandler';
import { NumericProcessor } from './utils/NumericProcessor';

/*
Main class that conatins all the processing elements
*/
export class Main {
    private notificationHandler = new NotificationHandler();
    private processor = new NumericProcessor( this.notificationHandler );
    private halt: boolean = false;
    private quit: boolean = false;
    private timerObj: any;
    private timerInterval: number;

    //Constructor
    constructor () {
    }

    /*
        start method that kicks off the process
    */
    public async start() {
        prompts.start();
        this.notificationHandler.handleMessage( 'asking for information' );
        this.timerInterval = await this.requestTimerValue();
        this.setTimer(this.timerInterval);

        do {

            const next = await this.requestOperation();
            this.processInput( next );

        } while ( !this.quit )

        this.processor.printValues();
        this.notificationHandler.handleMessage( "Thanks for playing, press any key to exit" );
        clearInterval( this.timerObj );
        return 1;
    }

    /*
        User prompter for time value
    */
    private async requestTimerValue(): Promise<number> {
        const { timeSeconds } = await prompts.get( {
            properties: {
                timeSeconds: {
                    pattern: /^[0-9]+$/,
                    description: colors.magenta( "Please input the amount of time in seconds between emitting numbers and there frequency" )
                }
            }
        } );
        return timeSeconds;
    }

    //Starts timer for processing
    public setTimer( timerValue: number ) {
        this.halt = false;
        this.timerObj = setInterval( () => this.processor.printValues(), timerValue * 1000 );
    }

    //halts the timer
    public haltTimer() {
        this.halt = true;
        if ( !this.timerObj ) {
            clearInterval( this.timerObj );
        }
    }

    // Prompts user for next number or operation
    private async requestOperation(): Promise<number> {
        const { nextOperation } = await prompts.get( {
            properties: {
                nextOperation: {
                    description: colors.green( "Please provide next number or operation" )
                }
            }
        } );
        return nextOperation;
    }

    //Processes the  input
    public processInput( nextOperation ) {
        switch ( nextOperation ) {
            case "halt":
                this.notificationHandler.handleMessage( 'timer halted' );
                this.haltTimer();
                break;
            case "resume":
                this.notificationHandler.handleMessage( 'timer resumed' );
                this.setTimer(this.timerInterval);
                break;
            case "quit":
                this.quit = true;
                break;
            default:
                if ( Number.parseInt( nextOperation ) ) {
                    this.processor.addNumber( nextOperation );
                }
        }
    }
}

//Start program
new Main().start();
