class SessionsController < ApplicationController
  def index
      @sessions = Session.all
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

  def show
      @session = Session.find params[:id]
  end


  private

  def session_params
      params.require(:session).permit(:name, :description, :date, :image_file_name, :image_content_type, :image)
  end
end
