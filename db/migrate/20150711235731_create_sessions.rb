class CreateSessions < ActiveRecord::Migration
  def change
    create_table :sessions do |t|
      t.string :name
      t.string :description
      t.date :date
      t.attachment :image
      t.string :version

      t.timestamps null: false
    end
  end
end
