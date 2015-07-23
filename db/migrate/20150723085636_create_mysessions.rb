class CreateMysessions < ActiveRecord::Migration
  def change
    create_table :mysessions do |t|
      t.string :name
      t.string :description
      t.date :date
      t.string :image_file_name
      t.string :image_content_type
      t.integer :image_file_size
      t.datetime :image_updated_at
      t.string :other
      t.time :time
      t.integer :user_id

      t.timestamps null: false
    end
  end
end
