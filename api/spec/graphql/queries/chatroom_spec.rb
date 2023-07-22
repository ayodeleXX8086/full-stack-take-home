require "rails_helper"

RSpec.describe "Chatrooms", type: :request do
  let!(:chatrooms) { create_list(:chatroom, 3) }
  let!(:resolved_chatrooms) { create_list(:chatroom, 3, resolved: true) }

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
          natureCode {
            id
            name
          }
        }
      }
    GQL
  end

  context "when resolved flag is false" do
    let(:resolved) { false }
    
    it "returns all non-resolved chatrooms" do
      post '/graphql', params: { query:, variables: }

      response_json = JSON.parse(response.body)
      response_chatroom_ids = response_json['data']['chatrooms'].map { |chatroom| chatroom['id'] }
      response_chatrooms = Chatroom.where(id: response_chatroom_ids)
      
      expect(response_chatrooms.count).to eq(chatrooms.count)
      expect(response_chatrooms).to all(have_attributes(resolved: false))
    end
  end

  context "when resolved flag is true" do
    let(:resolved) { true }
    
    it "returns all resolved chatrooms" do
      post '/graphql', params: { query:, variables: }

      response_json = JSON.parse(response.body)
      response_chatroom_ids = response_json['data']['chatrooms'].map { |chatroom| chatroom['id'] }
      response_chatrooms = Chatroom.where(id: response_chatroom_ids)
      
      expect(response_chatrooms.count).to eq(resolved_chatrooms.count)
      expect(response_chatrooms).to all(have_attributes(resolved: true))
    end
  end
end