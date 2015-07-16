class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :creator
      t.string :title
      t.string :comments
      t.string :coordinates

      t.timestamps null: false
    end
  end
end
