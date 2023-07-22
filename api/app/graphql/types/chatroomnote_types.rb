module Types
  class ChatroomnoteTypes < Types::BaseObject
    field :id, ID, null: false
    field :note, String, null: false
    field :created_at, Types::DateTimeType, null: false
    field :updated_at, Types::DateTimeType, null: false
    field :chatroom, Types::ChatroomType, null: false
  end
end