module Types
  class ChatroomType < Types::BaseObject
    field :id, ID, null: false
    field :label, String, null: false
    field :description, String, null: true
    field :resolved, Boolean, null: false
    field :caller_phone_number, String, null: false
    field :nature_code, Types::NatureCodeType, null: true
    field :created_at, Types::DateTimeType, null: false
    field :updated_at, Types::DateTimeType, null: false
    field :chatroomnotes, [Types::ChatroomnoteTypes], null: true

    def chatroomnotes
      object.chatroomnotes
    end
  end
end
