require "rails_helper"

RSpec.describe "Mutations::DeleteChatroomnotes", type: :request do
  let!(:chatrooms) { create_list(:chatroom, 5, :with_chatroomnotes) }
  
  let(:query) do
    <<~GQL
    mutation DeleteChatroomnotes($chatroomnoteId: ID!, $chatroomId: ID!) {
        deleteChatroomnotes(input: {
            chatroomnoteId: $chatroomnoteId,
            chatroomId: $chatroomId
        }){
            result
        }
    }
    GQL
  end

  it "delete a chatroomnote with the right chatroom_id and chatroomnote_id" do
    desired_chatroom = chatrooms.first
    chatroom_notes = desired_chatroom.chatroomnotes
    desired_chatroom_note = chatroom_notes.first
    post '/graphql', params: { query:, variables:{chatroomnoteId:desired_chatroom_note.id, chatroomId:desired_chatroom_note.chatroom_id}.to_json }
    response_json = JSON.parse(response.body)
    expect(response_json['data']['deleteChatroomnotes']['result']).to eq(true)
    expect { Chatroomnotes.find(desired_chatroom_note.id) }.to raise_error(ActiveRecord::RecordNotFound)
    post '/graphql', params: { query:, variables:{chatroomnoteId:desired_chatroom_note.id, chatroomId:desired_chatroom_note.chatroom_id}.to_json }
    response_json = JSON.parse(response.body)
    expect(response_json['data']['deleteChatroomnotes']['result']).to eq(false)
  end

  context "delete chatroom note exception" do

    it "returns an error" do
      desired_chatroom = chatrooms[1]
      chatroom_notes = desired_chatroom.chatroomnotes
      desired_chatroom_note = chatroom_notes.first
      post '/graphql', params: { query:, variables:{chatroomnoteId:desired_chatroom_note.id, chatroomId:'non_exist'}.to_json }
  
      response_json = JSON.parse(response.body)
      expect(response_json["errors"].count).to be > 0
    end
  end
end