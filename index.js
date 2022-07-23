const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json());

// ROUTES //

// create koleksi doa
app.post("/koleksidoa", async (req, res) => {
  try {
    const { name } = req.body;
    const newKoleksiDoa = await pool.query(
      "INSERT INTO `KoleksiDoa` (`Name`) VALUES (?)",
      [name]
    );
    res.json(newKoleksiDoa);
  } catch (err) {
    console.error(err.message);
  }
});

// get all koleksi doa
app.get("/koleksiDoa", async (req, res) => {
  try {
    const koleksiDoa = await pool.query("SELECT * FROM `KoleksiDoa`");
    res.json(koleksiDoa[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// get a koleksi doa
app.get("/koleksiDoa/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const doa = await pool.query("SELECT * FROM `KoleksiDoa` WHERE `Id` = ?", [
      id,
    ]);

    res.json(doa[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// update a koleksi doa
app.put("/koleksiDoa/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, isActive } = req.body;

    const updateDoa = await pool.query(
      "UPDATE `KoleksiDoa` SET `Name` = ?, `IsActive` = ? WHERE `Id` = ?",
      [name, isActive, id]
    );

    res.json(`Updated KoleksiDoa with Id = ${id}`);
  } catch (err) {
    console.error(err.message);
  }
});

// delete a koleksi doa
app.delete("/koleksiDoa/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteDoa = await pool.query(
      "DELETE FROM `KoleksiDoa` WHERE `Id` = ?",
      [id]
    );

    res.json(`Deleted KoleksiDoa with Id = ${id}`);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5000, () => {
  console.log("meaning-of-life-api server is running on port 5000 ok");
});
