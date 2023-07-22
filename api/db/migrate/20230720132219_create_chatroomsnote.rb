class CreateChatroomsnote < ActiveRecord::Migration[7.0]
  def change
    create_table :chatroomnotes do |t|
      t.string :note
      t.references :chatroom, null: false, foreign_key: true

      t.timestamps
    end
  end
end