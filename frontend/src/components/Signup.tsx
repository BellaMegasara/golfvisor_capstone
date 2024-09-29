import { useState, FormEvent } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

interface SignupProps {
  handleSigninOpen: () => void; // Function to open Signin modal
}

const Signup: React.FC<SignupProps> = ({ handleSigninOpen }) => {
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [golflink, setGolflink] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/register", {
        name,
        username,
        email,
        password,
        golflink,
      })
      .then((result) => {
        console.log(result);
        handleSigninOpen(); // Switch to Signin modal after registration
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="p-4">
      <h1 className="font-extrabold text-3xl mt-5">Register for an account!</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="GolfLink Number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={golflink}
          onChange={(e) => setGolflink(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="success"
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Register
        </Button>
      </form>

      <Typography variant="body2" sx={{ marginTop: 2 }}>
        Already have an account?{" "}
        <Button
          onClick={handleSigninOpen}
          style={{ textDecoration: "none", color: "blue" }}
        >
          Login
        </Button>
      </Typography>
    </div>
  );
};

export default Signup;
