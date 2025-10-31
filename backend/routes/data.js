var express = require('express');
var router = express.Router();
const {
    Pool,
    Client
} = require('pg');
const pool = new Pool({
    connectionString: process.env.CONNECTION_STRING
});
//Lấy tất cả category
router.get('/category', function(req, res) {
    pool.query('SELECT * FROM category ORDER BY stt', [], (err, result) => {
        if (err) {
            return res.status(405).jsonp({
                error: err
            });
        }

        return res.status(200).jsonp({
            data: result.rows
        });

    });
});
//Lấy tất cả sản phẩm theo category
router.get('/category/:id?', function(req, res) {
    const id = req.params.id;

    pool.query('SELECT * FROM product WHERE category_id = $1', [id], (err, result) => {
        if (err) {
            return res.status(405).jsonp({
                error: err.message
            });
        }

        return res.status(200).jsonp({
            data: result.rows
        });
    });
});

//Lấy tất cả sản phẩm và sắp xếp theo thứ tự category
router.get('/category/products', function(req, res) {

    pool.query('SELECT * FROM product ORDER BY category_id', [], (err, result) => {
        if (err) {
            return res.status(405).jsonp({
                error: err.message
            });
        }

        return res.status(200).jsonp({
            data: result.rows
        });
    });
});

module.exports = router;