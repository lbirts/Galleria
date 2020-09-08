# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.destroy_all
Item.destroy_all

u1 = User.create(username: "bsquiat", password: "123456", bio: "Jean-Michel Basquiat (French: [ʒɑ̃ miʃɛl baskja]; December 22, 1960 – August 12, 1988) was an American artist of Haitian and Puerto Rican descent. Basquiat first achieved fame as part of SAMO, an informal graffiti duo who wrote enigmatic epigrams in the cultural hotbed of the Lower East Side of Manhattan during the late 1970s, where rap, punk, and street art coalesced into early hip-hop music culture. By the 1980s, his neo-expressionist paintings were being exhibited in galleries and museums internationally. The Whitney Museum of American Art held a retrospective of his art in 1992.", avatar: "https://en.wikipedia.org/wiki/Jean-Michel_Basquiat#/media/File:Jean-Michel_Basquiat_1986_by_William_Coupon.jpg", email: "birtslauren@gmail.com", name: "Jean-Michel Basquiat")

u2 = User.create(username: "Lolo", password: "123456", email: "birtslauren@gmail.com", name: "Lauren Birts")

i1 = Item.create(price: 500000, discount: 0, tags: "Basquiat, Boxer, Abstract, Neo-expressionism", public: true, name: "Boxer", seller_id: u1.id, description: "Untitled (Boxer) is a neo-Expressionist painting by the painter and street artist Jean-Michel Basquiat. The monumentally scaled painting Untitled (Boxer) is one of Basquiat's most powerful images of a boxer, a champion of epic proportions, and a metaphorical self-portrait of Basquiat as a defiant fighter.")
i2 = Item.create(price: 200000, discount: 30, tags: "Untitled, Basquiat, Colorful, Abstract, Neo-expressionism", public: false, name: "Untitled", seller_id: u1.id, description: "A large, colorful acrylic and oil stick on canvas work depicting a skeletal fisherman")

Image.create(url: "https://www.christies.com/img/LotImages/2008/NYR/2008_NYR_02048_0019_000().jpg", item: i1)
Image.create(url: "https://paintingandframe.com/images-framed/jean-michel-basquiat-boxer-print-L-16431-fn5_30x24.jpg", item: i1)
Image.create(url: "https://i.etsystatic.com/22792671/r/il/5338d0/2278530862/il_1588xN.2278530862_mr6j.jpg", item: i1)
Image.create(url: "https://imgc.allpostersimages.com/img/print/u-g-F8SM7E0.jpg?w=550&h=550&p=0", item: i2)
