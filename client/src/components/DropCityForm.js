import React from "react";
import { baseUrl } from "../baseUrl";
import useDataApi from "../useDataApi";

import { Form } from "react-bootstrap";

const DropCityForm = (props) => {
  let [{ data: location, isLoading, isError }, doFetch] = useDataApi(
    baseUrl + "Location",
    []
  );

  return (
    <div>
      <Form>
        <Form.Group controlId="formGridZip">
          <Form.Control as="select" value="Choose...">
            {isError && <div>Error Loading Data ...</div>}

            {isLoading ? (
              <div>Loading ...</div>
            ) : (
              location.map((p) => (
                <option value={p.name} key={p._id} selected>
                  {p.name}
                </option>
              ))
            )}
          </Form.Control>
        </Form.Group>
      </Form>
    </div>
  );
};
export default DropCityForm;
