class AddColumUserIdToSession < ActiveRecord::Migration
  def change
      add_column :sessions, :user_id, :integer
  end
end
