// This is basically on document.ready
$(function() {
  $('#delete-group-btn').click(function(e) {
    var certain = window.confirm('Are you sure');
    if (!certain) {
      return;
    }
    var gid = $(this).attr('group-id');
    console.log(gid);
    $.ajax({
      url: '/group/' + gid,
      method: 'DELETE'
    })
    .done(function(data) { // This is success
      window.location = '/';
    })
    .fail(function(data) { // This is error
      window.alert(data.responseText && data.statusText);
    });
  })

  $('#add-user-btn').click(function(e){
    e.preventDefault();

    var gid = $(this).attr('group-id');
    $.ajax({
      url:'/group/' + gid + '/add',
      type: 'POST',
      data: {email: document.forms["add-user"]["email"].value}
    })
    .done(function(data) {
      $('#user-msg').html("success");
      $('#user-msg').show();
    })
    .fail(function(data) {
      $('#user-msg').show();
    });
  })

  $('#invite-user-btn').click(function(e) {
    var gid = $(this).attr('group-id');

    $.ajax({
      url:'/user/invite',
      type: 'POST',
      data: {email: document.forms["add-user"]["email"].value}
    })
    .done(function(data) {
      alert("success");
    })
    .fail(function(data) {
      alert("fail");
    });
  })
})