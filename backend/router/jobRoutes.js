const express = require("express");
const router = express.Router();
const Admin = require("../models/admin");
const Company = require("../models/company");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  console.log("Test is working!");
  res.send("Test is working!");
});

// router.post("/register", async (req, res) => {
//   const { email, password } = req.body;
//   const createAdmin = await Admin.create({ email, password });

//   if (createAdmin) {
//     console.log("Admin created");
//     res.status(201).json(createAdmin);
//   } else {
//     console.log("Admin not created");
//   }
// });

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Admin.find({ email, password });

    if (user) {
      jwt.sign({ ...user }, process.env.SECRET_TOKEN, {}, (err, token) => {
        if (err) {
          console.log("Token is required");
        }

        res.cookie("access_token", token).json({ msg: "User logined!" });
      });
    } else {
      res.status(404).json({ msg: "Wrong Creadenatials" });
    }
  } catch (error) {
    console.log("Login Error!", error.message);
  }
});

router.get("/profile", async (req, res) => {
  const { access_token } = await req.cookies;

  if (access_token) {
    jwt.verify(
      { access_token },
      process.env.SECRET_TOKEN,
      {},
      (err, decoded) => {
        if (err) {
          console.log("Token is required");
        }

        res.status(200).json(decoded);
      }
    );
  }
});

//Job Details & Tracking
router.get("/company", async (req, res) => {
  const allCompany = await Company.find({});
  if (allCompany) {
    res.status(200).json(allCompany);
  } else {
    console.log("All Company list error");
  }
});

router.post("/company", async (req, res) => {
  const {
    appliedDate,
    companyName,
    companyLink,
    companySize,
    glassdoorLink,
    location,
    status,
    platform,
    notes,
  } = req.body;

  try {
    const data = {
      appliedDate,
      companyName,
      companyLink,
      companySize,
      glassdoorLink,
      location,
      status,
      platform,
      notes,
    };

    const newCompany = await Company.create(data);

    if (newCompany) {
      res.status(201).json(newCompany);
    } else {
      console.log("Company not added!");
    }
  } catch (error) {
    console.log("Create Error!" + error.message);
  }
});

router.get("/company/:id", async (req, res) => {
  const { id } = await req.params;
  const singleCompany = await Company.findById({ _id: id });

  if (singleCompany) {
    res.status(200).json(singleCompany);
  } else {
    console.log("All Company list error");
  }
});

router.put("/company/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const existing = await Company.findById({ _id: id });

    if (existing) {
      const {
        appliedDate,
        companyName,
        companyLink,
        companySize,
        glassdoorLink,
        location,
        status,
        platform,
        notes,
      } = req.body;

      const updatedCompany = await Company.updateOne(
        { _id: id },
        {
          $set: {
            appliedDate: appliedDate || existing.appliedDate,
            companyName: companyName || existing.companyName,
            companyLink: companyLink || existing.companyLink,
            companySize: companySize || existing.companySize,
            glassdoorLink: glassdoorLink || existing.glassdoorLink,
            location: location || existing.location,
            status: status || existing.status,
            platform: platform || existing.platform,
            notes: notes || existing.notes,
            updateAt: Date.now(),
          },
        },
        {
          new: true,
          lean: true,
        }
      );

      if (!updatedCompany) {
        console.log("Company not updated");
      }

      res.status(200).json(updatedCompany);
    } else {
      console.log("Company ID not found!");
    }
  } catch (error) {
    console.log("Update Error!" + error.message);
  }
});

module.exports = router;
