class ChangeColumNameInMeeting < ActiveRecord::Migration
  def change
      rename_column :meetings, :session_id, :mysession_id
  end
end
