import { parsePhoneNumber, AsYouType } from 'libphonenumber-js';


const parseNumber = (number:string, type:string) =>{
    switch (type){
        case ('international'):
            return parsePhoneNumber(number).formatInternational();
        case ('national'):
            return parsePhoneNumber(number).formatNational();
        default:
           return new AsYouType().input(number)
    }
}
