require "rails_helper"

RSpec.describe "Mutations::CreateChatroomNotes", type: :request do
  let!(:chatroom) { create(:chatroom) }
  
  let(:note) { "New chatroom" }
  let(:chatroom_id) { chatroom.id }
  let(:variables) do
    {
      note:,
      chatroomId: chatroom_id
    }.to_json
  end
  
  let(:query) do
    <<~GQL
      mutation CreateChatroomnotes(
        $note: String!
        $chatroomId: ID!
      ) {
        createChatroomnotes(
          input: {
            note: $note
            chatroomId: $chatroomId
          }
        ) {
          chatroomnote {
            id
            note
            createdAt
            updatedAt
          }
        }
      }    
    GQL
  end

  it "creates a new chatroomnote" do
    post '/graphql', params: { query:, variables: }
    # expect { post '/graphql', params: { query:, variables: } }.to change { Chatroomnotes.count }.from(0).to(1)

    response_json = JSON.parse(response.body)
    p "Response json #{response_json}"

    chatroomnote = Chatroomnotes.find(response_json['data']['createChatroomnotes']['chatroomnote']['id'])
    
    expect(chatroomnote).to be_truthy
    expect(chatroomnote.note).to eq(note)
    expect(chatroomnote.chatroom_id).to eq(chatroom_id)
    expect(chatroomnote.created_at).to be_truthy
  end

  context "when required fields are not provided" do
    let(:note) { nil }

    it "returns an error" do
      expect { post '/graphql', params: { query:, variables: } }.to_not change { Chatroomnotes.count }
  
      response_json = JSON.parse(response.body)
      expect(response_json["errors"].count).to be > 0
    end
  end
end