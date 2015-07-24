class MysessionsController < ApplicationController
rescue_from ActionController::ParameterMissing, with: :missing_file

  def index
    if current_user
      if Mysession.first
        time1 = Time.now
        @user = current_user
        @currentSessions = @user.mysessions.where(["date > ?",time1]).order('created_at DESC')
        @prevSessions = @user.mysessions.where(["date < ?",time1]).order('created_at DESC')
        @allUsers = User.all 
        @mysession = Mysession.new
      else
        @mysession = Mysession.new
      end
    else
      redirect_to new_user_session_path
    end

  end

  def new
  end

  def create
      @mysession = Mysession.new mysession_params
      user = current_user
      @mysession.creator = user.email
      if @mysession.save
        addAttendees(@mysession)
        user.mysessions.push(@mysession) 
        redirect_to mysessions_path
      else
        redirect_to(:back)
      end
  end

  def edit
    @mysession = Mysession.find params[:id]
  end

  def update
      @mysession = Mysession.find params[:id]
      posts = params[:data_value]
      if posts
        @mysession.version = posts
        @mysession.save
      else
        @mysession.update_attributes mysession_params 
        if @mysession.save
          redirect_to mysession_path(@mysession)
        else
         render :edit
        end
      end
  end

  def show
      @mysession = Mysession.find params[:id]
      @user = current_user
      @posts = @mysession.posts.order('created_at DESC')
  end

  def destroy
      @mysession = Mysession.find params[:id]
      @mysession.destroy
      redirect_to mysessions_path
  end


  def addAttendees(mysession)
    attendessList = mysession.other.scan(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i)
    attendessList.each do |attendee|
      user = User.find_by email: attendee
      user.mysessions.push(mysession)
    end
  end


  private

  def mysession_params
      params.require(:mysession).permit(:name, :time,:description, :date, :image_file_name, :image_content_type, :image, :user_id, :other)
  end

   def missing_file
    render plain: "Choose file before uploading", status: 404
   end
end
