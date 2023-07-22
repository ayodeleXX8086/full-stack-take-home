module Mutations
  class CreateChatroom < BaseMutation
    argument :label, String, required: true
    argument :caller_phone_number, String, required: true
    argument :description, String, required: false
    argument :nature_code_id, ID, required: false

    # fields
    field :chatroom, Types::ChatroomType, null: false

    # resolver
    def resolve(label:, caller_phone_number:, description: nil, nature_code_id: nil)
      params = { label:, caller_phone_number:, description:, nature_code_id: }.compact_blank
      chatroom = Chatroom.create(**params, resolved: false)
      {
        chatroom: chatroom
      }
    end
  end
end