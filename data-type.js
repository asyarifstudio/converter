

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
    if(isHexadecimalValid(value,false)){
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




