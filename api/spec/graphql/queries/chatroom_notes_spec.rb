require "rails_helper"

RSpec.describe "Chatroomnotes", type: :request do
  let!(:chatrooms) { create_list(:chatroom, 5, :with_chatroomnotes) }

  let(:resolved) { false }
  let(:variables) { { resolved: }.to_json }
  
  let(:query) do
    <<~GQL
      query Chatrooms($resolved: Boolean) {
        chatrooms(resolved: $resolved) {
          id
          label
          description
          callerPhoneNumber
          resolved
          createdAt
          updatedAt
          natureCode {
            id
            name
          }
          chatroomnotes {
            id
            note
            createdAt
            updatedAt
          }
        }
      }
    GQL
  end

  let(:queryGetChatRoom) do
    <<~GQL
      query Chatrooms($id: ID!) {
        chatroom(id: $id) {
          id
          label
          description
          callerPhoneNumber
          resolved
          createdAt
          updatedAt
          natureCode {
            id
            name
          }
          chatroomnotes {
            id
            note
            createdAt
            updatedAt
          }
        }
      }
    GQL
  end

  context "when resolved flag is false" do
    let(:resolved) { false }
    
    it "chatrooms with notes retrieved from list of chatrooms" do
      post '/graphql', params: { query:, variables: }

      response_json = JSON.parse(response.body)
      desired_chatroom = chatrooms.first
      response_chatroom_ids = response_json['data']['chatrooms'].map { |chatroom| chatroom['id'] }
      response_chatrooms = Chatroom.where(id: response_chatroom_ids)
      
      expect(desired_chatroom.chatroomnotes.count).to eq(3)
      expect(desired_chatroom.chatroomnotes.first.note).to be_truthy
      expect(desired_chatroom.chatroomnotes.first.created_at).to be_truthy
      expect(response_chatrooms.count).to eq(chatrooms.count)
      expect(response_chatrooms).to all(have_attributes(resolved: false))
    end

    it "chatrooms by chatroom ID" do
      desired_chatroom = chatrooms.first
      post '/graphql', params: { query:queryGetChatRoom, variables: {id: desired_chatroom.id}.to_json }
      response_json = JSON.parse(response.body)
      response_chatoom_notes = response_json['data']['chatroom']['chatroomnotes']
      expect(response_chatoom_notes.count).to eq(3)
    end
  end
end