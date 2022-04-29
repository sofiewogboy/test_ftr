import { NumericRecord } from "../objects/numericRecord";
import { NotificationHandler } from "./notificationHandler";

export class NumericProcessor {

    private staticCollection: NumericRecord[] = [];

    constructor (private notificationHandler: NotificationHandler) {

    }

    private isFibonacci( n: number ): boolean {
        var fib,
            a = ( 5 * Math.pow( n, 2 ) + 4 ),
            b = ( 5 * Math.pow( n, 2 ) - 4 )

        var result = Math.sqrt( a ) % 1 == 0,
            res = Math.sqrt( b ) % 1 == 0;

        if ( result || res == true ) {
            this.notificationHandler.handleMessage( 'FIB' );
            return true
        } else {
            return false;
        }
    }

    public addNumber( n: number ) {
        const isFIB = this.isFibonacci( n );
        let existing = this.staticCollection.find( e => e.number === n );
        if ( !existing ) {
            existing = { number: n, count: 0, isFIB: true };
            this.staticCollection.push( existing );
        }
        //Increment
        existing.count++;
    }

    get collection(): NumericRecord[] {
        return this.staticCollection.sort( ( a, b ) => b.count - a.count );
    }

    public printValues() {
        if ( this.collection.length ) {
            this.notificationHandler.handleMessage( this.collection.reduce<string>( ( p, c, i ) => {
                if ( !p.length ) {
                    return c.number + ':' + c.count;
                } else {
                    return p + ', ' + c.number + ':' + c.count;
                }
            }, '' ) );
        } else {
            this.notificationHandler.handleMessage( 'no values' );
        }
    }

}