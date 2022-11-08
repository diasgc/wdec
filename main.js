function encSelect(sel){
    document.getElementById('str-title').innerHTML = sel.options[sel.selectedIndex].text;
}

function encode(encoder, a) {
    //console.log("Encoder:",encoder,"string:",a);
    switch(encoder) {
        case '1':
            var b, c, d, e, f, g, h, i, j, k;
            for (!/[^\x00-\xFF]/.test(a), b = "\x00\x00\x00\x00".slice(a.length % 4 || 4), a += b, 
            c = [], d = 0, e = a.length; e > d; d += 4) f = (a.charCodeAt(d) << 24) + (a.charCodeAt(d + 1) << 16) + (a.charCodeAt(d + 2) << 8) + a.charCodeAt(d + 3), 
            0 !== f ? (k = f % 85, f = (f - k) / 85, j = f % 85, f = (f - j) / 85, i = f % 85, 
            f = (f - i) / 85, h = f % 85, f = (f - h) / 85, g = f % 85, c.push(g + 33, h + 33, i + 33, j + 33, k + 33)) :c.push(122);
            return function(a, b) {
                for (var c = b; c > 0; c--) a.pop();
            }(c, b.length), String.fromCharCode.apply(String, c);
        case '2':
            return btoa(a);
        case '3':
            var hex;
            var result = "";
            for (var i = 0; i < a.length; i++) {
                hex = a.charCodeAt(i).toString(16);
                result += ("0"+hex).slice(-2);
            }
            return result;
        default:
            return a;
    }
}

function decode(encoder, a) {
    //console.log("Decoder:",encoder,"string:",a);
    switch(encoder) {
        case '1':
            if (!a.startsWith("<~"))
                a="<~"+a;
            if (!a.endsWith("~>"))
                a+="~>";
            var c, d, e, f, g, h = String, l = "length", w = 255, x = "charCodeAt", y = "slice", z = "replace";
            for ("<~" === a[y](0, 2) && "~>" === a[y](-2), a = a[y](2, -2)[z](/\s/g, "")[z]("z", "!!!!!"), 
            c = "uuuuu"[y](a[l] % 5 || 5), a += c, e = [], f = 0, g = a[l]; g > f; f += 5) d = 52200625 * (a[x](f) - 33) + 614125 * (a[x](f + 1) - 33) + 7225 * (a[x](f + 2) - 33) + 85 * (a[x](f + 3) - 33) + (a[x](f + 4) - 33), 
            e.push(w & d >> 24, w & d >> 16, w & d >> 8, w & d);
            return function(a, b) {
                for (var c = b; c > 0; c--) a.pop();
            }(e, c[l]), h.fromCharCode.apply(h, e);
        case '2':
            return atoa(a);
        case '3':
            var hex = a.match(/.{1,2}/g) || [];
            var back = "";
            for(var j = 0; j < hex.length; j++) {
                back += String.fromCharCode(parseInt(hex[j], 16));
            }
            return back;
        default:
            return a;
    }
}

function strEncode(infield,outfield){
    let instr = document.getElementById(infield).value;
    let encoder = document.getElementById('strEncoder').value;
    document.getElementById(outfield).value = encode(encoder,instr);
    //qrc.makeCode(encoded); 
}

function strDecode(outfield,infield){
    let outstr = document.getElementById(outputfield).value;
    let sel =document.getElementById('strEncoder');
    let encoder = sel.options[sel.selectedIndex].value;
    document.getElementById(inputfield).value = decode(encoder,outstr);
}

function strInput(infield,outfield,in_chars,out_chars){
    let i  = document.getElementById(infield);
    let o  = document.getElementById(outfield);
    let sel =document.getElementById('strEncoder');
    let encoder = sel.options[sel.selectedIndex].value;
    document.getElementById(in_chars).innerHTML = i.value.length + " chars";
    let instr = i.value;
    var encoded = encode(encoder,instr);
    o.value = encoded;
    document.getElementById(out_chars).innerHTML = encoded.length + " chars";
}

function gcd(a, b){
    return (b == 0) ? a : gcd(b, a % b);
}

function gcd(...args){
    let r = args[0];
    var i = 0;
    while(i < args.length - 1)
        r = gcd(r,args[++i]);
    return r;
}

function lcm(a, b){
    return a * b / gcd(a,b);
}

function lcm(...args){
    let r = args[0];
    var i = 0;
    while(i < args.length - 1)
        r = lcm(r,args[++i]);
    return r;
}