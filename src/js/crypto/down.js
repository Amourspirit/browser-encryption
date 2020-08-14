function doDL(){
    var s = document.getElementById('chipher').value;
    function dataUrl(data) {return "data:x-application/text," + escape(data);}
    window.open(dataUrl(s));
}