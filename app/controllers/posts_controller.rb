class PostsController < ApplicationController

  def index
  end

  def create
   post = params[:data_value]
   a = JSON.parse post
   @post = Post.new(creator: a["creator"], title: a["title"], coordX: a["coordX"], coordY: a["coordY"], session_id: a["session_id"], user_id: a["user_id"])
   @post.save
   @session = Session.find(a["session_id"])
   @session.push(@post)
  end

  def update
   post = params[:data_value]
   a = JSON.parse post
   id = a["id"].to_i
   @post = Post.find(id)
    if a["title"]
      @post.title = a["title"]
      @post.save
    else
      # newY = a["coordY"].to_i
      # newX = a["coordX"].to_i 
      # y = @post.coordY.to_i
      # x = @post.coordX.to_i
      @post.coordY = (a["coordY"].to_i + @post.coordY.to_i).to_s 
      @post.coordX = (a["coordX"].to_i + @post.coordX.to_i).to_s 
      @post.coordY = @post.coordY + "px"
      @post.coordX = @post.coordX + "px"
      # binding.pry
      @post.save
    end
  end


end
