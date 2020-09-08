class CreateImages < ActiveRecord::Migration[6.0]
  def change
    create_table :images do |t|
      t.string :url
      t.references :item
      t.string :key

      t.timestamps
    end
  end
end
