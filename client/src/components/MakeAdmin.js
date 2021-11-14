import axios from "axios";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import swal from "sweetalert2";

const MakeAdmin = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    axios
      .put("https://rocky-cliffs-16368.herokuapp.com/addAdmin", data)
      .then((res) => {
        if (res?.data?.modifiedCount) {
          reset();
          return swal.fire(
            "Successfully Added",
            `${data.email} has been successfully added as an admin.`,
            "success"
          );
        } else if (res?.data?.matchedCount) {
          reset();
          swal.fire("Failed!", `${data.email} is already an admin.`, "error", {
            dangerMode: true,
          });
        } else {
          reset();
          swal.fire(
            "Failed!",
            `${data.email} is not registered yet!`,
            "error",
            {
              dangerMode: true,
            }
          );
        }
      })
      .catch((error) => {
        swal("Failed!", "Something went wrong! Please try again.", "error", {
          dangerMode: true,
        });
      });
  };

  return (
    <section className="make-admin">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h4 className="text-center">Make a new admin</h4>
        <div className="p-2 mx-md-5  bg-white form-main d-flex justify-content-center">
          <div>
            <Form.Label>
              <Form.Control
                className="rounded-0"
                type="text"
                {...register("email", { required: true })}
                placeholder="Email Address"
              />
            </Form.Label>

            <Button type="submit" className="rounded-0">
              Add
            </Button>
          </div>
        </div>
      </Form>
    </section>
  );
};

export default MakeAdmin;
