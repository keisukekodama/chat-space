$(function() {

var search_list = $("#user-search-result");
var add_users = []


function appendUser(user) {
var html = `<div class="chat-group-user clearfix">
<p class="chat-group-user__name">"${ user.name }"</p>
<a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name=>追加</a>
</div>`

search_list.append(html);
add_users.push( {name: user.name, id: user.id} );

}

function appendNoUserToHTML(no_user) {
var html = `<div class="chat-group-user clearfix">${no_user}

</div>`
search_list.append(html);
}

function appendAddUser(user) {
var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
<input name='group[user_ids][]' type='hidden' value='${val.id}>
<p class='chat-group-user__name'>va.name</p>
<a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
</div>`

search_list.append(html);
}

$("#user-search-field").on("keyup", function() {
var input = $("#user-search-field").val();
$.ajax({
url: '/users',
type: 'GET',
data: { keyword: input },
dataType: 'json'
})

.done(function(users) {
$("#user-search-result").empty();
if (users.length !== 0) {
users.forEach(function(user) {
appendUser(user);
});
}
else {
appendNoUserToHTML("一致するユーザーは見つかりません");
}
})
.fail(function() {
alert('検索に失敗しました');

})
});
search_list.on('click', '.user-search-add', function() {
console.log(1);
$.each(add_users,
function(index, val) {
appendAddUser(user);

});
});
});
