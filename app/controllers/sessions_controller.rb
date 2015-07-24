class SessionsController < ApplicationController
  rescue_from ActionController::ParameterMissing, with: :missing_file

  def index
    if current_user
      if Session.first
        time1 = Time.now
        @user = current_user
        @currentSessions = @user.sessions.where(["date > ?",time1]).order('created_at DESC')
        @prevSessions = @user.sessions.where(["date < ?",time1]).order('created_at DESC')
        
        @session = Session.new
        
      else
        @session = Session.new
      end
    else
      redirect_to new_user_session_path
    end

  end

  def new
  end

  def create
      @session = Session.new session_params
      if @session.save
        user = current_user
        user.sessions.push(@session)  
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
      params.require(:session).permit(:name, :time,:description, :date, :image_file_name, :image_content_type, :image, :user_id)
  end

  def missing_file
    render "Missing file"
  end
end
