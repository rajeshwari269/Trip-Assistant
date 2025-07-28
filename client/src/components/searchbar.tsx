import React, { useState } from "react";
import {
  Form,
  Button,
  InputGroup,
  Row,
  Col,
  Dropdown,
  Badge,
} from "react-bootstrap";
import {
  FaSearch,
  FaFilter,
  FaTimes,
  FaStar,
  FaWifi,
  FaSwimmingPool,
  FaParking,
  FaUtensils,
  FaSnowflake,
  FaUmbrellaBeach,
  FaMountain,
  FaCity,
} from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SearchBar: React.FC = () => {
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState(1);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [rating, setRating] = useState<number | null>(null);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [locationType, setLocationType] = useState<string>("");
  const [where, setWhere] = useState("");

  const amenities = [
    { id: "wifi", name: "WiFi", icon: <FaWifi /> },
    { id: "pool", name: "Pool", icon: <FaSwimmingPool /> },
    { id: "parking", name: "Parking", icon: <FaParking /> },
    { id: "restaurant", name: "Restaurant", icon: <FaUtensils /> },
    { id: "ac", name: "AC", icon: <FaSnowflake /> },
  ];

  const locationTypes = [
    { id: "beach", name: "Beach", icon: <FaUmbrellaBeach /> },
    { id: "mountain", name: "Mountain", icon: <FaMountain /> },
    { id: "city", name: "City", icon: <FaCity /> },
  ];

  const handleAmenityToggle = (amenityId: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenityId)
        ? prev.filter((id) => id !== amenityId)
        : [...prev, amenityId]
    );
  };

  const handleSearch = () => {
    console.log("Search with filters:", {
      where,
      checkIn,
      checkOut,
      guests,
      priceRange,
      rating,
      selectedAmenities,
      locationType,
    });
  };

  const clearFilters = () => {
    setPriceRange({ min: "", max: "" });
    setRating(null);
    setSelectedAmenities([]);
    setLocationType("");
    setWhere("");
    setCheckIn(null);
    setCheckOut(null);
    setGuests(1);
  };

  const hasActiveFilters =
    priceRange.min ||
    priceRange.max ||
    rating ||
    selectedAmenities.length > 0 ||
    locationType;

  return (
    <div className="search-container" style={{ marginTop: "100px", padding: "0 20px" }}>
      {/* Main Search Bar */}
      <div className="d-flex justify-content-center mb-4">
        <div
          className="p-4 rounded-4 shadow-lg bg-white"
          style={{ 
            maxWidth: "1000px", 
            width: "100%",
            border: "2px solid #45526e",
            transition: "all 0.3s ease"
          }}
        >
          <Row className="w-100 align-items-end g-3">
            {/* Where Input */}
            <Col xs={12} sm={6} md={3}>
              <Form.Label className="fw-bold text-muted mb-2">
                Where
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Search places"
                className="border-0 p-3 rounded-3"
                value={where}
                onChange={(e) => setWhere(e.target.value)}
                style={{ fontSize: "0.95rem" }}
              />
            </Col>

            {/* Check In */}
            <Col xs={6} sm={3} md={2}>
              <Form.Label className="fw-bold text-dark mb-2">
                Check in
              </Form.Label>
              <DatePicker
                selected={checkIn}
                onChange={(date) => setCheckIn(date)}
                placeholderText="Add dates"
                className="border-0 w-100 p-3 rounded-3"
              />
            </Col>

            {/* Check Out */}
            <Col xs={6} sm={3} md={2}>
              <Form.Label className="fw-bold text-dark mb-2">
                Check out
              </Form.Label>
              <DatePicker
                selected={checkOut}
                onChange={(date) => setCheckOut(date)}
                placeholderText="Add dates"
                className="border-0 w-100 p-3 rounded-3"
              />
            </Col>

            {/* Guests */}
            <Col xs={12} sm={6} md={3}>
              <Form.Label className="fw-bold text-dark mb-2">
                Guests
              </Form.Label>
              <Dropdown>
                <Dropdown.Toggle
                  variant="light"
                  className="border-0 w-100 text-muted p-3 text-start rounded-3"
                  style={{ fontSize: "0.95rem" }}
                >
                  {guests} {guests === 1 ? "Guest" : "Guests"}
                </Dropdown.Toggle>
                <Dropdown.Menu className="w-100">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <Dropdown.Item
                      key={`guest-${num}`}
                      onClick={() => setGuests(num)}
                    >
                      {num} {num === 1 ? "Guest" : "Guests"}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>

            {/* Advanced Filters Toggle */}
            <Col xs={6} sm={3} md={1}>
              <Form.Label className="fw-bold text-dark mb-2 d-block text-center">
                Filters
              </Form.Label>
              <div className="d-flex justify-content-center">
                <Button
                  variant={hasActiveFilters ? "primary" : "outline-secondary"}
                  className="rounded-circle d-flex align-items-center justify-content-center position-relative"
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  style={{ 
                    width: "45px", 
                    height: "45px",
                    transition: "all 0.3s ease"
                  }}
                >
                  <FaFilter size={16} />
                  {hasActiveFilters && (
                    <Badge 
                      bg="danger" 
                      className="position-absolute top-0 start-100 translate-middle"
                      style={{ 
                        fontSize: "0.6rem", 
                        transform: "translate(-50%, -50%)",
                        minWidth: "18px",
                        height: "18px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      {
                        [
                          priceRange.min,
                          priceRange.max,
                          rating,
                          selectedAmenities.length,
                          locationType,
                        ].filter(Boolean).length
                      }
                    </Badge>
                  )}
                </Button>
              </div>
            </Col>

            {/* Search Button */}
            <Col xs={6} sm={3} md={1}>
              <Form.Label className="fw-bold text-dark mb-2 d-block text-center">
                Search
              </Form.Label>
              <div className="d-flex justify-content-center">
                <Button
                  variant="danger"
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    backgroundColor: "#45526e",
                    border: "none",
                    transition: "all 0.3s ease",
                    width: "45px",
                    height: "45px",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "#2c3e50")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = "#45526e")
                  }
                  onClick={handleSearch}
                >
                  <FaSearch size={18} className="text-white" />
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      {/* Advanced Filters Section */}
      {showAdvancedFilters && (
        <div className="d-flex justify-content-center mb-4">
          <div
            className="p-4 rounded-4 shadow-lg bg-white w-100"
            style={{ 
              maxWidth: "1000px", 
              border: "2px solid #45526e",
              animation: "slideDown 0.3s ease-out"
            }}
          >
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h6 className="mb-0 fw-bold text-dark">
                <FaFilter className="me-2" />
                Advanced Filters
              </h6>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={clearFilters}
                className="d-flex align-items-center gap-2"
                style={{ fontSize: "0.85rem" }}
              >
                <FaTimes />
                Clear All
              </Button>
            </div>

            <Row className="g-4">
              {/* Price Range */}
              <Col xs={12} sm={6} md={3}>
                <Form.Label className="fw-bold text-dark mb-3">Price Range (₹)</Form.Label>
                <Row className="g-2">
                  <Col xs={6}>
                    <Form.Control
                      type="number"
                      placeholder="Min"
                      value={priceRange.min}
                      onChange={(e) =>
                        setPriceRange((prev) => ({
                          ...prev,
                          min: e.target.value,
                        }))
                      }
                      className="rounded-3 p-2"
                    />
                  </Col>
                  <Col xs={6}>
                    <Form.Control
                      type="number"
                      placeholder="Max"
                      value={priceRange.max}
                      onChange={(e) =>
                        setPriceRange((prev) => ({
                          ...prev,
                          max: e.target.value,
                        }))
                      }
                      className="rounded-3 p-2"
                    />
                  </Col>
                </Row>
              </Col>

              {/* Rating */}
              <Col xs={12} sm={6} md={3}>
                <Form.Label className="fw-bold text-dark mb-3">Rating</Form.Label>
                <Dropdown>
                  <Dropdown.Toggle 
                    variant="light" 
                    className="w-100 text-start rounded-3 border p-2"
                    style={{ fontSize: "0.9rem" }}
                  >
                    {rating ? (
                      <span className="d-flex align-items-center gap-2">
                        <FaStar className="text-warning" />
                        {rating}+ Stars
                      </span>
                    ) : (
                      "Select Rating"
                    )}
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="w-100">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <Dropdown.Item
                        key={`rating-${star}`}
                        onClick={() => setRating(star)}
                        className="d-flex align-items-center gap-2"
                      >
                        <FaStar className="text-warning" />
                        {star}+ Stars
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>

              {/* Location Type */}
              <Col xs={12} sm={6} md={3}>
                <Form.Label className="fw-bold text-dark mb-3">Location Type</Form.Label>
                <Dropdown>
                  <Dropdown.Toggle 
                    variant="light" 
                    className="w-100 text-start rounded-3 border p-2"
                    style={{ fontSize: "0.9rem" }}
                  >
                    {locationType ? (
                      <span className="d-flex align-items-center gap-2">
                        {locationTypes.find((lt) => lt.id === locationType)?.icon}
                        {locationTypes.find((lt) => lt.id === locationType)?.name}
                      </span>
                    ) : (
                      "Select Type"
                    )}
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="w-100">
                    {locationTypes.map((type) => (
                      <Dropdown.Item
                        key={`type-${type.id}`}
                        onClick={() => setLocationType(type.id)}
                        className="d-flex align-items-center gap-2"
                      >
                        {type.icon}
                        {type.name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>

              {/* Amenities */}
              <Col xs={12} sm={6} md={3}>
                <Form.Label className="fw-bold text-dark mb-3">Amenities</Form.Label>
                <div className="d-flex flex-wrap gap-2">
                  {amenities.map((amenity) => (
                    <Button
                      key={amenity.id}
                      variant={
                        selectedAmenities.includes(amenity.id)
                          ? "primary"
                          : "outline-secondary"
                      }
                      size="sm"
                      onClick={() => handleAmenityToggle(amenity.id)}
                      className="d-flex align-items-center gap-1 rounded-3"
                      style={{ 
                        fontSize: "0.8rem",
                        transition: "all 0.2s ease"
                      }}
                    >
                      {amenity.icon}
                      <span className="d-none d-sm-inline">{amenity.name}</span>
                    </Button>
                  ))}
                </div>
              </Col>
            </Row>

            {/* Active Filters Display */}
            {hasActiveFilters && (
              <div className="mt-4 pt-4 border-top">
                <h6 className="fw-bold mb-3 text-dark">
                  <FaFilter className="me-2" />
                  Active Filters:
                </h6>
                <div className="d-flex flex-wrap gap-2">
                  {priceRange.min && (
                    <Badge
                      bg="info"
                      className="d-flex align-items-center gap-2 px-3 py-2"
                      style={{ fontSize: "0.8rem" }}
                    >
                      Min: ₹{priceRange.min}
                      <FaTimes
                        size={12}
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          setPriceRange((prev) => ({ ...prev, min: "" }))
                        }
                      />
                    </Badge>
                  )}
                  {priceRange.max && (
                    <Badge
                      bg="info"
                      className="d-flex align-items-center gap-2 px-3 py-2"
                      style={{ fontSize: "0.8rem" }}
                    >
                      Max: ₹{priceRange.max}
                      <FaTimes
                        size={12}
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          setPriceRange((prev) => ({ ...prev, max: "" }))
                        }
                      />
                    </Badge>
                  )}
                  {rating && (
                    <Badge
                      bg="warning"
                      className="d-flex align-items-center gap-2 px-3 py-2"
                      style={{ fontSize: "0.8rem" }}
                    >
                      <FaStar />
                      {rating}+ Stars
                      <FaTimes
                        size={12}
                        style={{ cursor: "pointer" }}
                        onClick={() => setRating(null)}
                      />
                    </Badge>
                  )}
                  {locationType && (
                    <Badge
                      bg="success"
                      className="d-flex align-items-center gap-2 px-3 py-2"
                      style={{ fontSize: "0.8rem" }}
                    >
                      {locationTypes.find((lt) => lt.id === locationType)?.icon}
                      {locationTypes.find((lt) => lt.id === locationType)?.name}
                      <FaTimes
                        size={12}
                        style={{ cursor: "pointer" }}
                        onClick={() => setLocationType("")}
                      />
                    </Badge>
                  )}
                  {selectedAmenities.map((amenityId) => (
                    <Badge
                      key={amenityId}
                      bg="secondary"
                      className="d-flex align-items-center gap-2 px-3 py-2"
                      style={{ fontSize: "0.8rem" }}
                    >
                      {amenities.find((a) => a.id === amenityId)?.icon}
                      {amenities.find((a) => a.id === amenityId)?.name}
                      <FaTimes
                        size={12}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleAmenityToggle(amenityId)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .search-container {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        @media (max-width: 768px) {
          .search-container {
            padding: 0 15px;
          }
        }
        
        @media (max-width: 576px) {
          .search-container {
            padding: 0 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default SearchBar;
