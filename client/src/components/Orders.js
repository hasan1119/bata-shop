import React, { useEffect, useState } from "react";
import { Spinner, Table, Button } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(orders);

  useEffect(() => {
    fetch(`https://rocky-cliffs-16368.herokuapp.com/orders`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((error) => toast.error(error.message));
  }, []);

  const handleStatusChange = (id, status) => {
    let modifiedOrders = [];
    orders.forEach((order) => {
      if (order._id === id) {
        order.status = status;
      }
      modifiedOrders.push(order);
    });
    setOrders(modifiedOrders);
    const modifiedStatus = { id, status };

    fetch("https://rocky-cliffs-16368.herokuapp.com/updateOrderStatus", {
      method: "put",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(modifiedStatus),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          toast.success(<b style={{ color: "#198754" }}>Set to {status}</b>);
        } else {
          toast.error("something went wrong!");
        }
      })
      .catch((error) => toast.error(error.message));
  };

  const deletion = (id) => {
    Swal.fire({
      title: "Are you sure to delete this order?",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://rocky-cliffs-16368.herokuapp.com/placeorder/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              const modifiedOrders = orders.filter((order) => order._id !== id);
              setOrders(modifiedOrders);
              Swal.fire("Deleted!", "", "success");
            }
          });
      }
    });
  };

  return (
    <div className="px-2  mx-md-2 bg-white" style={{ borderRadius: "15px" }}>
      <h3 className="text-center mb-4 fw-bold">Manage all orders</h3>
      {loading ? (
        <div className="text-center my-5 private-spinner py-5">
          <Spinner variant="danger" animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <h6>Loading...</h6>
        </div>
      ) : (
        <Table hover borderless responsive>
          <Toaster position="bottom-left" reverseOrder={false} />
          <thead className="bg-light">
            <tr>
              <th>Name</th>
              <th>Email ID</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Product</th>
              <th>Deletion</th>
              <th>Status</th>
            </tr>
          </thead>
          {orders.map((order) => {
            return (
              <tbody key={order._id} style={{ fontWeight: "500" }}>
                <tr>
                  <td>{order.name}</td>
                  <td>{order.email}</td>
                  <td>{order.phone}</td>
                  <td>{order.address}</td>
                  <td title={order.desc}>{order.desc.slice(0, 10)}...</td>
                  <td>
                    <Button
                      variant="outline-danger"
                      className="p-1 ml-3 mb-0"
                      onClick={() => deletion(order._id)}
                    >
                      <i className="fas mx-1 fa-trash"></i>
                      Delete
                    </Button>
                  </td>
                  <td>
                    <select
                      className={
                        order.status === "Pending"
                          ? "btn btn-danger"
                          : order.status === "Done"
                          ? "btn btn-success"
                          : "btn btn-info"
                      }
                      defaultValue={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                    >
                      <option className="bg-white text-muted">Pending</option>
                      <option className="bg-white text-muted">On going</option>
                      <option className="bg-white text-muted">Done</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </Table>
      )}
    </div>
  );
};

export default Orders;
