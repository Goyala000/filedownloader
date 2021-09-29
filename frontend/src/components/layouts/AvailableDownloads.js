import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "react-bootstrap";
import {
  createSingleDownload,
  listDownloads,
} from "../../actions/downloadActions";

import Loader from "./Loader";
import Message from "./Message";

const Title = styled.h2`
  margin: 40px;
`;

const Available = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  align-items: center;
  margin-top: 30px;
`;

const DownloadDetails = styled.div``;

const DownloadButton = styled.div`
  i {
    font-size: 35px;
    cursor: pointer;
    &:hover {
      color: blue;
      font-size: 37px;
    }
  }
`;

const AvailableDownloads = () => {
  const dispatch = useDispatch();

  const downloadList = useSelector((state) => state.downloadList);
  const { loading, downloads, error } = downloadList;

  const singleFileDownloadHandler = (id) => {
    dispatch(createSingleDownload(id));
  };

  useEffect(() => {
    dispatch(listDownloads());
  }, [dispatch]);
  return (
    <Container>
      <Title>Available Downloads</Title>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {downloads &&
            downloads.map((download) => (
              <Available key={download._id}>
                <DownloadDetails>
                  <h4>{download.title}</h4>
                  <p>{download.file}</p>
                </DownloadDetails>
                <DownloadButton>
                  <i
                    className="fas fa-arrow-circle-down"
                    onClick={() => singleFileDownloadHandler(download._id)}
                  ></i>
                </DownloadButton>
              </Available>
            ))}
        </>
      )}
    </Container>
  );
};

export default AvailableDownloads;
