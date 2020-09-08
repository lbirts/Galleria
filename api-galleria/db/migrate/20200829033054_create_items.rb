class CreateItems < ActiveRecord::Migration[6.0]
  def change
    create_table :items do |t|
      t.float :price
      t.float :discount
      t.string :tags
      t.boolean :public
      t.string :name
      t.string :description
      t.references :buyer, references: :users, foreign_key: {to_table: :users}
      t.references :seller, references: :users, foreign_key: {to_table: :users}
      t.timestamps
    end
  end
end
