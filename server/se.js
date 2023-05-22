const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const nodemailer = require("nodemailer");

function sendEmail(name, txt){

	let transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: "13hp02@gmail.com",
			pass: "avcbazabtvokbtrx"

		}
	})


	let mailOptions = {
		from : "13hp02@gmail.com",
		to: "phrushabh13@gmail.com",
		subject: "Enquiry from " + name,
		text: txt
	}

	transporter.sendMail(mailOptions, (err, info) => {
		if(err)
			console.log("mail err", err);
		else
			console.log("mail send", info.response);
	})
}

const app = express();
app.use(cors());
app.use(express.json());

app.post("/save", (req,res) =>{
	const url = "mongodb://0.0.0.0:27017";
	MongoClient.connect(url, (err,database) => {
		if(err){
			console.log(err);		
			res.send(err);
		}

		else{
			const dbo = database.db("enquiry");
			sendEmail(req.body.name, req.body.phone+" "+req.body.query);
			let data = { "name" : req.body.name, "phone": req.body.phone, "query": req.body.query};
			dbo.collection("student").insertOne(data, (err, result) => {
				if(err)  res.send(err);
				else     res.send(result);
			});
		}
	});
});

app.listen(9000, ()=> { console.log("ready");})