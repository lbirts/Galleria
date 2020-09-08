class UserSerializer < ActiveModel::Serializer
    attributes :id, :username, :name, :email, :avatar, :bio, :inventory, :bought
  end