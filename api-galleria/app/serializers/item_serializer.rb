class ItemSerializer < ActiveModel::Serializer
    attributes :id, :price, :discount, :images, :tags, :public, :name, :seller_id, :buyer_id, :description

    # def buyer
    #     buyer = User.find(self.object.buyer_id)
    #     return buyer
    # end

    # def seller
    #     seller = User.find(self.object.seller_id)
    #     return seller
    # end

end