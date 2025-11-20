import express from "express";
import { pool } from "../db.js";

const router = express.Router();

// GET all data
router.get("/", async (req, res) => {
    try {
        const [rows] = await pool.query(
            "SELECT id, tanggal, jumlah, cuaca, suhu FROM pengunjung_rinjani ORDER BY tanggal ASC"
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// INSERT data
router.post("/", async (req, res) => {
    try {
        const { tanggal, jumlah, cuaca, suhu } = req.body;

        if (!tanggal || !jumlah)
            return res.status(400).json({ error: "tanggal & jumlah wajib diisi" });

        const [result] = await pool.query(
            "INSERT INTO pengunjung_rinjani (tanggal, jumlah, cuaca, suhu) VALUES (?, ?, ?, ?)",
            [tanggal, jumlah, cuaca, suhu]
        );

        res.json({ id: result.insertId, tanggal, jumlah, cuaca, suhu });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
