$(document).ready(function() { 

// ----------- Adds Posts -----------
   $(document).on("click",".image",function(e){
      var x = e.pageX + 'px';
      var y = e.pageY + 'px';
      bootbox.prompt("Please enter your comment?", function(message) {                
         if (message !== null && message !== ""){
            // var name = $('<span class="edit" >Type here!</span>');
            var name = $('<p class="label label-success">' + message + '</p>'); 
            var div = $('<div class="post" >').css({
            "position": "absolute",
            "left": x,
            "top": y
            });
            console.log(div[0]);
            div.append(name);
            $(document.body).append(div);   
         }
      });      
   });

// ----------- Edit Posts -----------
   $(document).on("dblclick", ".post",function(){
      var message = $(this).children('p').text();
      var that = this;
      bootbox.prompt({
         title: "Edit this comment",
         value: message,
         callback: function(message) {
            if (message !== null && message !== ""){
            $(that).children('p').text(message);   
            } 
         }
      });
   });


   // ----------- Delete Posts -----------
   $(document).on("contextmenu", ".post",function(e){
      e.preventDefault();
      that = this;
      bootbox.confirm("Are you sure you want to delete this post?", function(result) { 
         if (result) {
            that.remove();
         }
      });
      
   });

// ----------- Delete all Posts -----------
   $(document).on("click", ".delete-com", function(e){
      e.preventDefault();
      $(".post").remove();
   });
   
  

// ----------- Dragg Posts -----------
   var $dragging = null;

    $(document).on("mousemove", function(e) {
        if ($dragging) {
            $dragging.offset({
                top: e.pageY,
                left: e.pageX
            });
        }
    });

    $(document).on("mousedown", ".post", function (e) {
        e.preventDefault();
        $dragging = $(e.target);  
        
    });

    $(document).on("mouseup", function (e) {
         e.preventDefault();
        $dragging = null;
    });


// ----------- Testing (Passing Rails variables to Javascript) -----------
    var session = $('.sess_information').data('session');
    // alert(a.name);

    $(document).on("click",'.save-com', function (e){
         e.preventDefault();
         var allPosts = $('.post');
         console.log(allPosts);
         $.ajax ({
            url : "/sessions/"+ session.id,
            type : "post",
            data : {data_value: JSON.stringify(allPosts)}
         });
    });
    
    // test------------------------------

    // setting defaults for the editable
// $.fn.editable.defaults.mode = 'inline';
// $.fn.editable.defaults.emptytext = 'Empty';
// $.fn.editable.defaults.type = 'textarea';

// $('.edit').editable({
//         url: '/post',
//         title: 'Enter comments',
//         rows: 4,
//         inputclass: "input-large"
//     });
 

 });