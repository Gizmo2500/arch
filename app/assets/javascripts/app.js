$(document).ready(function() { 

// ----------- Adds Posts -----------
   $(document).on("click",".image",function(e){
      var x = e.pageX + 'px';
      var y = e.pageY + 'px';
      var name = $('<p class="label label-success" > Camilo </p>'); 
      var div = $('<div class="post ">').css({
         "position": "absolute",
         "left": x,
         "top": y
      });
      console.log(div[0]);
      div.append(name);
      $(document.body).append(div);
   });

// ----------- Delete Posts -----------
   $(document).on("dblclick", ".post",function(){
      var a = confirm("Do you want to delete this post?");
      if (a) {
         this.remove();
      }
   });

// ----------- Delete all Posts -----------
   $(document).on("click", ".delete-com", function(e){
      e.preventDefault();
      $(".post").remove();
   });
   
         
// ----------- Dragg Posts -----------
   var $dragging = null;

    $(document.body).on("mousemove", function(e) {
        if ($dragging) {
            $dragging.offset({
                top: e.pageY,
                left: e.pageX
            });
        }
    });

    $(document.body).on("mousedown", ".post", function (e) {
        $dragging = $(e.target);
    });

    $(document.body).on("mouseup", function (e) {
        $dragging = null;
    });


// ----------- Testing (Passing Rails variables to Javascript) -----------
    var session = $('.sess_information').data('session');
    // alert(a.name);

    $('.save-com').on("click", function (e){
         e.preventDefault();
         var allPosts = $('.post');
         console.log(allPosts);
         $.ajax ({
            url : "/sessions/"+ session.id,
            type : "post",
            data : {data_value: JSON.stringify(allPosts)}
         });
    });
    



 });