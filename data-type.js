

$("#btn-convert-bin").click(function (e) { 
    e.preventDefault();
    var value = $("#input-bin").val().trim();
    
    if(isBinaryValid(value)){
        if(value.length >=4 && value.length % 4 == 0){
            $("#input-hex").val(bin2Hex(value));
        }
        else{
            $("#input-hex").val("length must be multiple of 4");
        }


        $("#input-dec").val(bin2Dec(value));
    }
    else{
        $("#input-hex").val("undefined or wrong input");
        $("#input-dec").val("undefined or wrong input");
    }

});

$("#btn-convert-hex").click(function (e) { 
    e.preventDefault();
    var value = $("#input-hex").val();
    if(isHexadecimalValid(value)){
        $("#input-bin").val(hex2bin(value));
        $("#input-dec").val(hex2dec(value));
    
    }
    else{
        $("#input-bin").val("undefined or wrong input");
        $("#input-dec").val("undefined or wrong input");
    }

});

$("#btn-convert-dec").click(function (e) { 
    e.preventDefault();
    var value = $("#input-dec").val();
    if(isDecimalValid(value)){
        $("#input-bin").val(dec2bin(value));
        $("#input-hex").val(dec2hex(value));
    } else{
        $("#input-bin").val("undefined or wrong input");
        $("#input-hex").val("undefined or wrong input");
    }
});



function isBinaryValid(value){
    return value.match("^[0-1]+$") != null;
}

function isHexadecimalValid(value){
    return value.match("^([a-f,A-F,0-9]{2})+$") !=null;
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
        result = result + parseInt(value.substr(i,8),16).toString(2).toUpperCase();
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
