class ChangeColumName < ActiveRecord::Migration
  def change
      rename_column :posts, :coordinates, :coordX
      add_column :posts, :coordY, :string
  end
end
