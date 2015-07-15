$(document).ready(function() { 

// --------------- User from Rails to JS ---------------
    var user = $('.user_info').data('user');
    console.log(user.email);

// ----------- Adds Posts -----------
   $(document).on("click",".image",function(e){
      var x = e.pageX + 'px';
      var y = e.pageY + 'px';
      bootbox.prompt("Add Post", function(message) {                
         if (message !== null && message !== ""){
            // var name = $('<span class="edit" >Type here!</span>');
            var name = $('<p class="label label-success">User: ' + user.email +' Post: ' + message + '</p>'); 
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
      var message1 = $(this).children('p').text();
      var that = this;
      bootbox.dialog({
         message: '<div class="row">  ' +
                    '<div class="col-md-12"> ' +
                    '<form class="form-horizontal"> ' +
                    '<div class="form-group"> ' +
                    '<label class="col-md-2 control-label" for="name">Current Post</label> ' +
                    '<div class="col-md-9"> ' +
                    '<input id="name" name="name" type="text" placeholder="'+ message1+'" class="form-control input-md"> ' +
                    '<span class="help-block">Click on Accept button!</span> </div> ' +
                    '</div> ' +
                    '</div>' +
                    '</form> </div>  </div>',
         title: "Edit this Post",
         buttons: {
           success: {
               label: "Accept",
               className: "btn-success",
               callback: function() {
                  message = $('#name').val();
                  if (message !== null && message !== ""){
                     $(that).children('p').text(message);   
                  } 
               }
            },
            danger: {
               label: "Delete",
               className: "btn-danger",
               callback: function() {
                  that.remove();
               }
            },
            
         }
      });
   });


   // ----------- Delete Posts -----------
   // $(document).on("contextmenu", ".post",function(e){
   //    e.preventDefault();
   //    that = this;
   //    bootbox.confirm("Are you sure you want to delete this post?", function(result) { 
   //       if (result) {
   //          that.remove();
   //       }
   //    });
      
   // });

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


// ----------- Posts (Passing Rails variables to Javascript) -----------
    var session = $('.session_info').data('session');
    var postsRevovered = session.version;
       if (postsRevovered) {
            var test = JSON.parse(postsRevovered);
            for (var f = 0; f < test.length; f++) {
               $(document.body).append(test[f]);
            } 
      } else {
         bootbox.alert("No posts registered", function(message) { 
         });
       }

    
// ----------- Posts (Passing Javascript variables to Rails) -----------
    $(document).on("click",'.save-com', function (e){
         e.preventDefault();
         console.log("Save works");
         var postArray = [];
         var allPosts = document.getElementsByClassName('post');
         for (var i = 0; i < allPosts.length; i++) {
            postArray.push(allPosts[i].outerHTML);
         }
         // var pep = JSON.stringify(postArray);
         console.log("Esto es postArray; ",postArray);
         $.ajax ({
            url : "/sessions/"+ session.id,
            type : "post",
            data : {data_value: JSON.stringify(postArray)}

         });
    });
    
 
 

 });