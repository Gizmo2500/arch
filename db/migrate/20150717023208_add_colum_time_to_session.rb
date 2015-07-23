class AddColumTimeToSession < ActiveRecord::Migration
  def change
      add_column :sessions, :time, :time
  end
end
