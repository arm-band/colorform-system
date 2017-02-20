$(function() {
    //ページトップへ戻る
    pageTop();

    //10進を16進に
    $("#btn-dec_2_hex").on("click", function() {
        dec_2_hex();
    });

    //16進を10進に
    $("#btn-hex_2_dec").on("click", function() {
        hex_2_dec();
    });
});

/* ====================================== *
 *                                        *
 * 共通                                    *
 *                                        *
 * ====================================== */
//ページトップへ戻る
function pageTop() {
    var returnPageTop = $(".returnPageTop");

	//下にスクロールしたらヘッダの高さを縮小させる
	var startPos = 0;
	$(window).on("scroll", function(){
		var currentPos = $(this).scrollTop();
		//ページトップへスクロールして戻る
		if (currentPos > 400) {
			returnPageTop.fadeIn();
		} else {
			returnPageTop.fadeOut();
		}
	});

	//ページトップへスクロールして戻る
	returnPageTop.on("click", function () {
		$("body, html").animate({ scrollTop: 0 }, 1000, "swing");
		return false;
	});
}

/* ====================================== *
 *                                        *
 * 10進→16進                               *
 *                                        *
 * ====================================== */
//10進を16進に
function dec_2_hex() {
    var val = $("#form_dec").val();

    if(decCheck(val)) {
        convertD2H(val);
    }
}
/* ====================================== *
 *                                        *
 * 10進→16進（チェック）                     *
 *                                        *
 * ====================================== */
//10進チェック
function decCheck(val) {
    var msg = "";

    //値
    if(!val) { //取得値がnull,undifined,NaN,false,0,-0,""(空文字列)の場合はエラーメッセージに追加(可能性としてあるのはundefinedと空文字列)
        msg += "<li><i class=\"fa fa-li fa-exclamation-circle\" aria-hiden=\"true\"></i>色の値がセットされていません。</li>\n";
    }
    else {
        if(!decValCheck(val)) {
            msg += "<li><i class=\"fa fa-li fa-exclamation-circle\" aria-hiden=\"true\"></i>色の値が不正です。</li>\n";
        }
    }

    //エラーがある（メッセージにダンプされた）場合、エラー表示してfalseを返す
    if(msg.length > 0) {
        //リセット
        $("#table_hex_r").val("");
        $("#table_hex_g").val("");
        $("#table_hex_b").val("");
        $("#table_hex_rd").val("");
        $("#table_hex_gd").val("");
        $("#table_hex_bd").val("");
        $("#palette-d2h").css({"background-color": "#ffffff"});

        //エラー表示
        var $errorModalBody = $("#errorModalBody");
        var errMsg = "<h3>10進数→16進数変換エラー</h3>" + "<ul class=\"fa-ul\">" + msg + "</ul>";
        $errorModalBody.html(errMsg);
        $("#errorModal").modal();
        return false;
    }
    return true;
}

//10進、32bit符号あり倍長整数型の範囲でなければfalse
function decValCheck(str) {
    var flag = true;
    if(!str.match(/^[0-9]{1,10}|^\-[0-9]{1,10}$/)) {
        flag = false;
    }
    else {
        var num = parseInt(str, 10);
        if(num > 2147483647 || num < -2147483648) {
            flag = false;
        }
    }
    return flag;
}
/* ====================================== *
 *                                        *
 * 10進→16進（変換処理）                     *
 *                                        *
 * ====================================== */
//10→16進数変換
function convertD2H(val) {
    //計算
    var c = parseInt(val, 10);
    var a = 255*256*256*256;
//console.log(c);
//    if(c < 0) { //負の値ならば
        c = ~ c; //ビット反転
//    }
    c = ~ c;
    c = c + a;

//console.log(c);
    var hexColor = c.toString(16);
//console.log(hexColor);
    var hcLen = hexColor.length;
    if(hcLen < 8) { //0埋め
        for(i = hcLen; i < 8; i++) {
            hexColor = "0" + hexColor;
        }
    }
//console.log(hexColor);

    var decR = hexColor.substr(6, 2);
    var decG = hexColor.substr(4, 2);
    var decB = hexColor.substr(2, 2);
    //表示
    $("#table_hex_b").val(decB);
    $("#table_hex_g").val(decG);
    $("#table_hex_r").val(decR);
    $("#table_hex_bd").val(parseInt(decB, 16));
    $("#table_hex_gd").val(parseInt(decG, 16));
    $("#table_hex_rd").val(parseInt(decR, 16));
    $("#palette-d2h").css({ "background-color": "#" + decR + decG + decB });
}
/* ====================================== *
 *                                        *
 * 16進→10進                               *
 *                                        *
 * ====================================== */
