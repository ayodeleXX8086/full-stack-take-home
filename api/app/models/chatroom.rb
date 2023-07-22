class Chatroom < ApplicationRecord
  belongs_to :nature_code, optional: true
  has_many :chatroomnotes, class_name: 'Chatroomnotes'
end