import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import "./auth.css";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerAPI } from "../../utils/ApiRequest";
import axios from "axios";
import logo from "../../assets/logo.png";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('user')){
      navigate('/');
    }
  }, [navigate]);

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };

  const handleChange = (e) => {
    setValues({...values , [e.target.name]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {name, email, password} = values;
    setLoading(false);
   
    const {data} = await axios.post(registerAPI, { name, email, password });

    if(data.success === true){
      delete data.user.password;
      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success(data.message, toastOptions);
      setLoading(true);
      navigate("/");
    } else {
      toast.error(data.message, toastOptions);
      setLoading(false);
    }
  };

  return (
    <div className="register-background">
      <Container className="d-flex align-items-center justify-content-center min-vh-100">
        <Row className="w-100">
          <Col md={{ span: 6, offset: 3 }}>
            <div className="form-card p-4 shadow-lg">
              <div className="text-center mb-4">
                <img src={logo} alt="App Icon" style={{ width: "60px", height: "60px" }} />
              </div>
              <h2 className="text-center mb-4">Get started with Expense Tracking</h2>
              <h3 className="text-center mb-4">Create Account</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicName" className="mb-3">
                  <Form.Label className="form-label">Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="name" 
                    placeholder="Enter your name" 
                    value={values.name} 
                    onChange={handleChange} 
                    className="form-input"
                  />
                </Form.Group>
                <Form.Group controlId="formBasicEmail" className="mb-3">
                  <Form.Label className="form-label">Email address</Form.Label>
                  <Form.Control 
                    type="email" 
                    name="email" 
                    placeholder="Enter your email" 
                    value={values.email} 
                    onChange={handleChange}
                    className="form-input"
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword" className="mb-3">
                  <Form.Label className="form-label">Password</Form.Label>
                  <Form.Control 
                    type="password" 
                    name="password" 
                    placeholder="Enter your Password" 
                    value={values.password} 
                    onChange={handleChange} 
                    className="form-input"
                  />
                </Form.Group>
                <div className="text-center">
                  <Link to="/forgotPassword" className="text-muted mb-3 d-block">Forgot Password?</Link>
                  <Button
                    type="submit"
                    className="w-100 btn btn-primary mt-2"
                    disabled={loading}
                  >
                    {loading ? "Registering..." : "Signup"}
                  </Button>
                  <p className="mt-3 text-muted">Already with us? <Link to="/login" className="text-primary">Login Here</Link></p>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    </div>
  );
}

export default Register;
