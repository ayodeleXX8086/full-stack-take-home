require 'batch_loader'

module Types
  class QueryType < Types::BaseObject
    field :chatrooms, [Types::ChatroomType], null: false do
      argument :resolved, Boolean, required: false
    end
    field :nature_codes, [Types::NatureCodeType], null: false
    field :chatroom, Types::ChatroomType, null: false do
      argument :id, ID, required: true
    end

    def chatrooms(resolved: false)
      chatrooms = Chatroom.where(resolved: resolved).order(created_at: :desc)
      chatroom_ids = chatrooms.pluck(:id)
      
      # Use batch loading to fetch chatnotes for multiple chatrooms in a single query
      BatchLoader::GraphQL.for(chatroom_ids).batch do |chatroom_ids, loader|
        chatnotes = Chatroomsnote.where(chatroom_id: chatroom_ids)
        chatnotes.group_by(&:chatroom_id).each do |chatroom_id, notes|
          loader.call(chatroom_id, notes)
        end
      end

      chatrooms
    end

    def nature_codes
      NatureCode.all
    end

    def chatroom(id:)
      Chatroom.includes(:chatroomnotes).find_by(id: id)
    end
  end
end
