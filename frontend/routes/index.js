var express = require('express');
const request = require('request');
const restApiUrl = process.env.API_URL;
var router = express.Router();

// Route để render trang chủ
router.get('/', function(req, res) {
    // Lấy danh sách categories từ API
    request(`${restApiUrl}/category`, {
        method: "GET",
    }, function(err, resp, body) {
        if (!err && resp.statusCode === 200) {
            var objData = JSON.parse(body);
            var categories = objData.data;

            // Duyệt qua từng category và lấy sản phẩm tương ứng
            let categoryPromises = categories.map(category => {
                return new Promise((resolve, reject) => {
                    // Lấy sản phẩm cho mỗi category
                    request(`${restApiUrl}/category/${category.id}`, {
                        method: "GET",
                    }, function(err, resp, body) {
                        if (!err && resp.statusCode === 200) {
                            var productData = JSON.parse(body);
                            category.products = productData.data; // Thêm sản phẩm vào category
                            resolve(category);
                        } else {
                            reject(new Error("Error retrieving products"));
                        }
                    });
                });
            });

            // Chờ đợi tất cả các promises hoàn thành
            Promise.all(categoryPromises).then((updatedCategories) => {
                // Truyền dữ liệu vào template HBS
                res.render('index', { categories: updatedCategories, title: 'Trang chủ' });
            }).catch((error) => {
                console.log(error);
                res.status(500).send("Error retrieving products");
            });

        } else {
            console.log(err);
            res.status(500).send("Error retrieving categories");
        }
    });
});

module.exports = router;