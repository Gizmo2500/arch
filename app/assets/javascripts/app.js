$(document).ready(function() { 

   $(".test").on("click", function (){
      alert("Yes");
   });


   $(".image").click(function(e){
      var x = e.pageX + 'px';
      var y = e.pageY + 'px';
      var img = $('<img src="" alt="Camilo" />');
      var div = $('<div class="post">').css({
         "position": "absolute",
         "left": x,
         "top": y
      });
      console.log(div[0]);
      div.append(img);
      $(document.body).append(div);
   });

   $('body').on("click", ".post",function(){
      var a = confirm("Do you want to delete this post?");
      if (a) {
         this.remove();
      }
   });

   
      

   











 });