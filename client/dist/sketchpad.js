var editor = Raphael.sketchpad("editor", {
  width: 600,
  height: 600,
  editing: true
});

editor.change(function() {
  console.log('line created')
  $("#data").val(editor.json());
  var sk = $("#data").val();
  console.log('sketchpad: ', editor.json()) 
  console.log(sk);
});

var sketchpadData = $("#data").val(editor.json());


var viewer = Raphael.sketchpad("viewer", {
  width: 600,
  height: 600,
  strokes: '',
  editing: false
});

var sendRequest = function () {
  $.ajax({
    url: '/drawing',
    method: 'POST',
    data: sketchpadData,
    success: function(data) {
      console.log('success!')
      console.log(data['/drawing?data'])
    var viewer = Raphael.sketchpad("viewer", {
      width: 600,
      height: 600,
      strokes: data['/drawing?data'] || [],
      editing: false
    });

    console.log(viewer)
    }
  })
}

$("#save-input").click(function(event) {
  event.preventDefault();
  console.log('clicked!')
  sendRequest();
})