function setFooter() {
  var x = document.getElementById("content_footer");
  if (x != null) {
    var html = '\
    <div id="footer_wrap" class="outer">\
      <footer class="inner container">\
        <section class="clearfix">\
          <h3>\
            Client Side Encryption and Decryption\
          </h3>\
        </section>\
      </footer>\
    </div>';
    x.innerHTML = html;
  }
}