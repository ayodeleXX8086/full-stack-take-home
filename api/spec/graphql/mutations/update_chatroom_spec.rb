require "rails_helper"

RSpec.describe "Mutations::UpdateChatroom", type: :request do
  let(:nature_code) { create(:nature_code) }
  let(:label) { "Chat room" }
  let(:description) { "Updated description" }
  let(:caller_phone_number) { "1234567890" }
  let(:nature_code_id) { nature_code.id }

  let(:query) do
    <<~GQL
      mutation UpdateChatroom(
        $id: ID!
        $label: String
        $callerPhoneNumber: String
        $description: String
        $resolved: Boolean
        $natureCodeId: ID
      ) {
         updateChatroom(
            input: {
                id: $id
                label: $label
                callerPhoneNumber: $callerPhoneNumber
                description: $description
                resolved: $resolved
                natureCodeId: $natureCodeId
            }
        ) {
          chatroom {
            id
            label
            callerPhoneNumber
            description
            resolved
            natureCode {
              id
              name
            }
          }
        }
      }
    GQL
  end

  context "when updating a chat room that exists" do
    before do
      @variables = {} # Define @variables as an instance variable
    end
    it "update the chat room description" do
      # Create a chatroom to be updated
      chatroom = Chatroom.create(
        label:,
        caller_phone_number:,
        description: "Old description",
        nature_code_id: nature_code.id,
        resolved: false
      )
      @variables[:id] = chatroom.id
      @variables[:description]=description

      expect { post '/graphql', params: { query: query, variables: @variables.to_json } }.to_not change { Chatroom.count }

      response_json = JSON.parse(response.body)
      p "Response json #{response_json}"
      chatroom = Chatroom.find(response_json['data']['updateChatroom']['chatroom']['id'])

      expect(chatroom).to be_truthy
      expect(chatroom.label).to eq(label)
      expect(chatroom.description).to eq(description)
      expect(chatroom.caller_phone_number).to eq(caller_phone_number)
      expect(chatroom.nature_code_id).to eq(nature_code_id)
    end

    it "update the chat room with resolved" do
      # Create a chatroom to be updated
      chatroom = Chatroom.create(
        label:,
        caller_phone_number:,
        description: "Old description",
        nature_code_id: nature_code.id,
        resolved: false
      )
      @variables[:id] = chatroom.id
      @variables[:description]=description
      @variables[:resolved] = true

      expect { post '/graphql', params: { query: query, variables: @variables.to_json } }.to_not change { Chatroom.count }

      response_json = JSON.parse(response.body)
      chatroom = Chatroom.find(response_json['data']['updateChatroom']['chatroom']['id'])

      expect(chatroom).to be_truthy
      expect(chatroom.label).to eq(label)
      expect(chatroom.description).to eq(description)
      expect(chatroom.caller_phone_number).to eq(caller_phone_number)
      expect(chatroom.nature_code_id).to eq(nature_code_id)
      expect(chatroom.resolved).to eq(true)
    end
  end


  context "when chat room does not exist" do
    let(:non_existing_id) { "non_existing_id" }
    before do
      @variables = {id: non_existing_id}
    end

    it "returns an error" do
      post '/graphql', params: { query: query, variables: @variables.to_json }

      response_json = JSON.parse(response.body)

      expect(response_json["errors"]).to be_present
      expect(response_json["errors"].first["message"]).to eq("Chatroom was not found")
    end
  end
end
