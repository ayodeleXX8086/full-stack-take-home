FactoryBot.define do
  factory :chatroomnotes do
    note { 'Fake notes' }
    created_at { Time.zone.now }
    updated_at { Time.zone.now }
    chatroom
  end
end