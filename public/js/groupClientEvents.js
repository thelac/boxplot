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
})
