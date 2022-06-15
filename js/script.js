const PageWait = {
    count: 0,
    init: function() {
        setInterval(function() {
            ++PageWait.count;
            PageWait.count %= 3;
            let str = "Please wait";
            for (let i = 0; i <= PageWait.count; ++i)
                str += '.';
            $("#page-wait-text").text(str);
        }, 500);
    },
    show: function() {
        $("#page-wait").css("display", "flex");
    },
    hide: function() {
        setTimeout(function() {
            $("#page-wait").css("display", "none");
        }, 250);
    }
};
PageWait.init();
