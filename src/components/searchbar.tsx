import React, { useState } from "react";
import { Form, Button, InputGroup, Row, Col, Dropdown } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SearchBar: React.FC = () => {
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState(1);

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
            />
          </Col>

          {/* Check In */}
          <Col xs={6} sm={3} md={2} className="border-end">
            <Form.Label className="fw-bold text-dark mb-0" style={{ cursor: "pointer" }}>Check in</Form.Label>
            <DatePicker 
              selected={checkIn}
              onChange={(date) => setCheckIn(date)}
              placeholderText="Add dates"
              className="text-muted small border-0 w-100"
              
            />
          </Col>

          {/* Check Out */}
          <Col xs={6} sm={3} md={2} className="border-end">
            <Form.Label className="fw-bold text-dark mb-0" style={{ cursor: "pointer" }}>
              Check out
            </Form.Label>
            <DatePicker
              selected={checkOut}
              onChange={(date) => setCheckOut(date)}
              placeholderText="Add dates"
              className="text-muted small border-0 w-100"
            />
          </Col>

          {/* Guests */}
          <Col xs={12} sm={6} md={3} className="border-end">
            <Form.Label className="fw-bold text-dark mb-0" style={{ cursor: "pointer" }}>Guests</Form.Label>
            <Dropdown>
              <Dropdown.Toggle
                variant="light"
                className="border-0 w-100 text-muted small"
              >
                {guests} {guests === 1 ? "Guest" : "Guests"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {[1, 2, 3, 4, 5].map((num) => (
                  <Dropdown.Item key={num} onClick={() => setGuests(num)}>
                    {num} {num === 1 ? "Guest" : "Guests"}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>

          {/* Search Button */}
          <Col
            xs={12}
            sm={6}
            md={2}
            className="d-flex justify-content-center mt-2 mt-md-0"
          >
            <Button
              variant="danger"
              className="rounded-circle p-3 d-flex align-items-center justify-content-center"
              style={{
                backgroundColor: "#45526e",
                border: "none",
                transition: "0.3s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#45526e")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#45526e")
              }
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
