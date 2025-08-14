const db = require("../config/db");

// @desc Add new property
exports.addProperty = (req, res) => {
  const {
    host_id,
    title,
    description,
    location,
    price,
    max_guests,
    bedrooms,
    bathrooms,
    property_type,
    status,
  } = req.body;

  const imagePaths = req.files.map((file) => `/uploads/${file.filename}`);

  const sql = `
    INSERT INTO properties 
    (host_id, title, description, location, price, max_guests, bedrooms, bathrooms, property_type, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    host_id || 1,
    title,
    description,
    location,
    price,
    max_guests,
    bedrooms,
    bathrooms,
    property_type,
    status,
  ];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: "Failed to add property" });

    const propertyId = result.insertId;
    const imageSql = `INSERT INTO property_images (property_id, image_url) VALUES ?`;
    const imageValues = imagePaths.map((url) => [propertyId, url]);

    db.query(imageSql, [imageValues], (imgErr) => {
      if (imgErr)
        return res.status(500).json({ error: "Failed to save images" });

      res.status(201).json({ message: "Property added successfully" });
    });
  });
};

// @desc Get all properties
exports.getProperties = (req, res) => {
  const sql = `
    SELECT p.*, GROUP_CONCAT(i.image_url) AS images
    FROM properties p
    LEFT JOIN property_images i ON p.property_id = i.property_id
    GROUP BY p.property_id
    ORDER BY p.created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Failed to fetch properties" });
    res.json(results);
  });
};
