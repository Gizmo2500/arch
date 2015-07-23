class SessionsController < ApplicationController
  def index
    if current_user
      time1 = Time.now
      @currentSessions = Session.where(["date > ?",time1]).order('created_at DESC')
      @prevSessions = Session.where(["date < ?",time1]).order('created_at DESC')
      @user = current_user
      @session = Session.new
    else
      redirect_to new_user_session_path
    end

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
  end

  def destroy
      @session = Session.find params[:id]
      @session.destroy
      redirect_to sessions_path
  end

  private

  def session_params
      params.require(:session).permit(:name, :time,:description, :date, :image_file_name, :image_content_type, :image)
  end
end
