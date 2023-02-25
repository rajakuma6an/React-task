import React, { useState } from "react";
import "./style.css";
import { IoIosArrowBack } from "react-icons/io";
import { Button, Drawer } from "antd";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const View = () => {
  const [openModal, setOpenModal] = useState(false);
  const [segmentName, setSegmentName] = useState("");
  const [selectedSchema, setSelectedSchema] = useState("");
  const [addedSchemas, setAddedSchemas] = useState([]);
  const [availableSchemas, setAvailableSchemas] = useState([
    { label: "First Name", value: "first_name" },
    { label: "Last Name", value: "last_name" },
    { label: "Gender", value: "gender" },
    { label: "Age", value: "age" },
    { label: "Account Name", value: "account_name" },
    { label: "City", value: "city" },
    { label: "State", value: "state" },
  ]);

  const showModal = () => {
    setOpenModal(true);
  };

  const onClose = () => {
    setOpenModal(false);
  };
  const onCancel = () => {
    setSegmentName("");
    setAddedSchemas("");
    setOpenModal(false);
  };

  const handleAddSchema = () => {
    setAddedSchemas([...addedSchemas, selectedSchema]);
    setAvailableSchemas(
      availableSchemas.filter((item) => item.label !== selectedSchema)
    );
    setSelectedSchema("");
  };

  const handleRemoveSchema = (schema) => {
    setAddedSchemas(addedSchemas.filter((s) => s !== schema));
    setAvailableSchemas([
      ...availableSchemas,
      { label: schema, value: schema },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!segmentName || !addedSchemas) {
      return toast.error("Please enter the segment name and Add the Schema");
    }
    // API post method
    axios
      .post("https://webhook.site/adbe0541-877f-4ce5-802b-d65532bd5b15", {
        segmentName,
        addedSchemas,
      })
      .then((response) => {
        console.log("response :>> ", response);
        toast.success("Segment Name and Schema added successfully");
      })
      .catch((error) => {
        console.log("error :>> ", error);
        toast.error("Please enter the segment name and Add the Schema");
      });

    // output in console
    console.log("response :>> ", segmentName);
    console.log("response :>> ", addedSchemas);

    setSegmentName("");
    setAddedSchemas("");
  };

  return (
    <div className="task">
      <nav
        style={{ backgroundColor: "#4FA095", color: "white" }}
        className="navbar text-start container- d-flex align-items-center"
      >
        <span>
          <IoIosArrowBack size={24} /> View Audience
        </span>
      </nav>
      <div className="container my-5">
        <button onClick={showModal} className="submit-button w-25">
          Save Segment
        </button>
      </div>

      <Drawer
        title={`Saving Segment`}
        placement="right"
        onClose={onClose}
        open={openModal}
        footer={
          <div className="d-flex align-items-center justify-content-between gap-3">
            <button className="submit-button" onClick={handleSubmit}>
              Save the Segment
            </button>
            <button onClick={onCancel} className="btn btn-danger">
              Cancel
            </button>
          </div>
        }
      >
        <div>
          <div>
            <form className="form">
              <b>Enter the Name of the Segment</b>
              <input
                type="text"
                value={segmentName}
                className="segmentInput my-3"
                placeholder="Name of the Segment"
                onChange={(e) => setSegmentName(e.target.value)}
                required
              />
              <p>
                To Save your segment, you need to add the schemas to build the
                Query
              </p>
              {/* Added Schema List */}
              <div className=" col my-3 addedSchema ">
                {addedSchemas.length > 0 ? (
                  <>
                    {addedSchemas.map((schema, i) => (
                      <div className="d-flex align-items-center" key={schema}>
                        <select
                          name="updatedSchema"
                          className="segmentInput my-1 w-75"
                        >
                          <option value="" disabled selected hidden>
                            {schema}
                          </option>
                          {availableSchemas.map((item, i) => {
                            return (
                              <option key={i} value={item.value}>
                                {item.label}
                              </option>
                            );
                          })}
                        </select>
                        <button
                          className="btn btn-danger mx-2 mb-1"
                          onClick={() => handleRemoveSchema(schema)}
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </>
                ) : (
                  <marquee>No schema found</marquee>
                )}
              </div>

              <select
                name="selectedSchema"
                className="segmentInput my-3"
                value={selectedSchema}
                onChange={(e) => setSelectedSchema(e.target.value)}
                placeholder="Select a schema"
                required
              >
                <option value="" disabled selected hidden>
                  Add Schema To Segment
                </option>
                {availableSchemas.map((item, i) => {
                  return (
                    <option key={i} value={item.label}>
                      {item.label}
                    </option>
                  );
                })}
              </select>
              <button
                onClick={handleAddSchema}
                type="button"
                className="btn btn-link mb-5"
              >
                + Add New Schema
              </button>
            </form>
          </div>
          <ToastContainer />
        </div>
      </Drawer>
    </div>
  );
};

export default View;
