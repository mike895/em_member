
const express = require("express");
const router = express.Router();
const needle = require("needle");
const checkAuth = require("../middleware/check-auth");
const checkUCRelation = require("../middleware/check-UCRelation");
const frappeUrl = process.env.frappeUrl;

//${frappeUrl}/api/resource/Vehicle?filters=[["user_id","=","${req.user_id}"]]
//getallVechiles
router.get("/", checkAuth, (req, res, next) => {
  if (req.isAnonymous) {
    res.status(401).json({ message: "Unauthorized action" });
  } else
    needle.get(
      `${frappeUrl}/api/resource/Vehicle?fields=["model","plate_no","name","type","company_id","user_id","color","chasis","mileage","car_image","chasis_image"]&filters=[["user_id","=","${req.user_id}"]]`,
      (err, ress, body) => {
        if (err) {
          res.status(ress.statusCode).json({ error: err });
        } else {
          // console.log(body);
          return res.status(ress.statusCode).json(body);
        }
      }
    );
});

router.get("/private", checkAuth, (req, res, next) => {
  if (req.isAnonymous) {
    res.status(401).json({ message: "Unauthorized action" });
  } else
    needle.get(
      `${frappeUrl}/api/resource/Vehicle?fields=["model","plate_no","name","type","company_id","user_id","color","chasis","mileage","car_image","chasis_image"]&filters=[["user_id","=","${req.user_id}"],["type","=","Private"]]`,
      (err, ress, body) => {
        if (err) {
          res.status(ress.statusCode).json({ error: err });
        } else {
          // console.log(body);
          return res.status(ress.statusCode).json(body);
        }
      }
    );
});

router.get("/models", checkAuth, (req, res) => {
  if (req.isAnonymous) {
    res.status(401).json({ message: "Unauthorized action" });
  } else
    needle.get(
      `${frappeUrl}/api/resource/Vehicle Model?fields=["name","image"]&limit_page_length=0`,
      (err, ress, body) => {
        if (err) {
          res.status(ress.statusCode).json({ error: err });
        } else {
          // console.log(body);
          return res.status(ress.statusCode).json(body);
        }
      }
    );
});

router.get("/company/:companyId", checkAuth, (req, res, next) => {
  if (req.isAnonymous) {
    res.status(401).json({ message: "Unauthorized action" });
  } else
    needle.get(
      `${frappeUrl}/api/resource/Vehicle?fields=["model","plate_no","name","type","company_id","user_id","color","chasis","mileage","car_image","chasis_image"]&filters=[["user_id","=","${req.user_id}"],["company_id","=","${req.params.companyId}"]]`,
      (err, ress, body) => {
        if (err) {
          res.status(ress.statusCode).json({ error: err });
        } else {
          // console.log(body);
          return res.status(ress.statusCode).json(body);
        }
      }
    );
});

//getsingleVechile
router.get("/:vehicleID", checkAuth, (req, res, next) => {
  if (req.isAnonymous) {
    res.status(401).json({ message: "Unauthorized action" });
  } else
    needle.get(
      `${frappeUrl}/api/resource/Vehicle/${req.params.vehicleID}`,
      (err, ress, body) => {
        if (err) {
          res.status(ress.statusCode).json({ error: err });
        } else {
          // console.log(body);
          return res.status(ress.statusCode).json(body);
        }
      }
    );
});

//vechile registration
//checkAuth,checkUCRelation,
router.post("/", checkAuth, (req, res, next) => {
  if (req.isAnonymous) {
    res.status(401).json({ message: "Unauthorized action" });
  } else
    needle.post(
      `${frappeUrl}/api/resource/Vehicle`,
      {
        model: req.body.model,
        plate_no: req.body.plate_no,
        type: req.body.type,
        company_id: req.body.company_id,
        user_id: req.user_id, //needs middleware
        mileage: req.body.mileage,
        chasis: req.body.chasis,
        car_image: req.body.car_image,
        chasis_image: req.body.chasis_image,
      },
      { json: true },
      (errr, ress) => {
        if (errr) {
          console.log("fporkprovrpov");
          res.status(ress.statusCode).json({ error: errr });
        } else {
          console.log("Vechile Added");
          res.status(ress.statusCode).json(ress.body);
        }
      }
    );
});

//vechile delete
router.delete("/:vehicleID", checkAuth, (req, res, next) => {
  if (req.isAnonymous) {
    res.status(401).json({ message: "Unauthorized action" });
  } else
    needle.delete(
      `${frappeUrl}/api/resource/Vehicle/${req.params.vehicleID}`,
      { json: true },
      (err, ress) => {
        if (err) {
          res.status(ress.statusCode).json({ error: err });
        } else {
          res.status(ress.statusCode).json(ress.body);
        }
      }
    );
});

//vechile editing
router.put("/edit/:vehicleID", checkAuth, (req, res, next) => {
  if (req.isAnonymous) {
    res.status(401).json({ message: "Unauthorized action" });
  } else
    needle.put(
      `${frappeUrl}/api/resource/Vehicle/${req.params.vehicleID}`,
      req.body,
      { json: true },
      (errr, ress) => {
        if (errr) {
          res.status(501).json({ error: errr });
        } else {
          //console.log("am here")
          console.log(ress.body);
          res.status(200).json(ress.body);
        }
      }
    );
});

module.exports = router;

