$("#btn-decode-tlv").click(function (e) {
    e.preventDefault();
    var value = $("#input-tlv").val().trim();
    if (isHexadecimalValid(value, true) && value.length >= 6) {
        var root = decodeTlv(value)

        console.log(root.toString());
        $("#output-tlv").val(root.toString());

    }
    else {
        $("#output-tlv").val("Invalid Hexadecimal value or length");
    }

});


const TAG_CLASS_MASK = 192;//11000000
const TAG_CLASS = {
    TAG_CLASS_UNIVERSAL: 0,
    TAG_CLASS_APPLICATION: 1,
    TAG_CLASS_CONTEXT: 2,
    TAG_CLASS_PRIVATE: 3
}

const TAG_TYPE_MASK = 32;//00100000
const TAG_TYPE = {
    TAG_TYPE_PRIMITIVE: 0,
    TAG_TYPE_CONSTRUCTED: 1,

}

const TAG_NUMBER_MASK = 31;//00011111
const TAG_NUMBER = {
    TAG_NUMBER_SEQUENCE: 6
}

function tlv() {

    this.tag = ""
    this.length = ""
    this.value = undefined;
    this.next = undefined;
    this.intLength = 0;
    this.toString = (index) => {
        index = index ? index : 0;
        var spacing = "";
        for (var i = 0; i < index; i++) {
            spacing = spacing + "      ";
        }
        var result = spacing + this.tag + " " + this.length
        //console.log(index,spacing)
        if (getTagType(this.tag) == TAG_TYPE.TAG_TYPE_PRIMITIVE) {
            result = result + " " + this.value;
        }
        else {
            result = result + "\n" + this.value.toString(index + 1);

        }
        if (this.next) {
            result = result + "\n" + this.next.toString(index);
        }
        return result;
    }

}

function getTagClass(tag) {
    return (parseInt(tag, 16) & TAG_CLASS_MASK) >> 6;
}

function getTagType(tag) {
    return (parseInt(tag, 16) & TAG_TYPE_MASK) >> 5;
}

function getTagNumber(tag) {
    return (parseInt(tag, 16) & TAG_NUMBER_MASK);
}

function decodeTlv(tlvString) {
    var tag, length, intLength;
    var root, current;
    var remaining;
    //first get the tag
    tag = tlvString.substr(0, 2);
    //get the length
    length = tlvString.substr(2, 2);
    if (length.substr(0, 1) == "8") {
        length = substr(2, parseInt(length.substr(1, 1) * 2 + 2))
        intLength = parseInt(intLength.substr(2));
    }
    else {
        intLength = parseInt(length,16);
    }


    remaining = tlvString.substr(tag.length + length.length + intLength * 2);
    tlvString = tlvString.substr(tag.length + length.length, intLength * 2);

    root = new tlv();
    root.tag = tag;
    root.length = length;
    root.intLength = intLength;
    current = root;

    if (getTagType(current.tag) == TAG_TYPE.TAG_TYPE_PRIMITIVE) {
        current.value = tlvString;
    }
    else {
        current.value = decodeTlv(tlvString);
    }

    while (remaining.length > 0) {
        //get the length
        length = remaining.substr(2, 2);
        if (length.substr(0, 1) == "8") {
            length = substr(2, parseInt(length.substr(1, 1) * 2 + 2))
            intLength = parseInt(intLength.substr(2));
        }
        else {
            intLength = parseInt(length);
        }

        tlvString = remaining.substr(0, 2 + length.length + intLength * 2);
        remaining = remaining.substr(tlvString.length);

        current.next = decodeTlv(tlvString);
        current = current.next;

    }

    return root;

}