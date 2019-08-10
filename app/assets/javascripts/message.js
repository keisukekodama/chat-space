$(document).on('turbolinks:load', function() {
$(function(){
  function buildHTML(message){
    // console.log(message)
    var image = '';if (message.image){image = `<img src="${ message.image }">`;}
    // var message_image = message.image ? message.image : ""
    // <img class: 'lower-message__image' src='${message_image}'>これを代入。
    var html =
    `
    <div class="message"  data-message-id="${message.id}">
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
  $('.new_message').on('submit', function(e){
    // console.log("非同期")
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action') //グループごとにurlが違うのでページのアクションを取得している
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      // console.log(data)
      // console.log("非同期done")
      //if (data.length !==0){}で
      var html = buildHTML(data);
      $('.chat-main__body').append(html)
      $('.chat-main__bottom--form--textbox,#message_image').val('')
      $('.chat-main__body').animate({scrollTop: $('.chat-main__body')[0].scrollHeight}, 'fast');
    })
    .fail(function() {
      alert('送信errorです');
    })
    .always(function () {
    $('#send').removeAttr("disabled");
    })
  })
})
});
