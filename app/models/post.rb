class Post < ActiveRecord::Base
   belongs_to :mysession
   belongs_to :user
end
