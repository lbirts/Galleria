class UserSerializer < ActiveModel::Serializer
    attributes :id, :username, :name, :email, :avatar, :bio, :inventory, :bought
    def bought
      ActiveModel::SerializableResource.new(object.bought,  each_serializer: ItemSerializer)
    end
    def inventory
      ActiveModel::SerializableResource.new(object.inventory,  each_serializer: ItemSerializer)
    end
  end