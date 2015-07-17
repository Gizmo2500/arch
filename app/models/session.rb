class Session < ActiveRecord::Base
   validates :name,  presence: true
   has_many :posts, dependent: :destroy
   has_attached_file :image, styles: {small: "64x64", med: "100x100", large: "200x200"}
   validates :image, :attachment_presence => false
   validates_attachment :image, :size => { :in => 0..500.kilobytes }
   validates_attachment :image, :content_type => { :content_type => "image/png" }

   has_many :meetings
   has_many :users, :through => :meetings
end
