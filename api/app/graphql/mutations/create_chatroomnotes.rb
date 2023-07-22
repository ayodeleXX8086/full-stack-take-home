module Mutations
  class CreateChatroomnotes < BaseMutation
    argument :note, String, required: true
    argument :chatroom_id, ID, required: true

    # fields
    field :chatroomnote, Types::ChatroomnoteTypes, null: false

    # resolver
    def resolve(note:, chatroom_id:)
      params = { note:, chatroom_id: }.compact_blank
      chatroomnote = Chatroomnotes.create(**params)
      {
        chatroomnote: chatroomnote
      }
    end
  end
end