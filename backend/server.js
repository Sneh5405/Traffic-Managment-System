const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.get("/api/data", (req, res) => {
  res.json({ message: "Hello from backend" });
});

app.get("/api/sensor-data", async (req, res) => {
  try {
    const sensorData = await prisma.sensorData.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(sensorData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to fetch sensor data" });
  }
});

app.post("/api/sensor-data", async (req, res) => {
  const { street, sector, queueLength, coConcentration } = req.body;

  if (!street || !sector || queueLength == null || coConcentration == null) {
    return res
      .status(400)
      .json({
        error: "street, sector, queueLength, and coConcentration are required",
      });
  }

  try {
    const newSensorData = await prisma.sensorData.create({
      data: {
        street,
        sector,
        queueLength: parseInt(queueLength, 10),
        coConcentration: parseFloat(coConcentration),
      },
    });

    res.status(201).json(newSensorData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to save sensor data" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
