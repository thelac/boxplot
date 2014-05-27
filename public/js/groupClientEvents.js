// This is basically on document.ready
$(function() {

  // Delete Group handler =====================================================
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

  // Add User handler =========================================================
  $('#add-user-btn').click(function(e){
    e.preventDefault();

    var user_email = $("#add-user-email").val()
    var failure_html = "User not found! <button class=\"btn btn-xs btn-primary"
      + "\" id=\"invite-user-btn\">Send invite</button>";
    var gid = $(this).attr('group-id');
    $.ajax({
      url:'/group/' + gid + '/add',
      type: 'POST',
      data: {email: user_email}
    })
    .done(function(data) {
      $('#user-msg')
        .addClass("alert-success")
        .html("User added!")
        .show();
    })
    .fail(function(data) {
      $('#user-msg')
        .addClass("alert-danger")
        .html(failure_html)
        .show();

      $('#invite-user-btn').click(function(e) {
        $.ajax({
          url:'/user/invite',
          type: 'POST',
          data: {email: user_email}
        })
        .done(function(data) {
          $('#invite-user-btn').hide();
          $('#user-msg').append(" User invited!");
        })
        .fail(function(data) {
          $('#invite-user-btn').hide();
          $('#user-msg').append(" Can't invite, invalid email!");
        });
      })
    });
  })
})