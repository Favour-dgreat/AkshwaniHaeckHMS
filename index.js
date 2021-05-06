const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3010;
const data = require("./hms-data.js");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Query API
app.get("/api/drugs/:id", (req, res) => {
	const sickness = req.params.id;
	console.log(sickness);
	if (sickness.toLowerCase() in data) {
		return res.status(200).send(data[sickness.toLowerCase()]);
	}
	res.status(200).send(""); // Sending empty responses for easy oracle condition
});

// 404
app.use((req, res, next) => res.status(404).send(""));

// All Error Handler
app.use((
	err,
	req,
	res,
	next // eslint-disable-line
) => res.status(err.status || 500).send(""));

app.listen(PORT, () => console.log(`App is live on and running ${PORT}`));
