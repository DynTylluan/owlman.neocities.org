/*
 * Copyright (c) 2010, 2012 Gregor Richards
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY
 * SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION
 * OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN
 * CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * From http://websplat.bitbucket.org/
 */

var WebSplatPony = "aj";

(function() {
    if ("WebSplat" in window) return;
    window.WebSplat = {};

    var ponyIDs = ["ts", "rd", "aj", "pp", "r", "fs"];
    var imageBase = "http://websplat.bitbucket.org/imgs/";
    var head;

    function dce(type) {
        return document.createElement(type);
    }

    // a "window" for output
    var wpMsgOut = window.wpMsgOut = dce("div");
    wpMsgOut.style.position = "fixed";
    wpMsgOut.style.left = "0px";
    wpMsgOut.style.top = "0px";
    wpMsgOut.style.width = "100%";
    wpMsgOut.style.zIndex = "1000000";
    wpMsgOut.style.visibility = "hidden";
    wpMsgOut.style.backgroundColor = "white";
    wpMsgOut.style.color = "black";
    wpMsgOut.style.textAlign = "center";
    wpMsgOut.style.borderBottom = "1px solid black";
    wpMsgOut.wpIgnore = true;
    document.body.appendChild(wpMsgOut);

    function displayMessage(str) {
        if (typeof(str) === "undefined") str = "";
        if (typeof(str) === "string") {
            if (str === "") {
                wpMsgOut.style.visibility = "hidden";
            } else {
                wpMsgOut.style.visibility = "visible";
            }
            wpMsgOut.innerHTML = str;
        } else {
            wpMsgOut.style.visibility = "visible";
            wpMsgOut.innerHTML = "";
            wpMsgOut.appendChild(str);
        }
    }
    window.wpDisplayMessage = displayMessage;

    function scriptChain(srcs) {
        srcs = srcs.slice(0);
        var src = srcs.shift();

        var script = dce("script");
        if (src.match(/\/\//)) {
            script.src = src;
        } else {
            script.src = "http://websplat.bitbucket.org/websplat/" + src;
        }
        head.appendChild(script);

        if (srcs.length > 0) {
            var loaded = false;
            script.onload = function() {
                if (!loaded) {
                    loaded = true;
                    scriptChain(srcs);
                }
            };
            script.onreadystatechange = function() {
                if (this.readyState === "loaded" ||
                    this.readyState === "complete") {
                    this.onload();
                }
            };
        }
    }

    // the actual loader function, closing over character for easy onclick
    function loader(pony) { return function() {
        WebSplatPony = pony;
        head = document.getElementsByTagName("head")[0];
        selector.style.display = "none";

        displayMessage("<img src=\"" + imageBase + pony + ".ranimr.gif\" />" +
                       "Loading..." +
                       "<img src=\"" + imageBase + pony + ".raniml.gif\" />");
        scriptChain([
            "http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js",
            "websplat.js",
            "websplat-stats.js",
            "websplat-points.js",
            "websplat-apples.js",
            "websplat-health.js",
            "websplat-cmc.js",
            "websplat-" + pony + ".js",
            "websplat-baddy.js",
            "websplat-diamonddog.js",
            "go.js"
        ]);
    }; }

    // make a frame to offer selections in
    var selector = dce("div");
    selector.style.backgroundColor = "white";
    selector.style.color = "black";
    selector.style.textAlign = "center";
    selector.style.borderBottom = "1px solid black";
    selector.style.paddingBottom = "1em";
    displayMessage(selector);

    // adverts and such
    var ad = dce("span");
    ad.style.fontSize = "0.85em";
    ad.style.color = "#02a";
    ad.style.position = "fixed";
    ad.style.top = "0.5em";
    ad.style.right = "0.5em";
    var link = dce("a");
    link.href = "http://websplat.bitbucket.org/";
    link.innerHTML = "Brought to you by WebSplat";
    ad.appendChild(link);

    // addthis if we're not interfering
    if (!((window._atc||{}).ver)) {
        ad.appendChild(dce("br"));
        var addthis = dce("span");
        addthis.style.float = "right";
        addthis.innerHTML = '<a class="addthis_button" href="http://www.addthis.com/bookmark.php?v=250&amp;pubid=ra-5006d2d9326df97c"><img src="http://s7.addthis.com/static/btn/v2/lg-share-en.gif" width="125" height="16" alt="Bookmark and Share" style="border:0"/></a>';
        ad.appendChild(addthis);
        window.addthis_config={"url":"http://websplat.bitbucket.org/","title":"Ponies in your Interwebs"};
        var scr = dce("script");
        scr.src="http://s7.addthis.com/js/250/addthis_widget.js#pubid=ra-5006d2d9326df97c";
        ad.appendChild(scr);
    }

    selector.appendChild(ad);

    // a header to say what's going on
    var hdr = dce("div");
    var himg = dce("img");
    himg.src = imageBase + "choosethyhero.png";
    hdr.appendChild(himg);
    selector.appendChild(hdr);

    // then offer the selections!
    for (var i = 0; i < ponyIDs.length; i++) {
        var pony = ponyIDs[i];
        var dir = (i >= ponyIDs.length / 2) ? "l" : "r";

        var but = dce("button");
        but.style.width = "68px";
        but.style.height = "62px";
        but.style.backgroundColor = "#ffffff";
        but.style.margin = "0px";
        but.style.padding = "0px";
        var bimg = dce("img");
        bimg.src = imageBase + pony + ".ranim" + dir + ".gif";
        but.appendChild(bimg);
        but.onclick = loader(pony);
        selector.appendChild(but);
        selector.appendChild(document.createTextNode(" "));
        if (i == 0) but.focus();
    }

    // what's this? EASTER EGGS???
    himg.onclick = loader("dh");
})();