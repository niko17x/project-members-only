// This component is a 'protected' URL meant for access only by authorized signed-in user

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { FormContainer } from "../components/FormContainer.jsx";
import { toast } from "react-toastify";
import { Loader } from "../components/Loader.jsx";
import { setCredentials } from "../slices/authSlice.js";
import { useUpdateUserMutation } from "../slices/usersApiSlice.js";
import { LinkContainer } from "react-router-bootstrap";
import { useFetchAdmin } from "../hooks/useFetchAdmin.jsx";

export const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [member, setMember] = useState("");
  const [memberSince, setMemberSince] = useState("");

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  const { isAdmin } = useFetchAdmin();

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);

    if (userInfo.memberSince) {
      const formattedDate = formatDate(new Date(userInfo.memberSince));
      setMemberSince(formattedDate);
    }
  }, [userInfo.name, userInfo.email, userInfo.memberSince]);

  const memberStatus = () => {
    if (userInfo.member === true && member) {
      toast.error("You are already a member");
      return;
    } else if (member && member !== "member2024") {
      toast.error("Member code is incorrect");
    }
    toast.success("Congrats, you are now a member");

    setMember("");
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        console.log("first");
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
          member,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
    memberStatus();
  };

  // TODO: If user is member, show 'member since YEAR' otherwise, show option to become a member

  return (
    <FormContainer>
      <h1>Update Profile</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="name">
          <Form.Label>Enter Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {!userInfo.member ? (
          <Form.Group className="my-2" controlId="member">
            <LinkContainer to="/member-status" className="member-link">
              <Form.Label>Become a Member</Form.Label>
            </LinkContainer>
            <Form.Control
              type="text"
              placeholder="Enter code"
              value={member}
              onChange={(e) => setMember(e.target.value)}
            ></Form.Control>
          </Form.Group>
        ) : (
          <Form.Group>
            <div>{`Member since ${memberSince}`}</div>
          </Form.Group>
        )}
        {isAdmin && (
          <Form.Group>
            <LinkContainer to="/admin" className="admin-link">
              <Form.Label>Go to Admin Page</Form.Label>
            </LinkContainer>
          </Form.Group>
        )}

        {isLoading && Loader()}

        <Button type="submit" variant="primary" className="mt-3">
          Update
        </Button>
      </Form>
    </FormContainer>
  );
};
