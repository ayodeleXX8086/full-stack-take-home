module Mutations
  class DeleteChatroomnotes < BaseMutation
    argument :chatroomnote_id, ID, required: true
    argument :chatroom_id, ID, required: true

    field :result, Boolean, null: false

    # resolver
    def resolve(chatroomnote_id:, chatroom_id:)
      chatroomnote = Chatroomnotes.find(chatroomnote_id)
      p "Chatroom note id #{chatroomnote_id} Chat room id #{chatroom_id} chatroomnote_id class #{chatroomnote.chatroom_id.class} chatroom_id class #{chatroom_id.class}"
      if chatroomnote.chatroom_id.to_s != chatroom_id
        raise GraphQL::ExecutionError, "Chatroom doesn't match with chat note"
      end
      p "Destory chatroom"
      chatroomnote.destroy
      { result: true }
    rescue ActiveRecord::RecordNotFound
      { result: false }
    end
  end
end