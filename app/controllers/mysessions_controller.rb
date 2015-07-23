class MysessionsController < ApplicationController
  def index
    if current_user
      if Mysession.first
        time1 = Time.now
        @user = current_user
        @currentSessions = @user.mysessions.where(["date > ?",time1]).order('created_at DESC')
        @prevSessions = @user.mysessions.where(["date < ?",time1]).order('created_at DESC')
        
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
      if @mysession.save
        user = current_user
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

  private

  def mysession_params
      params.require(:mysession).permit(:name, :time,:description, :date, :image_file_name, :image_content_type, :image, :user_id)
  end
end
