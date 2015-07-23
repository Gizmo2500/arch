class ChangeColNameInPost < ActiveRecord::Migration
  def change
      rename_column :posts, :session_id, :mysession_id
  end
end
