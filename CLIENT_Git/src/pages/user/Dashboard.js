import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
const Dashboard = () => {
    const [auth] = useAuth();
    return (
        <Layout title={"Dashboard - User"}>
            <div className="container-fluid m-3 p-3 dashboard">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="admin-details card w-70 p-3">
                            <h2>Name - {auth?.user?.name}</h2>
                            <h4>Email - {auth?.user?.email}</h4>
                            <h4>Address - {auth?.user?.address}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
