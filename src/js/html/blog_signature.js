function setSignature() {
  var x = document.getElementById("signature");
  if (x != null) {
    var sig = '<p>' + publication_date + '</p>';
    x.innerHTML = sig;
  }
}