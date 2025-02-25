import React from "react";
import { Form, Button, InputGroup, Row, Col } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

const SearchBar: React.FC = () => {
  return (
    <div className="d-flex justify-content-center my-3">
      <InputGroup
        className="p-2 rounded-4 shadow-lg bg-white"
        style={{ maxWidth: "850px", border: "2px solid #45526e" }}
      >
        <Row className="w-100 align-items-center g-2">
          {/* Where Input */}
          <Col xs={12} sm={6} md={3} className="border-end">
            <Form.Label className="fw-bold text-muted mb-1">Where</Form.Label>
            <Form.Control
              type="text"
              placeholder="Search places"
              className="border-0 p-1 rounded-3"
              style={{ backgroundColor: "" }}
            />
          </Col>

          {/* Check In */}
          <Col xs={6} sm={3} md={2} className="border-end">
            <Form.Label className="fw-bold text-dark mb-0">Check in</Form.Label>
            <div className="text-muted small">Add dates</div>
          </Col>

          {/* Check Out */}
          <Col xs={6} sm={3} md={2} className="border-end">
            <Form.Label className="fw-bold text-dark mb-0">Check out</Form.Label>
            <div className="text-muted small">Add dates</div>
          </Col>

          {/* Guests */}
          <Col xs={12} sm={6} md={3} className="border-end">
            <Form.Label className="fw-bold text-dark mb-0">Guests</Form.Label>
            <div className="text-muted small">Add guests</div>
          </Col>

          {/* Search Button */}
          <Col xs={12} sm={6} md={2} className="d-flex justify-content-center mt-2 mt-md-0">
            <Button
              variant="danger"
              className="rounded-circle p-3 d-flex align-items-center justify-content-center"
              style={{
                backgroundColor: "#45526e",
                border: "none",
                transition: "0.3s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#45526e")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#45526e")}
            >
              <FaSearch size={18} className="text-white" />
            </Button>
          </Col>
        </Row>
      </InputGroup>
    </div>
  );
};

export default SearchBar;
