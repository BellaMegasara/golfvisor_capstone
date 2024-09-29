import React, { useState, FormEvent } from "react";
import logo from "../assets/logo.png";
import google from "../assets/google.png";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/setup";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";

// Signin Modal Component
interface SigninProps {
  open: boolean;
  handleClose: () => void;
}

// Signin Modal Component
export const Signin: React.FC<SigninProps> = ({ open, handleClose }) => {
  const [signUp, setSignUp] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [golflink, setGolflink] = useState<string>("");

  const toggleSignUp = () => {
    setSignUp(!signUp); // Toggle between sign-in and sign-up
  };

  const googleSignin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  };

  const handleSignUpSubmit = (e: FormEvent) => {
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
        toggleSignUp(); // Switch to Signin modal after registration
      })
      .catch((err) => console.log(err));
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        style: {
          zIndex: 1400,
        },
      }}
    >
      <DialogContent>
        {signUp ? ( // Sign-Up Form
          <>
            <div className="p-4">
              <h1 className="font-extrabold text-3xl mt-5">
                Register for an account!
              </h1>
              <form onSubmit={handleSignUpSubmit}>
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
                  onClick={toggleSignUp}
                  style={{ textDecoration: "none", color: "blue" }}
                >
                  Login
                </Button>
              </Typography>
            </div>
          </>
        ) : (
          // Sign-In Form
          <>
            <div className="sm:items-start p-4">
              <div className="flex">
                <img src={logo} className="w-14 h-14" alt="Logo" />
              </div>
              <h1 className="font-extrabold text-3xl mt-5">
                Tee off by signing in!
              </h1>
              <div
                onClick={googleSignin}
                className="cursor-pointer rounded-full border border-spacing-1 border-black flex p-3 mt-5"
              >
                <img src={google} className="w-5 h-5" alt="Google Icon" />
                <h1 className="ml-28">Continue with Google</h1>
              </div>
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
              <Button
                type="submit"
                variant="contained"
                color="success"
                fullWidth
                sx={{ marginTop: 2 }}
              >
                Login
              </Button>
              <Typography variant="body2" sx={{ marginTop: 2 }}>
                Don't have an account?{" "}
                <Button
                  onClick={toggleSignUp}
                  style={{ textDecoration: "none", color: "blue" }}
                >
                  Register
                </Button>
              </Typography>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Signin;
