module Types
  class MutationType < Types::BaseObject
    field :create_chatroom, mutation: Mutations::CreateChatroom
    field :update_chatroom, mutation: Mutations::UpdateChatroom 
    field :create_chatroomnotes, mutation: Mutations::CreateChatroomnotes
    field :delete_chatroomnotes, mutation: Mutations::DeleteChatroomnotes
  end
end
