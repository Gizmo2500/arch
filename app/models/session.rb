class Session < ActiveRecord::Base
   has_many :posts
   has_attached_file :image, styles: {small: "64x64", med: "100x100", large: "200x200"}
   validates :image, :attachment_presence => true
   validates_attachment :image, :size => { :in => 0..500.kilobytes }
   validates_attachment :image, :content_type => { :content_type => "image/png" }

   has_many :meetings
   has_many :users, :through => :meetings
end
