import { unblockMusic } from '../../src/main/unblockMusic';

export function onRequest(context) {
    return unblockMusic(context.params.id, context.params.data) 
} 

