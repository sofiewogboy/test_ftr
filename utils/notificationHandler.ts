export class NotificationHandler {
    
    private handler: ( value ) => any; 

    constructor ( handler?: ( value ) => any ) {
        if ( !handler ) {
            this.handler = ( value ) => console.info( value );
        }
    }
    
    public handleMessage( value: string ) {
        this.handler( value );
    }
}