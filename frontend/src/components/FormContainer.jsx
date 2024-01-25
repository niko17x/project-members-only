import { Container, Row, Col } from "react-bootstrap";

export const FormContainer = ({ children }) => {
  return (
    <Container className="formContainer">
      <Row className="justify-content-md-center mt-5">
        <Col cs={12} md={6} className="card p-5">
          {children}
        </Col>
      </Row>
    </Container>
  );
};
