class SessionsController < ApplicationController
  def index
      @sessions = Session.all
      @user = current_user
  end

  def new
      @session = Session.new
  end

  def create
      @session = Session.new session_params
      if @session.save
         redirect_to sessions_path
      else
         render :new
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
        redirect_to sessions_path
      else
       render :edit
      end
    end
  end

  def show
      @session = Session.find params[:id]
      @user = current_user
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
