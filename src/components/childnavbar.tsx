import React, { useState } from "react";
import {
  Container,
  Nav,
  Card,
  Row,
  Col,
  Button,
  Offcanvas,
} from "react-bootstrap";
import {
  FaBars,
  FaHome,
  FaStar,
  FaImage,
  FaUmbrellaBeach,
  FaGolfBall,
  FaTree,
  FaWarehouse,
  FaHouseUser,
} from "react-icons/fa";

const categories = [
  {
    name: "Cabins",
    icon: <FaHome />,
    items: ["Cozy Cabin", "Luxury Cabin", "Rustic Retreat"],
  },
  {
    name: "Icons",
    icon: <FaStar />,
    items: ["Famous Landmark", "Popular Spot", "Scenic Area"],
  },
  {
    name: "Amazing Views",
    icon: <FaImage />,
    items: ["Mountain View", "Skyline View", "Lakefront"],
  },
  {
    name: "Beachfront",
    icon: <FaUmbrellaBeach />,
    items: ["Seaside Resort", "Private Beach", "Ocean Villa"],
  },
  {
    name: "Domes",
    icon: <FaWarehouse />,
    items: ["Glamping Dome", "Eco Dome", "Luxury Dome"],
  },
  {
    name: "Golfing",
    icon: <FaGolfBall />,
    items: ["Golf Resort", "Championship Course", "Golf Villa"],
  },
  {
    name: "Treehouses",
    icon: <FaTree />,
    items: ["Jungle Treehouse", "Secluded Treehouse", "Luxury Treehouse"],
  },
  {
    name: "Mansions",
    icon: <FaHouseUser />,
    items: ["Private Mansion", "Luxury Estate", "Grand Villa"],
  },
];

const ChildNavbar: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <Container fluid className="bg-light py-3">
      {/* Sidebar Toggle Button (Shown on Small Screens) */}
      <Button
        className="d-lg-none mb-3 fw-bold text-white border-0 px-4 py-2"
        style={{
          backgroundColor: "#45526e", // Change this to match your theme
          borderRadius: "8px",
        }}
        onClick={() => setShowSidebar(true)}
      >
        <FaBars size={20} /> Menu
      </Button>

      {/* Sidebar Offcanvas */}
      <Offcanvas
        show={showSidebar}
        onHide={() => setShowSidebar(false)}
        placement="start"
        style={{ backgroundColor: "#45526e" }} // Light Gray background
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Categories</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            {categories.map((category, index) => (
              <Nav.Item key={index} className="mb-2">
                <Nav.Link
                  onClick={() => {
                    setSelectedCategory(category.name);
                    setShowSidebar(false);
                  }}
                  className={`text-dark d-flex align-items-center p-2 rounded-3 sidebar-item ${
                    selectedCategory === category.name
                      ? "bg-primary text-white"
                      : "bg-light"
                  }`}
                  style={{ cursor: "pointer" }}
                >
                  {category.icon} <span className="ms-2">{category.name}</span>
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Horizontal Navbar (Hidden on Small Screens) */}
      <Nav className="d-none d-lg-flex flex-row flex-nowrap overflow-auto justify-content-center">
        {categories.map((category, index) => (
          <Nav.Item key={index} className="px-3">
            <Nav.Link
              onClick={() => setSelectedCategory(category.name)}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#ff66b2")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor =
                  selectedCategory === category.name ? "#ff66b2" : "white")
              }
              className={`text-dark d-flex align-items-center p-2 rounded-3 shadow-sm ${
                selectedCategory === category.name ? "text-white" : "bg-white"
              }`}
              style={{ cursor: "pointer", transition: "0.3s ease-in-out" }}
            >
              {category.icon}{" "}
              <span className="ms-2 fw-bold">{category.name}</span>
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>

      {/* Cards Section */}
      {selectedCategory && (
        <Container className="mt-4">
          <h4 className="text-center mb-3">{selectedCategory}</h4>
          <Row className="g-3">
            {categories
              .find((category) => category.name === selectedCategory)
              ?.items.map((item, index) => (
                <Col xs={12} sm={6} md={4} lg={3} key={index}>
                  <Card className="shadow-lg border-0 rounded-4">
                    <Card.Img
                      variant="top"
                      src={`https://source.unsplash.com/random/300x200/?${selectedCategory}`}
                      alt={item}
                      className="rounded-top-4"
                    />
                    <Card.Body>
                      <Card.Title>{item}</Card.Title>
                      <Card.Text className="text-muted">
                        Beautiful {selectedCategory.toLowerCase()} spot.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
        </Container>
      )}
    </Container>
  );
};

export default ChildNavbar;
