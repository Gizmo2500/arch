$(document).ready(function() { 

// ----------- Posts - User - Session (Passing Rails variables to Javascript) -----------
    var user = $('.session_info').data('user');
    var session = $('.session_info').data('session');
    var posts = $('.session_info').data('posts'); 
    var lastPost = $('.session_info').data('lastpost');
    var nextId, lastpost;
    console.log("lastpost ",lastpost);

    if (posts.length > 0) {
         for (var i = 0; i < posts.length; i++) {
            displayPost(posts[i]);
         }
    // }else{
    //      nextId = lastPost.id + 1;
    //      console.log("nextId ",nextId);      
    }    


    
// ----------- Adds Posts -----------
   $(document).on("click",".image",function(e){
      var x = e.pageX + 'px';
      var y = e.pageY + 'px';
      bootbox.prompt("Add Post", function(message) {                
         if (message !== null && message !== ""){
            // var name = $('<span class="edit" >Type here!</span>');
            completePost = createPostHash(message,x,y);
            createPostToDB(completePost); 
            lastPost = $('.session_info').data('lastpost');
            
                         
         }
      });      
   });

   function createPostHash(message,x,y) {
      var completePost = {
               creator: user.email,
               coordX: x,
               coordY: y,
               title: message,
               session_id: session.id,
               user_id: user.id
            };
      return completePost;
   }

   function displayPost (completePost) {
        $.ajax ({
            url : "/sessions/"+ session.id ,
            type : "get"
            
         });

      lastPost = $('.session_info').data('lastpost');
      console.log("lastpost 4: ", lastPost); 


      if (completePost.id === undefined) {
         completePost.id = lastpost;
         // console.log("reached: ", completePost.id);
      }
      var name = $('<p class="label label-success" id="'+ completePost.id +'">User: ' + completePost.creator +' || Post: ' + completePost.title + '</p>'); 
      var div = $('<div class="post" >').css({
         "position": "absolute",
         "left": completePost.coordX,
         "top": completePost.coordY
      });
      div.append(name);
      $(document.body).append(div);       
   }

   function createPostToDB(completePost) {
      $.ajax ({
            url : "/sessions/"+  completePost.id + "/posts",
            type : "post",
            data : {data_value: JSON.stringify(completePost)},

         });
      $.ajax ({
            url : "/sessions/"+ session.id ,
            type : "get"
            
         });

      lastPost = $('.session_info').data('lastpost');
      console.log("lastpost 2: ", lastPost);
      displayPost(completePost);
   }

      function editPostToDB(completePost) {      
      $.ajax ({
            url : "/posts/" + completePost.id,
            type : "patch",
            data : {data_value: JSON.stringify(completePost)}
         });
   }

// ----------- Edit Posts -----------
   $(document).on("dblclick", ".post",function(){
      var previousMessage = $(this).children('p').text();
      var id = $(this).children('p')[0].id;
      var that = this;
      bootbox.dialog({
         message: '<div class="row">  ' +
                    '<div class="col-md-12"> ' +
                    '<form class="form-horizontal"> ' +
                    '<div class="form-group"> ' +
                    '<label class="col-md-2 control-label" for="name">Current Post</label> ' +
                    '<div class="col-md-9"> ' +
                    '<input id="name" name="name" type="text" placeholder="'+ previousMessage+'" class="form-control input-md"> ' +
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
                     completePost = { title: message, id: id};
                     editPostToDB(completePost);
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


    





    // var postsRevovered = session.version;
    //    if (postsRevovered) {
    //         var test = JSON.parse(postsRevovered);
    //         for (var f = 0; f < test.length; f++) {
    //            $(document.body).append(test[f]);
    //         } 
    //   } else {
    //      bootbox.alert("No posts registered", function(message) { 
    //      });
    //    }

    
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
            e.preventDefault();
             $.ajax ({
               url : "/sessions/"+ session.id ,
               type : "get",
               

            
            });

      lastPost = $('.session_info').data('lastpost');
      console.log("lastpost 3: ", lastPost);

    });
    
 
 

 });