// This component is a 'protected' URL meant for access only by authorized signed-in user

import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { FormContainer } from "../components/FormContainer.jsx";
import { toast } from "react-toastify";
import { Loader } from "../components/Loader.jsx";
import { useUpdateSelectedUserMutation } from "../slices/usersApiSlice.js";
import { LinkContainer } from "react-router-bootstrap";
import { useFetchAdmin } from "../hooks/useFetchAdmin.jsx";
import { useParams } from "react-router-dom";

export const SelectedProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [member, setMember] = useState(false);

  const [updateSelectedProfile, { isLoading }] =
    useUpdateSelectedUserMutation();
  const { isAdmin } = useFetchAdmin();
  const { id } = useParams();

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch("/api/users/all-users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      const result = await data.find((user) => user._id === id);
      setName(result.name);
      setEmail(result.email);
      setMember(result.member ? true : false);
    };
    getUser();
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const updatedUser = {
        _id: id,
        name,
        email,
        member: member,
      };
      console.log(updatedUser);
      await updateSelectedProfile(updatedUser).unwrap();
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  // TODO: For member status with admin view, there should be an option to revoke member status with a checkbox & also delete entire profile
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

        <Form.Group>
          <label htmlFor="">
            Member
            <input
              type="checkbox"
              checked={member}
              onChange={(e) => setMember(e.target.checked)}
            />
          </label>
        </Form.Group>

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
