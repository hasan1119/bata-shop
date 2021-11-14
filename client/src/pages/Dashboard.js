import React, { useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { Route, Switch, useRouteMatch } from "react-router";
import Profile from "../components/Profile.js";
import Orders from "../components/Orders.js";
import { NavLink } from "react-router-dom";
import AddProduct from "../components/AddProduct.js";
import MakeAdmin from "../components/MakeAdmin.js";
import ManageProducts from "../components/ManageProducts.js";
import "../assets/css/admin.css";
import MyOrders from "../components/MyOrders.js";
import UpdateProduct from "../components/UpdateProduct.js";
import AddReview from "../components/AddReview.js";
import Payment from "../components/Payment.js";
import AdminRoute from "../protectedRoute/AdminRoute.js";
import useContexts from "../hooks/useContexts.js";

const Dashboard = () => {
  let { path, url } = useRouteMatch();
  const { email } = useContexts();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`https://rocky-cliffs-16368.herokuapp.com/admin/${email}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      });
  }, [email]);
  if (loading) {
    return (
      <div className="text-center my-5 private-spinner py-5">
        <Spinner variant="danger" animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <h6>Loading...</h6>
      </div>
    );
  }
  return (
    <div>
      <div className="mx-2 dashboard">
        <Row>
          <Col className="admin-side-bar">
            <div>
              <ul>
                {user?.role === "admin" ? (
                  <h6 className="fw-bold text-uppercase">Admin Dashboard</h6>
                ) : (
                  <h6 className="fw-bold text-uppercase">User Dashboard</h6>
                )}

                {user?.role !== "admin" && (
                  <li className="sideBarLink">
                    <NavLink to={`${url}/profile`}>
                      <i class="fas fa-user-circle"></i> Profile
                    </NavLink>
                  </li>
                )}

                {user?.role === "admin" && (
                  <li className="sideBarLink">
                    <NavLink to={`${url}/orders`}>
                      <i class="fas fa-list"></i> Order List
                    </NavLink>
                  </li>
                )}

                {user?.role !== "admin" && (
                  <li className="sideBarLink">
                    <NavLink to={`${url}/myorder`}>
                      <i class="fas fa-cart-arrow-down"></i> My order
                    </NavLink>
                  </li>
                )}

                {user?.role === "admin" && (
                  <li className="sideBarLink">
                    <NavLink to={`${url}/addProduct`}>
                      <i class="fas fa-file-medical"></i> Add Product
                    </NavLink>
                  </li>
                )}
                {user?.role === "admin" && (
                  <li className="sideBarLink">
                    <NavLink to={`${url}/makeAdmin`}>
                      <i class="fas fa-user-plus"></i>Make admin
                    </NavLink>
                  </li>
                )}
                {user?.role !== "admin" && (
                  <li className="sideBarLink">
                    <NavLink to={`${url}/payment`}>
                      <i class="fab fa-amazon-pay"></i>Payment
                    </NavLink>
                  </li>
                )}
                {user?.role === "admin" && (
                  <li className="sideBarLink">
                    <NavLink to={`${url}/manageProduct`}>
                      <i class="fas fa-cog"></i> Manage Products
                    </NavLink>
                  </li>
                )}
                {user?.role !== "admin" && (
                  <li className="sideBarLink">
                    <NavLink to={`${url}/review`}>
                      <i class="fas fa-comment-dots"></i> Review
                    </NavLink>
                  </li>
                )}
              </ul>
            </div>
          </Col>
          <Col md={8} lg="9" className="admin-container">
            <Switch>
              <Route exact path={path}>
                <Profile></Profile>
              </Route>
              <Route exact path={`${path}/profile`}>
                <Profile></Profile>
              </Route>
              <AdminRoute exact path={`${path}/orders`}>
                <Orders></Orders>
              </AdminRoute>
              <Route exact path={`${path}/myorder`}>
                <MyOrders></MyOrders>
              </Route>
              <AdminRoute exact path={`${path}/addProduct`}>
                <AddProduct></AddProduct>
              </AdminRoute>
              <AdminRoute exact path={`${path}/addProduct/:id`}>
                <UpdateProduct></UpdateProduct>
              </AdminRoute>
              <Route exact path={`${path}/review`}>
                <AddReview></AddReview>
              </Route>
              <AdminRoute exact path={`${path}/makeAdmin`}>
                <MakeAdmin />
              </AdminRoute>
              <Route exact path={`${path}/payment`}>
                <Payment />
              </Route>
              <AdminRoute exact path={`${path}/manageProduct`}>
                <ManageProducts />
              </AdminRoute>
            </Switch>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Dashboard;
