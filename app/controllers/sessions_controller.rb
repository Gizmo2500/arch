class SessionsController < ApplicationController
  def index
      @sessions = Session.all.order('created_at DESC')
      @user = current_user
      @session = Session.new
  end

  def new
  end

  def create
      @session = Session.new session_params
      if @session.save
         redirect_to sessions_path
      else
        redirect_to(:back)
      end
  end

  def edit
    @session = Session.find params[:id]
  end

  def update
    @session = Session.find params[:id]
    posts = params[:data_value]
    if posts
      @session.version = posts
      @session.save
    else
      @session.update_attributes session_params 
      if @session.save
        redirect_to session_path(@session)
      else
       render :edit
      end
    end
  end

  def show
      @session = Session.find params[:id]
      @user = current_user
      @posts = @session.posts.order('created_at DESC')
      @last_post = Post.last
  end

  def destroy
      @session = Session.find params[:id]
      @session.destroy
      redirect_to sessions_path
  end

  private

  def session_params
      params.require(:session).permit(:name, :description, :date, :image_file_name, :image_content_type, :image)
  end
end
