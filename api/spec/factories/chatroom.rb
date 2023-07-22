FactoryBot.define do
  factory :chatroom do
    sequence(:id)
    label { "Chatroom Label" }
    description { "Chatroom Description" }
    caller_phone_number { "12223334444" }
    resolved { false }
    created_at { Time.zone.now }
    updated_at { Time.zone.now }

    # The correct trait name is :with_chatroomnotes (not :with_chatroom)
    trait :with_chatroomnotes do
      after(:create) do |chatroom|
        create_list(:chatroomnotes, 3, chatroom: chatroom)
      end
    end
  end
end
