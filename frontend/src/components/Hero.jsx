import { Container, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export const Hero = () => {
  return (
    <div className=" py-5">
      <Container className="d-flex justify-content-center hero-container">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
          <h1 className="text-center mb-4">
            Welcome to our super secret messaging app!
          </h1>
          <p className="text-center mb-4">
            Join us to experience a unique messaging platform to connect with
            your peers
          </p>
          <div className="d-flex">
            <LinkContainer to="/login">
              <Button variant="primary" className="me-3">
                Sign In
              </Button>
            </LinkContainer>
            <LinkContainer to="/register">
              <Button variant="secondary">Register</Button>
            </LinkContainer>
          </div>
        </Card>
      </Container>
      <div className="message-btn-container">
        <LinkContainer to="/messages">
          <button className="message-btn">View Messages</button>
        </LinkContainer>
      </div>
    </div>
  );
};
