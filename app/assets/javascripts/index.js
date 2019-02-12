$(function(){
  function buildHTML(message){
   var image = '';
    if (message.image){
image = `<img src="${ message.image }">`;
    }
    var html =
    `
    <div class="message" data-message-id="${message.id}" >
      <div class="chat-main__body--messages-list" >
        <div class="chat-main__body--messages-list-name">
          ${message.user_name}
        </div>
        <div class="chat-main__body--messages-list-time">
          ${message.date}
        </div>
        <div class="chat-main__body--messages-list-body">
          <div class="chat-main__message-body-content">
            ${message.content}
          </div>
            <div>
              ${image}
            </div>
        </div>
      </div>
    </div>
    `
    return html;
  }
  var interval = setInterval(function(){
    // console.log("自動更新")
    if(window.location.href.match(/\/groups\/\d+\/messages/)){
      var messageId = $('.message:last').data('message-id') || 0

      $.ajax({
        url: location.href,
        type: 'GET',
        data: {
          id: messageId
        },
        dataType: 'json',
      })
      .done(function(data) {
        // console.log("自動更新done")
        if (data.length > 0){
        var addHtml ='';
        data.forEach(function(message){
          addHtml += buildHTML(message);
        });
        $('.chat-main__body').append(addHtml)
        $('.chat-main__body').animate({scrollTop: $('.chat-main__body')[0].scrollHeight}, 'slow');
      }
       })
      .fail(function() {
        alert('自動更新error')
      });
    } else {
      clearInterval(interval);
    }},5000);
});
