class PostsController < ApplicationController

  def index
  end

  def create
   post = params[:data_value]
   a = JSON.parse post
   @post = Post.new(creator: a["creator"], title: a["title"], coordX: a["coordX"], coordY: a["coordY"], session_id: a["session_id"], user_id: a["user_id"], comments: a["comments"])
   @post.save
   @session = Session.find(a["session_id"])
   @session.push(@post)
   respond_to do |format|
      format.json {head :ok}
    end

  end

  def update
    if  params[:data_value]
       post = params[:data_value]
       a = JSON.parse post
       id = a["id"].to_i
       @post = Post.find(id)

        if a["title"] || a["comments"]
          @post.title = a["title"]
          @post.comments = a["comments"]
          @post.save
          # respond_to do |format|
            # format.json {head :ok}

          # end
          render :json => @post
        else
          @post.coordY = (a["coordY"].to_i + @post.coordY.to_i).to_s 
          @post.coordX = (a["coordX"].to_i + @post.coordX.to_i).to_s 
          @post.coordY = @post.coordY + "px"
          @post.coordX = @post.coordX + "px"
          @post.save
          # respond_to do |format|
          #   format.json {head :ok}
          # end
          render :json => @post
        end
    # else
    #     @post = Post.find params[:id]
    #     @post.comments = params[:post]["comments"]
    #     @post.save
    #     redirect_to(:back)
    end
  end

  def destroy
      post_id = JSON.parse params[:data_value]
      post = Post.find post_id["id"]
      Post.delete(post)
      respond_to do |format|
        format.json {head :ok}
      end      
     
  end

end
