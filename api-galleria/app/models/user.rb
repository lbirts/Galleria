class User < ApplicationRecord
    has_secure_password
    validates :username, uniqueness: { case_sensitive: false}
    has_many :inventory, foreign_key: "seller_id", class_name: "Item"
    has_many :bought, foreign_key: "buyer_id", class_name: "Item"
end
