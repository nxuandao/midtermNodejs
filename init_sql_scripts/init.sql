-- Create table 'category' with auto-increment ID, name, and order
CREATE TABLE category (
    id SERIAL PRIMARY KEY,    -- Auto-incrementing primary key
    ten VARCHAR(50) NOT NULL, -- Category name
    stt INT                   -- Order
);

-- Insert data into the 'category' table
INSERT INTO category (ten, stt) 
VALUES 
    ('drink', 1),
    ('pizza', 2),
    ('steak', 3),
    ('dessert', 4);

-- Create table 'product' with auto-increment ID, name, price, description, and foreign key to category
CREATE TABLE product (
    id SERIAL PRIMARY KEY,            -- Auto-incrementing primary key
    ten VARCHAR(50) NOT NULL,         -- Name of the product
    gia INT NOT NULL,                 -- Price
    mota TEXT,                        -- Description
    category_id INT REFERENCES category(id) -- Foreign key to category
);

-- Insert data into the 'product' table
INSERT INTO product (ten, gia, mota, category_id) 
VALUES 
    -- Drink products
    ('Trà sữa truyền thống', 25000, 'Trà sữa với vị truyền thống', 1),
    ('Cà phê đen', 15000, 'Cà phê đen đậm đà', 1),
    ('Nước ép cam', 20000, 'Nước ép cam tươi mát', 1),
    
    -- Pizza products
    ('Pizza hải sản', 180000, 'Pizza hải sản tươi ngon', 2),
    ('Pizza phô mai', 160000, 'Pizza phô mai béo ngậy', 2),
    ('Pizza thập cẩm', 170000, 'Pizza với các loại topping đa dạng', 2),

    -- Steak products
    ('Steak bò Úc', 120000, 'Thịt bò Úc chất lượng cao', 3),
    ('Steak bò Mỹ', 150000, 'Steak bò Mỹ thượng hạng', 3),
    ('Steak sốt tiêu đen', 130000, 'Steak với sốt tiêu đen đặc biệt', 3),

    -- Dessert products
    ('Bánh mousse chanh leo', 40000, 'Bánh mousse vị chanh leo', 4),
    ('Tiramisu', 45000, 'Bánh tiramisu Ý truyền thống', 4),
    ('Bánh macaron', 50000, 'Bánh macaron Pháp nhiều màu sắc', 4);

-- Create table 'reservation' with auto-increment ID, customer name, phone, number of people, start and end time, purpose, and notes
CREATE TABLE reservation (
    id SERIAL PRIMARY KEY,           -- Auto-incrementing primary key for reservation ID
    ten_khach_hang VARCHAR(100) NOT NULL,  -- Customer name
    so_dien_thoai VARCHAR(15) NOT NULL,    -- Customer phone number
    so_nguoi INT NOT NULL,                 -- Number of people
    so_ban INT,
    thoi_gian_bat_dau TIMESTAMP NOT NULL,  -- Start time
    thoi_gian_ket_thuc TIMESTAMP NOT NULL, -- End time
    muc_dich VARCHAR(255),                 -- Purpose of reservation
    ghi_chu TEXT                           -- Additional notes
);

-- Example insert statement into 'reservation' table
INSERT INTO reservation (ten_khach_hang, so_dien_thoai, so_nguoi, so_ban, thoi_gian_bat_dau, thoi_gian_ket_thuc, muc_dich, ghi_chu)
VALUES
    ('Nguyễn Văn A', '0123456789', 4, NULL, '2024-11-12 18:00:00', '2024-11-12 20:00:00', 'Sinh nhật', 'Yêu cầu phòng riêng'),
    ('Trần Thị B', '0987654321', 2, NULL, '2024-11-13 19:00:00', '2024-11-13 21:00:00', 'Kỷ niệm ngày cưới', 'Bàn cạnh cửa sổ'),
    ('Lê C', '0901234567', 10, 3, '2024-11-14 12:00:00', '2024-11-14 14:00:00', 'Tiệc công ty', 'Cần phòng họp nhỏ');
