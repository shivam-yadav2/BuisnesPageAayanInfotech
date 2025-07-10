import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const protectRoutes = () => {
    const token = Cookies.get("accessTokenAdmin");

    if (token) {
      navigate("/dashboard/slider");
    }
  };

  useEffect(() => {
    protectRoutes();
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handelChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({
      ...p,
      [name]: value,
    }));
  };

  const handelRegister = async (e) => {
    e.preventDefault();

    console.log("fprm data:", formData);

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      let data = JSON.stringify({
        email: formData.email,
        password: formData.password,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: " https://aayan.samadhaangroups.co.in/api/v1/admin/login",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);
      const accessToken = response.data?.data?.accessToken; // Assuming the token is in response.data.accessToken
      console.log(response?.data?.data);

      if (accessToken) {
        Cookies.set("accessTokenAdmin", accessToken); // Store token in cookie for 7 days
        toast.success("Login successful!");
        navigate("/dashboard/slider"); // Redirect to dashboard
      } else {
        toast.error("No access token received.");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="lg:min-w-[400px] min-w-[80%]">
        <Card>
          <CardHeader>
            <CardTitle>Create Your Account</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handelRegister}>
              <div className="grid gap-4">
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label>Email</Label>
                    <Input
                      name="email"
                      required
                      onChange={handelChange}
                      value={formData.email}
                      type="email"
                      placeholder="xxxxx@gmail.com"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Password</Label>
                    <Input
                      name="password"
                      required
                      onChange={handelChange}
                      value={formData.password}
                      type="password"
                      placeholder="xxxxxxxxxxxx"
                    />
                  </div>
                </div>
                <Button type="submit">Register Now</Button>
                <p>
                  Already have an Account?{" "}
                  <NavLink className="underline" to="/">
                    Login Now
                  </NavLink>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
