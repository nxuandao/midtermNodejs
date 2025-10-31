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

router.get('/', (req, res) => {
    res.render('reservation', {title: 'Danh sách lịch đặt'});
});

router.get('/data/:date?', (req, res) => {
    const date = req.params.date;
    if (date) {
        pool.query(
            `SELECT * FROM reservation 
             WHERE thoi_gian_bat_dau::date = $1::date
             ORDER BY thoi_gian_bat_dau`,
            [date],  
            (err, reservationResult) => {
                if (err) {
                    return res.status(500).json({
                        error: err.message
                    });
                }
                return res.status(200).json({
                    reservations: reservationResult.rows
                });
            }
        );
    } else {
        return res.status(404).json({ error: "Date parameter is missing" });
    }
});

// Route để thêm lịch đặt
router.post('/add', (req, res) => {
    const { tenKhachHang, soDienThoai, soNguoi, soBan, mucDich, ghiChu, thoiGianBatDau, thoiGianKetThuc } = req.body;
    const soBanValue = soBan || null;
    pool.query(
        'INSERT INTO reservation (ten_khach_hang, so_dien_thoai, so_nguoi, so_ban, muc_dich, ghi_chu, thoi_gian_bat_dau, thoi_gian_ket_thuc) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
        [tenKhachHang, soDienThoai, soNguoi, soBanValue, mucDich, ghiChu, thoiGianBatDau, thoiGianKetThuc],
        (err, result) => {
            if (err) {
                console.error('Lỗi truy vấn SQL:', err);
                return res.status(500).send('Internal Server Error');
            }
            const newReservationId = result.rows[0].id;
            res.status(201).json({ message: `Lịch đặt đã được thêm thành công với id: ${newReservationId}` });
        }
    );
});

// Route để xóa lịch đặt
router.delete('/:id', (req, res) => {
    const reservationId = req.params.id;

    pool.query(
        'DELETE FROM reservation WHERE id = $1',
        [reservationId],
        (err, result) => {
            if (err) {
                console.error('Lỗi truy vấn SQL:', err);
                return res.status(500).send('Internal Server Error');
            }

            if (result.rowCount === 0) {
                return res.status(404).json({ message: 'Lịch đặt không tồn tại' });
            }

            res.status(200).json({ message: `Lịch đặt với id ${reservationId} đã được xóa thành công` });
        }
    );
});

module.exports = router;




