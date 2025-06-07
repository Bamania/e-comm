const shoeData = [
  {
    "id": "shoe-1",
    "title": "Azure Runner Sneakers",
    "description": "Lightweight, breathable sneakers perfect for everyday runs and casual wear.",
    "brand": "StrideX",
    "category": "Men's Running Shoes",
    "color": "Blue/White",
    "price": 3999,
    "currency": "INR",
    "image_url": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/33618baf-0bad-40d8-8722-5f54600c6a5e/AIR+JORDAN+1+RETRO+LOW+OG.png"
  },
  {
    "id": "shoe-2",
    "title": "Crimson Pulse Trainers",
    "description": "Bold red trainers with cushioned soles for all-day comfort.",
    "brand": "UrbanStep",
    "category": "Women's Training Shoes",
    "color": "Red/Black",
    "price": 4599,
    "currency": "INR",
    "image_url": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/c11c5ca7-261c-440b-9ba4-68ede02a0f35/AIR+JORDAN+1+HIGH+G.png"
  },
  {
    "id": "shoe-3",
    "title": "Classic White Canvas",
    "description": "Timeless white canvas shoes, easy to style with any outfit.",
    "brand": "CanvasCo",
    "category": "Unisex Casual Shoes",
    "color": "White",
    "price": 2499,
    "currency": "INR",
    "image_url": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/d0594f46-ca6a-4252-ade7-d1b83c54916c/AIR+JORDAN+4+RM.png"
  },
  {
    "id": "shoe-4",
    "title": "Emerald Glide Loafers",
    "description": "Elegant loafers with a soft emerald finish, ideal for formal occasions.",
    "brand": "Eleganz",
    "category": "Men's Loafers",
    "color": "Green",
    "price": 3499,
    "currency": "INR",
    "image_url": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/a7982b6c-0379-4234-9133-379454cafb5d/JORDAN+TATUM+3+PF.png"
  },
  {
    "id": "shoe-5",
    "title": "Sunset Wave Sandals",
    "description": "Comfortable sandals with a vibrant orange gradient, perfect for summer.",
    "brand": "SunStep",
    "category": "Women's Sandals",
    "color": "Orange/Yellow",
    "price": 1599,
    "currency": "INR",
    "image_url": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/d8bcafc0-a855-4b99-9e76-7c803212d41f/JORDAN+LUKA+.77+PF.png"
  },
  {
    "id": "shoe-6",
    "title": "Midnight Trek Boots",
    "description": "Durable boots designed for outdoor adventures and rough terrains.",
    "brand": "TrailBlaze",
    "category": "Men's Boots",
    "color": "Black",
    "price": 4999,
    "currency": "INR",
    "image_url": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/249a9f06-de0f-4bf1-8734-6217f7cca2a1/WMNS+AIR+JORDAN+1+RETRO+HI+OG.png"
  },
  {
    "id": "shoe-7",
    "title": "Rose Petal Flats",
    "description": "Chic and comfortable flats with a delicate rose finish.",
    "brand": "PetalSoft",
    "category": "Women's Flats",
    "color": "Pink",
    "price": 1899,
    "currency": "INR",
    "image_url": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/7b6d87f1-4bfb-4a82-8f6f-84630181a287/AIR+JORDAN+1+LOW+SE.png"
  },
  {
    "id": "shoe-8",
    "title": "Ocean Breeze Slip-ons",
    "description": "Easy slip-ons with a cool blue gradient, perfect for casual outings.",
    "brand": "Breeze",
    "category": "Unisex Slip-ons",
    "color": "Blue",
    "price": 2199,
    "currency": "INR",
    "image_url": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/4aa50aaf-1393-4c1d-8eb3-db2a1fb16714/JORDAN+TATUM+3+PF.png"
  },
  {
    "id": "shoe-9",
    "title": "Amber Glow Heels",
    "description": "Stylish heels with an amber hue, designed for evening events.",
    "brand": "GlowUp",
    "category": "Women's Heels",
    "color": "Amber",
    "price": 3299,
    "currency": "INR",
    "image_url": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/957eb85a-3503-4d0d-bb26-d613379f6d2b/AIR+JORDAN+1+RETRO+HIGH+OG.png"
  },
  {
    "id": "shoe-10",
    "title": "Graphite Sport High-tops",
    "description": "Trendy high-top sneakers with a graphite finish for a modern look.",
    "brand": "Peak",
    "category": "Men's High-tops",
    "color": "Gray",
    "price": 3799,
    "currency": "INR",
    "image_url": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/018ec083-8fd0-4c14-803a-b66b493cde75/AIR+JORDAN+1+MID+SE.png"
  }
]

export default shoeData
