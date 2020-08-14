function setFooter() {
  var x = document.getElementById("content_footer");
  if (x != null) {
    var html = '\
    <div id="footer_wrap" class="outer">\
      <footer class="inner">\
        <section class="clearfix">\
          <p>\
            Client Side Encryption and Decryption\
          </p>\
        </section>\
      </footer>\
    </div>';
    x.innerHTML = html;
  }
}