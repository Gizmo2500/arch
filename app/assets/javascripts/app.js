$(document).ready(function() { 
 

//  test
//Github: https://github.com/mcnitt/simple-jquery-drawing-app

// var color = $(".selected").css("background-color");
// var $canvas = $("canvas");
// //Select the first, only canvas element. Select the actual HTML element using the array syntax [index], get the 2d context.
// var context = $canvas[0].getContext("2d");
// var lastEvent;
// var mouseDown = false;

// //When clicking control list items
// $(".controls").on("click", "li", function() {
//     //deselect sibling elements
//     $(this).siblings().removeClass("selected");
//     //select clicked element
//     $(this).addClass("selected");
//     //cache current color here
//     color = $(".selected").css("background-color");
//     console.log("selected color = " + color);
// });

// //When "New Color" is pressed
// $("#revealColorSelect").click(function() {
//     //show or hide color select
//     changeColor();
//     $("#colorSelect").toggle();
// });

// //update the new color span
// function changeColor() {
//     var r = $("#red").val();
//     var g = $("#green").val();
//     var b = $("#blue").val();
//     var a = $("#alpha").val() / 100;

//     $("#newColor").css("background-color", "rgba(" + r + "," + g + "," + b + "," + a + ")");
//     console.log($("#newColor").css("background-color"));

// }

// //When color sliders change
// $("input").change(changeColor);

// //When "Add Color" is pressed
// $("#addNewColor").click(function() {
//     //append the color to the controls ul
//     var $newColor = $("<li></li>");
//     $newColor.css("background-color", $("#newColor").css("background-color"));
//     $(".controls ul").append($newColor);
//     //select the new color
//     $newColor.click();
// });

// //On mouse events on the canvas
// $canvas.mousedown(function(e) {
//     lastEvent = e;
//     mouseDown = true;

// }).mousemove(function(e) {
//     if (mouseDown) {
//         //Draw lines
//         context.beginPath();
//         context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
//         context.lineTo(e.offsetX, e.offsetY);
//         context.strokeStyle = color;
//         context.stroke();
//         lastEvent = e;
//     }
// }).mouseup(function() {
//     mouseDown = false;
// }).mouseleave(function() {
//     $canvas.mouseup();
// });

//--------------

$(document).on("click", '.open', function(){


  // location.reload();

  console.log("Cami");
});

//-------------------------Add Markups-------------------------
$('.pencil').on("click", function(e){
  $('.col-md-10').prepend('<div class="draggable resizable"><div id="field2" contentEditable="true">Text here..</div></div>');
  $(".resizable").resizable();
    
  $('#field2').dblclick(function (e) {
      e.stopPropagation();
      $(this).focus();
  });   

  $(".draggable").draggable({
      drag: function (event, ui) {
          ui.helper.children('#field2').blur();
      }
  });

});



// ----------- Posts - User - Session (Passing Rails variables to Javascript) -----------
    var user = $('.session_info').data('user');
    var session = $('.session_info').data('session');
    var posts = $('.session_info').data('posts'); 
    var lastPost = $('.session_info').data('lastpost');
    // console.log("user: ", user);
    if (posts && posts.length > 0) {
         for (var i = 0; i < posts.length; i++) {
            displayPost(posts[i]);
         } 
    }    

    
// ----------- Adds Posts -----------
   $(document).on("click",".image",function(e){
      var x = e.pageX + 'px';
      var y = e.pageY + 'px';
      // bootbox.prompt("Add Post", function(message) {                
      //    if (message !== null && message !== ""){
      //       completePost = createPostHash(message,x,y);
      //       createPostToDB(completePost); 
            
      //    }
      // });     

      bootbox.dialog({
                title: "Add a Post",
                message: '<div class="row">  ' +
                    '<div class="col-md-12"> ' +
                      '<form class="form-horizontal"> ' +
                       '<div class="form-group"> ' +
                         '<label class="col-md-2 control-label" for="name">Title</label> ' +
                          '<div class="col-md-9"> ' +
                            '<input id="title" name="title"  class="form-control input-md"> ' +
                          '</div>'+
                        '</div>'+
                        '<div class="form-group"> ' +
                          '<label class="col-md-2 control-label" for="comment">Comment</label> ' +
                          '<div class="col-md-9"> ' +
                            '<input id="comment" name="comment"  class="form-control input-md"> ' +  
                          '</div> ' +
                        '</div> ' +
                    '</form> </div>  </div>',
                buttons: {
                    success: {
                        label: "Save",
                        className: "btn-success",
                        callback: function () {
                            var title = $('#title').val();
                            var comment = $('#comment').val();
                            if (title !== null && title !== ""){
                              completePost = createPostHash(title,comment,x,y);
                              createPostToDB(completePost); 
                            }
                            
                        }
                    }
                }
            }
        );



   });

   function createPostHash(message,comment,x,y) {
      var completePost = {
               creator: user.email,
               coordX: x,
               coordY: y,
               title: message,
               session_id: session.id,
               user_id: user.id,
               comments: comment
            };
      return completePost;
   }

  function convertTime (a){
    if (a) {
      var strTime = a.substring(11);
      var time1 = strTime.substring(0,5);
      time = parseInt(time1) ;
      if (time < 6) {
        time = time + 5;
        time = time + time1.substring(2);
        return time;
      } else {
        time = time - 7;
        time = time + time1.substring(2);
        return time;
      }
    }    
  }

   function displayPost (completePost) {
      var user = getUserInitials(completePost.creator);
      var time = convertTime(completePost.updated_at);
      // var time2 = time.getHours()+":"+time.getMinutes();
      // console.log(time);
      var name = $('<p class="post1" id="'+ completePost.id +'" title="'+ completePost.title  +' ">' + user + " - " + time+ " - "+completePost.comments +'</p>'); 
      var div = $('<div class="post" >').css({
         "position": "absolute",
         "left": completePost.coordX,
         "top": completePost.coordY
      });
      div.append(name);
      $(document.body).append(div);   
      // console.log("completePost: ", completePost);    
   }

   function getUserInitials(creator){
      var user = creator.substring(0,2).toUpperCase();
      return user;
   }

   function createPostToDB(completePost) {
      $.ajax ({
            url : "/sessions/"+  completePost.id + "/posts",
            type : "post",
            data : {data_value: JSON.stringify(completePost)}
         });
      displayPost(completePost);
      location.reload(true);
   }

   function editPostToDB(completePost) {      
    
      $.ajax ({
            url : "/posts/" + completePost.id,
            type : "patch",
            data : {data_value: JSON.stringify(completePost)},
            success: function(response, status){
              console.log("Status:",status);
            }
         }).done(function(msg){
          console.log("status 2", msg);
         });
      if (completePost.coordX !== "") {
        location.reload(true);
      }
   }

   function deletePostToDB(completePost) {      
      $.ajax ({
            url : "/posts/" + completePost.id,
            type : "delete",
            data : {data_value: JSON.stringify(completePost)}
         });
      location.reload(true);
   }

// ----------- Edit Posts -----------
   $(document).on("dblclick", ".post",function(){
      // var previousMessage = $(this).children('p').text();
      var title = $(this).children('p').attr("title");
      var comment = $(this).children('p').text().substring(5);
      
      var id = $(this).children('p')[0].id;
      var that = this;
      bootbox.dialog({
         message: '<div class="row">  ' +
                    '<div class="col-md-12"> ' +
                    '<form class="form-horizontal"> ' +
                      '<div class="form-group"> ' +
                        '<label class="col-md-2 control-label" for="title">Post</label> ' +
                        '<div class="col-md-9"> ' +
                          '<input id="title" name="title" type="text" placeholder="" class="form-control "> ' +
                              title +
                        ' </div> ' +
                      '</div> ' +
                      '<div class="form-group"> ' +
                        '<label class="col-md-2 control-label" for="comment">Comment</label> ' +
                        '<div class="col-md-9"> ' +
                          '<input id="comment" name="comment" type="text" placeholder="" class="form-control "> ' +
                              comment +
                        ' </div> ' +
                      '</div> ' +
                    
                    '</form> </div>  </div>',
         title: "Edit this Post",
         buttons: {
           success: {
               label: "Accept",
               className: "btn-success",
               callback: function() {
                  message = $('#title').val();
                  commentNew = $('#comment').val();
                  // console.log("comment", comment);
                  if (message === ""){
                     message = title;
                  } if (commentNew === ""){
                    commentNew = comment;
                  }

                     completePost = { title: message, id: id, comments: commentNew};
                     editPostToDB(completePost);
                     $(that).children('p').text(message);   
                  
               }
            },
            danger: {
               label: "Delete",
               className: "btn-danger",
               callback: function() {
                     completePost = {id: id};
                     deletePostToDB(completePost);
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
        activateMouseup();
    });

    $(document).on("mousedown", ".post", function (e) {
        e.preventDefault();
        $dragging = $(e.target); 
    });

   function activateMouseup(){
       $(document).on("mouseup", function (e) {
            e.preventDefault();
            if ($dragging !== null) {
               // Creates data to edit DB
              var offsetLeft = $dragging[0].style.left;
              var offsetTop =  $dragging[0].style.top;
              var id = $dragging[0].id;
              completePost = { id: id, coordY: offsetTop, coordX: offsetLeft};
              editPostToDB(completePost);
            }
           
           $dragging = null;

       });
   }



    
// ----------- Posts (Passing Javascript variables to Rails) -----------
    $(document).on("click",'.save-com', function (e){
         // e.preventDefault();
         // var postArray = [];
         // var allPosts = document.getElementsByClassName('post');
         // for (var i = 0; i < allPosts.length; i++) {
         //    postArray.push(allPosts[i].outerHTML);
         // }
         // // var pep = JSON.stringify(postArray);
         // $.ajax ({
         //    url : "/sessions/"+ session.id,
         //    type : "post",
         //    data : {data_value: JSON.stringify(postArray)}

         // });

    });
    
// ----------------- Calendar (Datepicker) ---------------------------
  // $(document).ready(function(){
    $('.datepicker').datepicker();
  // });  
 
 // ----------------- Dropdown Menu (Show Page) ---------------------------
 $('.dropdown-toggle').dropdown();

 });