//16進を10進に
function hex_2_dec() {
    var valR = $("#form_hex_r").val();
    var valG = $("#form_hex_g").val();
    var valB = $("#form_hex_b").val();

    if(hexCheck(valR, valG, valB)) {
        convertH2D(valR, valG, valB);
    }
}
/* ====================================== *
 *                                        *
 * 16進→10進（チェック）                     *
 *                                        *
 * ====================================== */
//16進チェック
function hexCheck(valR, valG, valB) {
    var msg = "";

    //赤
    if(!valR) { //取得値がnull,undifined,NaN,false,0,-0,""(空文字列)の場合はエラーメッセージに追加(可能性としてあるのはundefinedと空文字列)
        msg += "<li><i class=\"fa fa-li fa-exclamation-circle\" aria-hiden=\"true\"></i>Rの値がセットされていません。</li>\n";
    }
    else {
        if(!hexValCheck(valR)) {
            msg += "<li><i class=\"fa fa-li fa-exclamation-circle\" aria-hiden=\"true\"></i>Rの値が不正です。</li>\n";
        }
    }
    //緑
    if(!valG) { //取得値がnull,undifined,NaN,false,0,-0,""(空文字列)の場合はエラーメッセージに追加(可能性としてあるのはundefinedと空文字列)
        msg += "<li><i class=\"fa fa-li fa-exclamation-circle\" aria-hiden=\"true\"></i>Gの値がセットされていません。</li>\n";
    }
    else {
        if(!hexValCheck(valG)) {
            msg += "<li><i class=\"fa fa-li fa-exclamation-circle\" aria-hiden=\"true\"></i>Gの値が不正です。</li>\n";
        }
    }
    //青
    if(!valB) { //取得値がnull,undifined,NaN,false,0,-0,""(空文字列)の場合はエラーメッセージに追加(可能性としてあるのはundefinedと空文字列)
        msg += "<li><i class=\"fa fa-li fa-exclamation-circle\" aria-hiden=\"true\"></i>Bの値がセットされていません。</li>\n";
    }
    else {
        if(!hexValCheck(valB)) {
            msg += "<li><i class=\"fa fa-li fa-exclamation-circle\" aria-hiden=\"true\"></i>Bの値が不正です。</li>\n";
        }
    }

    //エラーがある（メッセージにダンプされた）場合、エラー表示してfalseを返す
    if(msg.length > 0) {
        //リセット
        $("#table_dec_c").val("");
        $("#palette-h2d").css({"background-color": "#ffffff"});

        //エラー表示
        var $errorModalBody = $("#errorModalBody");
        var errMsg = "<h3>16進数→10進数変換エラー</h3>" + "<ul class=\"fa-ul\">" + msg + "</ul>";
        $errorModalBody.html(errMsg);
        $("#errorModal").modal();
        return false;
    }
    return true;
}

//16進2桁でなければfalse
function hexValCheck(str) {
    var flag = true;
    if(!str.match(/^[a-fA-F0-9]{2}$/)) {
        flag = false;
    }
    return flag;
}
/* ====================================== *
 *                                        *
 * 16進→10進（変換処理）                     *
 *                                        *
 * ====================================== */
//16→10進数変換
function convertH2D(valR, valG, valB) {
    //計算
    var r = parseInt(valR, 16);
    var g = parseInt(valG, 16)*256;
    var b = parseInt(valB, 16)*256*256;

    var a = 255*256*256*256; //32bit符号あり倍長整数型の桁合わせのための数字

    var color = r + g + b + a;

    if(color > 2147483647 || color < -2147483648) { //32bit符号あり倍長整数型の桁あふれした場合はビット反転を行って、32bit符号あり倍長整数型の範囲内に収める。というか、 255*256*256*256 = FF000000 なので最上位ビットが1になっている時点で確実に桁あふれする。
        color = ~ color;
    }
    color = ~ color;

    //表示
    $("#table_dec_c").val(color);
//console.log("#" + valR + valG + valB);
    $("#palette-h2d").css({ "background-color": "#" + valR + valG + valB });
}