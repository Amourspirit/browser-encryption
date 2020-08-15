function setSorceCodeLink() {
  var x = document.getElementById("source_code");
  if (x != null) {
    var html = '<a href="@@[source]" target="_blank">View Source Code</a>';
    x.innerHTML = html;
  }
}