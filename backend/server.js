const express = require("express");
const cors = require("cors");

const simplifyDebts = require("./services/simplifyDebts");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("SplitWise Backend Running");
});

app.post("/simplify", (req, res) => {
    try {
        const transactions = req.body;

        const result = simplifyDebts(transactions);

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
