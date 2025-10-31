var express = require('express');
var router = express.Router();
router.use(express.json());
const {
    Pool,
    Client
} = require('pg');
const pool = new Pool({
    connectionString: process.env.CONNECTION_STRING
});
// Route để lấy tất cả sản phẩm và tất cả danh mục
router.get('/', (req, res) => {
    // Truy vấn tất cả sản phẩm
    pool.query('SELECT * FROM product ORDER BY category_id', (err, productResult) => {
        if (err) {
            return res.status(500).json({
                error: err.message // Nếu có lỗi thì trả về lỗi 500
            });
        }

        // Truy vấn tất cả category
        pool.query('SELECT * FROM category ORDER BY stt', (err, categoryResult) => {
            if (err) {
                return res.status(500).json({
                    error: err.message // Nếu có lỗi thì trả về lỗi 500
                });
            }

            // Truyền cả sản phẩm và category vào template
            res.render('products', { 
                title: 'Products', 
                products: productResult.rows, 
                categories: categoryResult.rows 
            });
        });
    });
});

// Route để thêm sản phẩm
router.post('/add', (req, res) => {
    const { ten, gia, mota, loai } = req.body;

    pool.query(
        'INSERT INTO product (ten, gia, mota, category_id) VALUES ($1, $2, $3, $4) RETURNING id',
        [ten, gia, mota, loai],
        (err, result) => {
            if (err) {
                console.error('Lỗi truy vấn SQL:', err); // Chi tiết lỗi SQL
                return res.status(500).send('Internal Server Error');
            }
            const newProductId = result.rows[0].id;
            res.status(201).json({ message: `Sản phẩm đã được thêm thành công với id: ${newProductId}` });
        }
    );
});

// Route để sửa sản phẩm
router.put('/:id/edit', (req, res) => {
    const productId = req.params.id;
    const { ten, gia, mota, loai } = req.body;

    pool.query(
        'UPDATE product SET ten = $1, gia = $2, mota = $3, category_id = $4 WHERE id = $5',
        [ten, gia, mota, loai, productId],
        (err, result) => {
            if (err) {
                console.error('Lỗi truy vấn SQL:', err); // Chi tiết lỗi SQL
                return res.status(500).send('Internal Server Error');
            }

            if (result.rowCount === 0) {
                return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
            }

            res.status(200).json({ message: `Sản phẩm với id ${productId} đã được cập nhật thành công` });
        }
    );
});

// Route để xóa sản phẩm
router.delete('/:id', (req, res) => {
    const productId = req.params.id;

    pool.query(
        'DELETE FROM product WHERE id = $1',
        [productId],
        (err, result) => {
            if (err) {
                console.error('Lỗi truy vấn SQL:', err); // Chi tiết lỗi SQL
                return res.status(500).send('Internal Server Error');
            }

            if (result.rowCount === 0) {
                return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
            }

            res.status(200).json({ message: `Sản phẩm với id ${productId} đã được xóa thành công` });
        }
    );
});

module.exports = router;