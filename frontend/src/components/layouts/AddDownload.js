import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { createDownload } from "../../actions/downloadActions";
import Loader from "./Loader";
import Message from "./Message";

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const AddDownload = ({ history }) => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const downloadCreate = useSelector((state) => state.downloadCreate);
  const { loading, success, error } = downloadCreate;

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("formFile", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/uploads", formData, config);

      console.log(data);

      setFile(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createDownload(title, file));
  };

  useEffect(() => {
    if (success) {
      history.push("/all");
    }
  }, [success, history]);
  return (
    <>
      <Container>
        <Link to="/all">
          <Button variant="info" className="my-4">
            View All
          </Button>
        </Link>

        <Title>Add Download File</Title>
        {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicTitle">
            <Form.Label>Download Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter download title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {uploading && <Loader />}
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Default file input example</Form.Label>
            <Form.Control type="file" onChange={uploadFileHandler} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default AddDownload;
