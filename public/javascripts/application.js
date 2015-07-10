String.prototype.format = function () {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('\\{' + i + '\\}', 'gi');
        formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
};
var stringMessageFormat = "<b>{0}</b>: {1}"; //0 name , 1 text
var myName = '';
var socket = io.connect('http://localhost:1080', { resource: '/javascripts/socket/socket.io-1.3.5.js' });
socket.on('news', function (data) {
    $('[data-from=server]').append('<p class="text-info">' + data.data + '</p>')
    scrollToBottom($('[data-from=server]'));
});
var submitChat = function (event) {
    if ($('[data-to=text]').val().trim().length) {
        socket.emit('news', { "data": stringMessageFormat.format(myName, $('[data-to=text]').val().trim()) });
        $('[data-from=server]').append('<p class="text-success">' + stringMessageFormat.format("You", $('[data-to=text]').val().trim()) + '</p>')
        $('[data-to=text]').val('');
        scrollToBottom($('[data-from=server]'))
    }
}
$(document).ready(function () {
    $('[data-to=server]').on('click', submitChat);
});

function startChat() {
    myName = $('form.username :text').val().trim();
    $("form.username").fadeOut(200, function () {
        $('h3.header').text("Chat Room (your name: {0})".format(myName));
        $('div.container-chat').fadeIn(100);
    });
}

function scrollToBottom(obj) {
    var objDiv = obj[0];
    objDiv.scrollTop = objDiv.scrollHeight;
    $('[data-to=text]').focus();
}