$(function(){
  function buildHTML(message){
    var image = (message.image) ? `<img src="${message.image}">` : `` //これはなに？
    var html =
    `
    <div class="message">
      <div class="chat-main__body--messages-list">
         <div class="chat-main__body--messages-list-name">
            ${message.name}
         </div>
         <div class="chat-main__body--messages-list-time">
            ${message.date}
         </div>
         <div class="chat-main__body--messages-list-body">
           <div class="chat-main__message-body-image">
              ${message.content}
           </div>
              ${image}
         </div>
      </div>
    </div>
    `
    return html;
  }
  $('.new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__body').append(html)
      $('.chat-main__bottom--form--textbox').val('')
      $('.chat-main__body').animate({scrollTop: $('.chat-main__body')[0].scrollHeight}, 'fast');
      $('#hoge').prop('disabled', false);

    })
    .fail(function(data) {
      alert('error');
    })
  })
});
