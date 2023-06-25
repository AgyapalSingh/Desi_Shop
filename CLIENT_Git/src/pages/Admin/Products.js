import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cart";


const Products = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useCart();
    const navigate = useNavigate();

    //getall products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get("http://localhost:8080/api/v1/product/get-product");
            setProducts(data.products);
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong");
        }
    };

    //lifecycle method
    useEffect(() => {
        getAllProducts();
    }, []);
    return (
        <Layout title={"All Products Data"}>
            <div className="container-fluid m-3 p-3 dashboard">
                <div className="row ">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9 admin-product-list">
                        <h1 className="text-center">All Products List</h1>
                        <div className="d-flex flex-wrap">
                            {products?.map((p) => (
                                <Link
                                    key={p._id}
                                    // to={`/api/v1/product/${p.slug}`}
                                    className="product-link"
                                >
                                    <div className="card m-2" style={{ width: "15rem" }}>
                                        <img
                                            src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                                            className="card-img-top"
                                            alt={p.name}
                                        />

                                        <div className="card-body">
                                            <h5 className="card-title">{p.name.substring(0, 20)}...</h5>
                                            <p className="card-text">
                                                Description : {p.description.substring(0, 30)}...
                                            </p>
                                            <p className="card-text card-item-price"> ₹ {p.price}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Products;
