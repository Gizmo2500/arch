class AddColumnSessionIdToPosts < ActiveRecord::Migration
  def change
      add_column :posts, :session_id, :integer 
  end
end
