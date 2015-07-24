class AddColumnToMysession < ActiveRecord::Migration
  def change
      add_column :mysessions, :creator, :string
  end
end
