
$(function() {
  var searchList = $("#user-search-result");
function appendIndex(index){
  var html =`
<div class="chat-group-user clearfix">
  <p class="chat-group-user__name">${index.name}</p>
  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${index.id} data-user-name=${index.name}>追加</a>
</div>
`
searchList.append(html);
}
function appendNoIndex(index) {
    var html = `
                  <div class='listview__element--right-icon'>${ index }</div>
`
    search_list.append(html);
  }
  function addIndexToGroup(userId, userName) {
    var html = `
  <div class='chat-group-user clearfix '>
  <input name='group[user_ids][]' type='hidden' value='${userId}'>
  <p class='chat-group-user__name'>${userName}</p>
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
    searchList.empty();
     if (indexs.length !== 0) {
       indexs.forEach(function(index){
         appendIndex(index);
       });
     }
     else {
      searchList.empty();
       appendNoIndex("一致するユーザーはいません");
     }
   })
  .fail(function(){
    alert('ユーザーの検索に失敗しました')
  });
});
  searchList.on("click",".user-search-add",function(){
    var userId = $(this).attr("data-user-id");
    var userName = $(this).attr("data-user-name");
addIndexToGroup(userId, userName);
$(this).parent().remove();
  })
  $("#chat-group-users").on("click",".user-search-remove",function(){
$(this).parent().remove();
})
});
