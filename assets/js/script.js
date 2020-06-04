


if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    $("#menu").addClass("collapse");
} else {
    var s = skrollr.init();
}

function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

function Utils() {

}

Utils.prototype = {
    constructor: Utils,
    isElementInView: function (element, fullyInView) {
        var pageTop = $(window).scrollTop();
        var pageBottom = pageTop + $(window).height();
        var elementTop = $(element).offset().top;
        var elementBottom = elementTop + $(element).height();

        if (fullyInView === true) {
            return ((pageTop < elementTop) && (pageBottom > elementBottom));
        } else {
            return ((elementTop <= pageBottom) && (elementBottom >= pageTop));
        }
    }
};

Utils.prototype.isElementTopInView = function (element, fullyInView) {
    var pageTop = $(window).scrollTop();
    var pageBottom = pageTop + $(window).height();
    var pageMiddle = pageTop + $(window).height() / 2;
    var elementTop = $(element).offset().top;
    var elementBottom = elementTop + $(element).height();

    if (fullyInView === true) {
        return ((pageTop < elementTop) && (pageBottom > elementBottom));
    } else {
        return ((elementTop <= pageMiddle) && (elementBottom >= pageMiddle));
    }
};


var Utils = new Utils();

$(window).scroll(() => {
    if (Utils.isElementTopInView($('#about'), false)) {
        $("#pagename").text("about");
    }
    if (Utils.isElementTopInView($('#portfolio'), false)) {
        $("#pagename").text("portfolio");
    }
    // $("#navtog").addClass('collapsed');
    $("#menu").collapse('hide');
    $("body").click(() => {
        $("#menu").collapse('hide');
    });
});


$("#SetSL").click(() => {
    data = $("input").val();
    window.location.assign(window.location.href.split("?")[0] + "?sl=" + data);
    location.reload();
    // console.log(data);
});

$("#beamlength").on('keyup', function (e) {
    if (e.keyCode === 13) {
        data = $("input").val();
        window.location.assign(window.location.href.split("?")[0] + "?sl=" + data);
        location.reload();
    }
});

wordlist = ['a robotic engineer', 'a creator', 'a designer', 'a thinker', 'a tinkerer', 'a problem solver', 'a envisioner', 'a leader', 'hopeful', 'happy', 'excited', 'exhausted', 'human', 'joyful', 'awesome', 'crazy', 'a cool guy'];



function wordChange() {
    setTimeout(function () { 
        let randomWord = wordlist[Math.floor(Math.random() * wordlist.length)];
        $("#Word").html("Hi! My name is Anmol</br> I am " + randomWord + ".");
        wordChange();
    }, 3000);
}

wordChange();