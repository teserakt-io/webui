export function generateKey(length = 64) {
    let ret = "";
    let randomArray = crypto.getRandomValues(new Uint16Array(length));
    for(let i = 0; ret.length < length; i++) {
        ret += randomArray[i].toString(16);
    }
    return ret.substring(0, length);
}