import React, { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
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
    items: [
      {
        id: 1,
        name: "Coorg County Resorts",
        image:
          " https://res.cloudinary.com/simplotel/image/upload/x_0,y_0,w_1024,h_768,r_0,c_crop,q_80,fl_progressive/w_900,f_auto,c_fit/coorg-county-resort-spa/WhatsApp_Image_2023-12-08_at_9.02.48_PM_s4h1c9 ",
        price: "₹26,996 night",
        mapLink:
          "https://www.google.com/maps?q=9-138,+behind+coorg+international+hotel,+convent+layout,+vijayanagara,+Madikeri,+India",

        rating: 5.0,
      },
      {
        name: "Madikeri Resort",
        image:
          "https://www.holidify.com/images/cmsuploads/compressed/317753_15120114400038153675_20230310203730.jpg",
        price: "₹28,000 night",
        mapLink: "https://www.google.com/maps?q=Madikeri,Near+Coorg,India",
        rating: 4.5,
      },
      {
        name: "Kushalnagar Stay",
        image:
          "https://media1.thrillophilia.com/filestore/htvnt2ooevpg53olur93pbatcy9h_b0af3f026f3d11e798fc0a4cef95d023.webp?w=400&h=300",
        price: "₹24,996 night",
        mapLink:
          "https://www.google.com/maps?q=2-279,2nd+Block,B.M+Road,Opp:Old+Venkateshwara+Theatre,Kushalnagar,India",
        rating: 4.0,
      },
      {
        name: "Whispering Pines Cabin, Manali",
        image:
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/581074928.jpg?k=dfd94227e2d92f143fc669d7eaa9547e444bb7db4762ed836f2fe75f92854115&o=&hp=1",
        price: "₹9,500 night",
        mapLink: "https://www.google.com/maps?q=Raja’s+Seat+garden,+Madikeri",
        rating: 4.7,
      },
    ],
  },

  {
    name: "Icons",
    icon: <FaStar />,
    items: [
      {
        name: "Raja’s Seat Garden",
        image:
          "https://thumbs.dreamstime.com/b/raja-seat-coonoor-india-coorg-december-raja-s-seat-seasonal-garden-flowers-artificial-fountains-one-most-89357669.jpg",
        price: "N/A",
        mapLink: "https://www.google.com/maps?q=Raja’s+Seat+garden,+Madikeri",
        rating: 5.0,
      },
      {
        name: "Abbey Waterfalls",
        image:
          "https://static.toiimg.com/thumb/58374245/Abbey-Falls.jpg?width=1200&height=800",
        price: "N/A",
        mapLink: "https://www.google.com/maps?q=Abbey+Waterfalls,+Madikeri",
        rating: 5.0,
      },
      {
        name: "Iruppu Waterfalls",
        image:
          "https://travelsetu.com/apps/uploads/new_destinations_photos/destination/2023/12/21/6bbb335019e9c1e75729d28400c91821_1000x1000.jpg",
        price: "N/A",
        mapLink: "https://www.google.com/maps?q=Iruppu+Waterfalls+Brhmagiri",
        rating: 5.0,
      },
      {
        name: "Taj Lake Palace, Udaipur",
        image:
          "https://etimg.etb2bimg.com/thumb/msid-104080467,imgsize-51068,width-1200,height=765,overlay-ethospitality/hotels/a-culinary-odyssey-at-taj-lake-palace-udaipur.jpg",
        price: "₹48,000 night",
        mapLink: "https://www.google.com/maps?q=Taj+Lake+Palace,+Udaipur",
        rating: 5,
      },
    ],
  },
  {
    name: "Amazing Views",
    icon: <FaImage />,
    items: [
      {
        name: "Taj Mahal",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Taj_Mahal_%28Edited%29.jpeg/640px-Taj_Mahal_%28Edited%29.jpeg",
        price: "N/A",
        mapLink: "https://www.google.com/maps?q=Taj+Mahal+Agra",
        rating: 5.0,
      },
      {
        name: "Golconda Fort",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjlvORkdyhBGEfGd1BQfILNraJihFVosyujA&s",
        price: "N/A",
        mapLink: "https://www.google.com/maps?q=Golconda+Fort,Hyderabad",
        rating: 5.0,
      },
      {
        name: "Hussain Sagar Lake",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSq0y0mXTh0N9-SvHbbOv-3FMq_gI3h8oi7Q&s",
        price: "N/A",
        mapLink: "https://www.google.com/maps?q=Hussain+Sagar+Lake,Hyderabad",
        rating: 5.0,
      },
      {
        name: "Treehouse Hideaway, Bandhavgarh",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUAldlTBGVSqUCIoM5a01PqTmfqv28xa6yGw&s",
        price: "₹12,000 night",
        mapLink:
          "https://www.google.com/maps?q=Treehouse+Hideaway,+Bandhavgarh",
        rating: 4.8,
      },
    ],
  },
  {
    name: "Beachfront",
    icon: <FaUmbrellaBeach />,
    items: [
      {
        name: "Goa Beach",
        image:
          "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcQbrlxcVLR0DLoHHitk5ihgHHcxv6_LFaRhm4zybgRLg7Jmld17meO3TFyRTTLQlhrHOaMHZY4sfQd-HdgKKabf6gHByhCIBg6BhTo3mME",
        price: "N/A",
        mapLink: "https://www.google.com/maps?q=Goa+Beach",
        rating: 5.0,
      },
      {
        name: "Digha Beach",
        image:
          "https://hblimg.mmtcdn.com/content/hubble/img/desttvimg/mmt/destination/m_Digha_tv_destination_img_2_l_736_1256.jpg",
        price: "N/A",
        mapLink: "https://www.google.com/maps?q=Digha+Beach,West+Bengal",
        rating: 5.0,
      },
      {
        name: "Lakshadweep Beach",
        image:
          "https://c.ndtvimg.com/2022-05/8h581mm8_lakshadweep_625x300_11_May_22.jpg?downsize=545:307",
        price: "N/A",
        mapLink: "https://www.google.com/maps?q=Lakshadweep+Beach",
        rating: 5.0,
      },
      {
        name: "Marbela Beach Resort, Goa",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7epWasbj-wFZr_gUiKmmJY7V2obEqB2pgqw&s",
        price: "₹14,500 night",
        mapLink: "https://www.google.com/maps?q=Marbela+Beach+Resort,+Goa",
        rating: 4.6,
      },
    ],
  },
];
const ChildNavbar: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <Container fluid className="bg-light py-3">
        {/* Sidebar Toggle Button (Shown on Small Screens) */}
        <Button
          className="d-lg-none mb-3 fw-bold text-white border-0 px-4 py-2"
          style={{
            backgroundColor: "#45526e",
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
          style={{ backgroundColor: "#45526e" }}
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
                    {category.icon}{" "}
                    <span className="ms-2">{category.name}</span>
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
                  (e.currentTarget.style.backgroundColor = "#45526e")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    selectedCategory === category.name ? "#45526e" : "white")
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
          <Container className="mt-4  ">
            <h4 className="text-center mb-3">{selectedCategory}</h4>
            <Row className="g-3">
              {categories
                .find((category) => category.name === selectedCategory)
                ?.items.map((item, index) => (
                  <Col xs={12} sm={6} md={4} lg={3} key={item.id}>
                    <Card className="shadow-lg border-0 rounded-4 custom-card">
                      <Card.Img
                        variant="top"
                        src={item.image} // Updated to use item.image
                        alt={item.name} // Updated to use item.name
                        className="rounded-top-4"
                      />
                      <Card.Body>
                        <div className="d-flex align-items-center justify-content">
                          <Card.Title
                            className="mb-0"
                            style={{
                              fontFamily:
                                " font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif",
                            }}
                          >
                            {item.name}
                          </Card.Title>{" "}
                          {/* Ensure no extra margin */}
                          <a
                            href={item.mapLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-decoration-none"
                          >
                            <FaMapMarkerAlt />
                          </a>
                        </div>
                        <Card.Text className="text-muted">
                          <strong>Price:</strong> {item.price} <br />
                          <strong>
                            <FaStar style={{ color: "gold" }} />
                          </strong>{" "}
                          {item.rating}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
            </Row>
          </Container>
        )}
      </Container>
      <style>{`
        .custom-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .custom-card:hover {
          transform: scale(1.05);
          box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
          background-color: rgba(0, 0, 0, 0.05);
        }
      `}</style>
    </>
  );
};

export default ChildNavbar;
