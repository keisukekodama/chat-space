
$(function() {
  var search_list = $("#user-search-result");
function appendIndex(index){
  var html =`
<div class="chat-group-user clearfix">
  <p class="chat-group-user__name">${index.name}</p>
  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${index.id} data-user-name=${index.name}>追加</a>
</div>
`
search_list.append(html);
}
function appendNoIndex(index) {
    var html = `
                  <div class='listview__element--right-icon'>${ index }</div>
`
    search_list.append(html);
  }
  function addIndexToGroup(user_id, user_name) {
    var html = `
  <div class='chat-group-user clearfix js-chat-member'>
  <input name='group[user_ids][]' type='hidden' value='${user_id}'>
  <p class='chat-group-user__name'>${user_name}</p>
  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
</div>
`
    $("#chat-group-users").append(html);
  }
  $("#iuser-search-field").on("keyup", function(){
    var input = $("#iuser-search-field").val();
    $.ajax({
      type:'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
  .done(function(indexs) {
    search_list.empty();
     if (indexs.length !== 0) {
       indexs.forEach(function(index){
         appendIndex(index);
       });
     }
     else {
      search_list.empty();
       appendNoIndex("一致するユーザーはいません");
     }
   })
  .fail(function(){
    alert('ユーザーの検索に失敗しました')
  });
});
  search_list.on("click",".user-search-add",function(){
    var user_id = $(this).attr("data-user-id");
    var user_name = $(this).attr("data-user-name");
addIndexToGroup(user_id, user_name);
$(this).parent().remove();
  })
  $("#chat-group-users").on("click",".user-search-remove",function(){
$(this).parent().remove();
})
});
