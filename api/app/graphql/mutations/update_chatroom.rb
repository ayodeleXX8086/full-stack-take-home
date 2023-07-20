module Mutations
  class UpdateChatroom < BaseMutation
    # Arguments to update the chatroom
    argument :id, ID, required: true
    argument :label, String, required: false
    argument :caller_phone_number, String, required: false
    argument :description, String, required: false
    argument :resolved, Boolean, required: false
    argument :nature_code_id, ID, required: false

    # Field to return the updated chatroom
    field :chatroom, Types::ChatroomType, null: false

    # Resolver
    def resolve(id:, label: nil, caller_phone_number: nil, description: nil, resolved: nil, nature_code_id: nil)
      # Find the chatroom by the provided id or throw an exception if the chatroom is not found.
      chatroom = Chatroom.find(id)

      # Update the chatroom attributes with the provided values or use existing values if nil.
      label ||= chatroom.label
      caller_phone_number ||= chatroom.caller_phone_number
      description ||= chatroom.description
      resolved = chatroom.resolved if resolved.nil?
      nature_code_id ||= chatroom.nature_code_id

      p "Nature code #{nature_code_id}"

      # Update the chatroom attributes with the provided values
      result = chatroom.update(
        label:,
        caller_phone_number:,
        description:,
        resolved:,
        nature_code_id:
      )

      if result
        # Return the updated chatroom
        {
            chatroom: chatroom
        }
      else
        raise GraphQL::ExecutionError, "Chatroom was not updated successfully"
      end
    rescue ActiveRecord::RecordNotFound => e
        raise GraphQL::ExecutionError, "Chatroom was not found"
    end
  end
end
