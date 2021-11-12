function isBinaryValid(value){
    return value.match("^[0-1]+$") != null;
}

function isHexadecimalValid(value,multipleOf2){
    var regex = multipleOf2?"^([a-f,A-F,0-9]{2})+$":"^[a-f,A-F,0-9]+$"
    return value.match(regex) !=null;
}

function isDecimalValid(value){
    return value.match("^[0-9]+$") != null;
}


function bin2Hex(value){
    var result = "";
    for(var i=0;i<value.length;i+=4){
        result = result + parseInt(value.substr(i,4),2).toString(16).toUpperCase();
    }
    return result;
}

function bin2Dec(value){
    return parseInt(value,2).toString();
}

function hex2bin(value){
    var result = "";
    for(var i=0;i<value.length;i+=2){
        result = result + parseInt(value.substr(i,2),16).toString(2).toUpperCase();
    }
    return result;
}

function hex2dec(value){
    return parseInt(value,16).toString();
}

function dec2bin(value){
    return parseInt(value).toString(2);
}

function dec2hex(value){
    return parseInt(value).toString(16).toUpperCase();
}