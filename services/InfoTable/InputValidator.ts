import { Info } from './Model'


export class MissingFieldError extends Error {}

export function validateAsSpaceEntry(arg: any){
    if(!(arg as Info).name){
        throw new MissingFieldError('Value for name required!')
    }
    // if(!(arg as Info).location){
    //     throw new MissingFieldError('Value for location required!')
    // }
    // if(!(arg as Info).id){
    //     throw new MissingFieldError('Value for id required!')
    // }
}