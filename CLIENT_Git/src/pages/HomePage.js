import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "./../components/Layout/Layout";
import { AiOutlineReload } from "react-icons/ai";
import "../styles/Homepage.css";
import { useAuth } from "../context/auth";


const HomePage = () => {


    const navigate = useNavigate();
    const [cart, setCart] = useCart();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    //get all cat
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("http://localhost:8080/api/v1/category/get-category");
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllCategory();
        getTotal();
    }, []);
    //get products
    const getAllProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`http://localhost:8080/api/v1/product/product-list/${page}`);
            setLoading(false);
            setProducts(data.products);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    //getTOtal product Count
    const getTotal = async () => {
        try {
            const { data } = await axios.get("http://localhost:8080/api/v1/product/product-count");
            setTotal(data?.total);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (page === 1) return;
        loadMore();
    }, [page]);
    //load more
    const loadMore = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`http://localhost:8080/api/v1/product/product-list/${page}`);
            setLoading(false);
            setProducts([...products, ...data?.products]);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    // filter by cat
    const handleFilter = (value, id) => {
        let all = [...checked];
        if (value) {
            all.push(id);
        } else {
            all = all.filter((c) => c !== id);
        }
        setChecked(all);
    };
    useEffect(() => {
        if (!checked.length || !radio.length) getAllProducts();
    }, [checked.length, radio.length]);

    useEffect(() => {
        if (checked.length || radio.length) filterProduct();
    }, [checked, radio]);

    //get filterd product
    const filterProduct = async () => {
        try {
            const { data } = await axios.post("http://localhost:8080/api/v1/product/product-filters", {
                checked,
                radio,
            });
            setProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Layout title={"Desi Shop - Home Page "}>
            <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">

                    <div className="carousel-item active">
                        <img src="../../carosel/SaleIsLive.png" className="d-block carasol-img  " alt="..."
                            onClick={() => {
                                navigate('/categories')
                            }}
                        />
                    </div>
                    <div className="carousel-item active">
                        <img src="../../carosel/MensWear.png" className="d-block carasol-img" alt="..."
                            onClick={() => {
                                navigate("/category/men's-collection")
                            }}
                        />
                    </div>
                    <div className="carousel-item">
                        <img src="../../carosel/HomeDeco.jpeg" className="d-block carasol-img  " alt="..."
                            onClick={() => {
                                navigate('/category/home-decoration')
                            }}
                        />
                    </div>
                    <div className="carousel-item">
                        <img src="../../carosel/StayInTrend.png" className="d-block carasol-img" alt="..."
                            onClick={() => {
                                navigate("/category/women's-collection")
                            }}
                        />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            <section id="hero">
                <div className="hero-detail">
                    <h4>Get Exciting Offers</h4>
                    <h2>At</h2>
                    <h1>DESI SHOP</h1>
                    <p>Save more with coupons & up to 70% off! </p>
                    <button
                        onClick={() => {
                            navigate('/categories')
                        }}

                    >Shop Now</button>
                </div>

                <div className="hero-img">
                    <img src="https://www.pngmart.com/files/22/Nier-PNG-Free-Download.png" alt="" />
                </div>
            </section>

            <section id='summers'>
                <div id='summer-appliances'>
                    <p>Appliances for a cool Summer</p>
                    <p>➡️</p>
                </div>

                <div id='appliance'>
                    <img src="../../images/Appliances/LG1.5.jpeg" alt="logo" />
                    <p>Air Conditioners</p>
                    <span>From Rs. 25,999</span>
                    <button
                        onClick={() => {
                            navigate('/category/air-conditioners')
                        }}

                    >Shop Now</button>
                </div>

                <div id='appliance'>
                    <img src="../../images/AirCoolers/HavelsAirCooler.jpg" alt="logo" />
                    <p>Coolers</p>
                    <span>From Rs. 7999</span>
                    <button
                        onClick={() => {
                            navigate('/category/air-coolers')
                        }}

                    >Shop Now</button>
                </div>

                <div id='appliance'>
                    <img src="../../images/Appliances/Samsung615.jpeg" alt="logo" />
                    <p>Refrigerators</p>
                    <span>From Rs. 17,999</span>
                    <button
                        onClick={() => {
                            navigate('/category/refrigerators')
                        }}

                    >Shop Now</button>
                </div>

                <div id='appliance'>
                    <img src="../../images/WaterPurifier/AquaGaurd.jpg" alt="logo" />
                    <p>Water Purifier</p>
                    <span>From Rs. 8,999</span>
                    <button
                        onClick={() => {
                            navigate('/category/water-purifier')
                        }}

                    >Shop Now</button>
                </div>

                <div id='appliance'>
                    <img src="../../images/WashingMachines/LG_7_KG_Fully_Auto.jpg" alt="logo" />
                    <p>Washing Machines</p>
                    <span>From Rs. 15,999</span>
                    <button
                        onClick={() => {
                            navigate('/category/washing-machine')
                        }}

                    >Shop Now</button>
                </div>
            </section>

            <section id='summers' className="electronics">
                <div id='summer-appliances'>
                    <p>Best of Electronics</p>
                    <p>➡️</p>
                </div>

                <div id='appliance' >
                    <img src="../../images/Monitors/Samsung32Inch.webp" alt="logo" />
                    <p>Monitors</p>
                    <span>From Rs. 7949</span>
                    <button
                        onClick={() => {
                            navigate('/category/monitors')
                        }}

                    >Shop Now</button>
                </div>

                <div id='appliance'>
                    <img src="../../images/Watchs/NoiceColorFit.jpg" alt='logo' />
                    <p>Best of Smart Watches</p>
                    <span>From Rs. 1649</span>
                    <button
                        onClick={() => {
                            navigate('/category/smart-watches')
                        }}

                    >Shop Now</button>

                </div>

                <div id='appliance'>
                    <img src="../../images/Mobiles/Iphone14.webp" alt="logo" />
                    <p>Top Mobiles</p>
                    <span>Upto 30% off*</span>
                    <button
                        onClick={() => {
                            navigate('/category/mobiles')
                        }}

                    >Shop Now</button>
                </div>

                <div id='appliance'>
                    <img src="../../images/Printers/hpDeskJet.jpg" alt="logo" />
                    <p>Printers</p>
                    <span>From Rs. 7999</span>
                    <button
                        onClick={() => {
                            navigate('/category/printers')
                        }}

                    >Shop Now</button>
                </div>

                <div id='appliance'>
                    <img src="../../images/Laptop/AppleMacBookAir.webp" alt="logo" />
                    <p>Top Laptops</p>
                    <span>Upto 30% off*</span>
                    <button
                        onClick={() => {
                            navigate('/category/laptopdesktop')
                        }}

                    >Shop Now</button>
                </div>
            </section>

            <div className="all-products container-fluid row mt-3 home-page">
                <div className="col-md-3 filters">
                    <h4 className="text-center">Filter By Category</h4>
                    <div className="d-flex flex-column">
                        {categories?.map((c, index) => (
                            <Checkbox className="categories-created-check"
                                key={c._id}
                                onChange={(e) => handleFilter(e.target.checked, c._id)}
                            >
                                {c.name}
                            </Checkbox>
                        ))}
                    </div>

                    {/* price filter */}
                    <h4 className="text-center mt-4">Filter By Price</h4>
                    <div className="d-flex flex-column">
                        <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                            {Prices?.map((p, index) => (
                                <div className="categories-created-check" key={p._id}>
                                    <Radio value={p.array}>{p.name}</Radio>
                                </div>
                            ))}
                        </Radio.Group>
                    </div>

                    <div className="d-flex flex-column">
                        <button
                            className="btn btn-danger"
                            onClick={() => window.location.reload()}
                        >
                            RESET FILTERS
                        </button>
                    </div>
                </div>
                <div className="col-md-9 all-products-added ">
                    <h1 className="text-center">All Products</h1>
                    <div className="d-flex flex-wrap">
                        {products?.map((p, index) => (
                            <div className="card m-2" key={p._id}>
                                <img
                                    src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                                    className="card-img-top"
                                    alt={p.name}
                                />
                                <div className="card-body">
                                    <div className="card-name-price">
                                        <h5 className="card-title">{p.name.substring(0, 15)}...</h5>
                                        <h5 className="card-title card-price">
                                            {p.price.toLocaleString("en-IN", {
                                                style: "currency",
                                                currency: "INR",
                                            })}
                                        </h5>
                                    </div>
                                    <p className="card-text ">
                                        {p.description.substring(0, 60)}...
                                    </p>
                                    <div className="card-name-price">
                                        <button
                                            className="btn btn-info ms-1"
                                            onClick={() => navigate(`/product/${p.slug}`)}
                                        >
                                            More Details
                                        </button>
                                        <button
                                            className="btn btn-dark ms-1"
                                            onClick={() => {
                                                setCart([...cart, p]);
                                                localStorage.setItem(
                                                    "cart",
                                                    JSON.stringify([...cart, p])
                                                );
                                                toast.success("Item Added to cart");
                                            }}
                                        >
                                            ADD TO CART
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="m-2 p-3">
                        {products && products.length < total && (
                            <button
                                className="btn loadmore"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setPage(page + 1);
                                }}
                            >
                                {loading ? (
                                    "Loading ..."
                                ) : (
                                    <>
                                        {" "}
                                        Loadmore <AiOutlineReload />
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <section className="container-fluid" id="WhatYouCanBuy">
                <h4>What Can You Buy From Desi Shop ?</h4>
                <h6>Mobile Phones</h6>
                <p>From budget phones to state-of-the-art smartphones, we have a mobile for everybody out there. Whether you're looking for larger, fuller screens, power-packed batteries, blazing-fast processors, beautification apps, high-tech selfie cameras or just large internal space, we take care of all the essentials. Shop from top brands in the country like Samsung, Apple, Oppo, Xiaomi, Realme, Vivo, and Honor to name a few. Rest assured, you're buying from only the most reliable names in the market. What's more, with DesiShop's Complete Mobile Protection Plan, you will never again find the need to run around service centres. This plan entails you to a number of post-purchase solutions, starting at as low as Rupees 99 only! Broken screens, liquid damage to phone, hardware and software glitches, and replacements - the DesiShop Complete Mobile Protection covers a comprehensive range of post-purchase problems, with door-to-door services.</p>
                <br />
                <h6>Electronic Devices and Accessories</h6>
                <p>When it comes to laptops, we are not far behind.DesiShop Filter among dozens of super-fast operating systems, hard disk capacity, RAM, lifestyle, screen size and many other criterias for personalized results in a flash. All you students out there, confused about what laptop to get? Our Back To College Store segregates laptops purpose wise (gaming, browsing and research, project work, entertainment, design, multitasking) with recommendations from top brands and industry experts, facilitating a shopping experience that is quicker and simpler.

                    Photography lovers, you couldn't land at a better page than ours. Cutting-edge DSLR cameras, ever reliable point-and-shoot cameras, millennial favourite instant cameras or action cameras for adventure junkies: our range of cameras is as much for beginners as it is for professionals. Canon, Nikon, GoPro, Sony, and Fujifilm are some big names you'll find in our store. Photography lovers, you couldn't land at a better page than ours. Cutting-edge DSLR cameras, ever reliable point-and-shoot cameras, millennial favourite instant cameras or action cameras for adventure junkies: our range of cameras is as much for beginners as it is for professionals. Canon, Nikon, GoPro, Sony, and Fujifilm are some big names you'll find in our store.

                    Turn your home into a theatre with a stunning surround sound system. Choose from our elaborate range of Sony home theatres, JBL soundbars and Philips tower speakers for an experience to remember.

                    How about jazzing up your phone with our quirky designer cases and covers? Our wide-ranging mobile accessories starting from headphones, power banks, memory cards, mobile chargers, to selfie sticks can prove to be ideal travel companions for you and your phone; never again worry about running out of charge or memory on your next vacation.</p>

                <h6>Large Appliances</h6>
                <p>Sleek TVs, power-saving refrigerators, rapid-cooling ACs, resourceful washing machines - discover everything you need to run a house under one roof. Our Dependable TV and Appliance Store ensures zero transit damage, with a replacement guarantee if anything goes wrong; delivery and installation as per your convenience and a double warranty (Official Brand Warranty along with an extended DesiShop Warranty) - rest assured, value for money is what is promised and delivered. Shop from market leaders in the country like Samsung, LG, Whirlpool, Midea, Mi, Vu, Panasonic, Godrej, Sony, Daikin, and Hitachi among many others.

                    For certain product categories, Customers meeting the eligibility criteria will have the option to buy larger quantities. To know more on the eligibility criteria and terms and conditions, please reach out to Purchases.oni@DesiShop.com.
                </p>

                <h6>Small Home Appliances</h6>
                <p>Find handy and practical home appliances designed to make your life simpler: electric kettles, OTGs, microwave ovens, sandwich makers, hand blenders, coffee makers, and many more other time-saving appliances that are truly crafted for a quicker lifestyle. Live life king size with these appliances at home.
                </p>

                <h6>Lifestyle</h6>
                <p>DesiShop, 'India ka Fashion Capital', is your one-stop fashion destination for anything and everything you need to look good. Our exhaustive range of Western and Indian wear, summer and winter clothing, formal and casual footwear, bridal and artificial jewellery, long-lasting make-up, grooming tools and accessories are sure to sweep you off your feet. Shop from crowd favourites like Vero Moda, Forever 21, Only, Arrow, Woodland, Nike, Puma, Revlon, Mac, and Sephora among dozens of other top-of-the-ladder names. From summer staple maxi dresses, no-nonsense cigarette pants, traditional Bandhani kurtis to street-smart biker jackets, you can rely on us for a wardrobe that is up to date. Explore our in-house brands like Metronaut, Anmi, and Denizen, to name a few, for carefully curated designs that are the talk of the town. Get ready to be spoiled for choice.Festivals, office get-togethers, weddings, brunches, or nightwear - DesiShop will have your back each time.</p>


                <h6>Home and Furniture</h6>
                <p>Moving to a new place is never easy, especially if you're buying new furniture. Beds, sofa sets, dining tables, wardrobes, and TV units - it's not easy to set up everything again. With the hundreds of options thrown at you, the ride could be overwhelming. What place is reliable, what furniture will stand the test of time? These are questions you must ask before you choose a store. Well, our Durability Certified Furniture Store has not only curated a range of furniture keeping in mind the modern Indian consumer but furniture that comes with a lab certification, ensuring they last you for up to 10 years. Yes, all our furniture has gone through 35 stability and load tests so that you receive only the best-quality furniture. Be FurniSure, always. Names to look out for are Nilkamal, Godrej Interio, Urban Ladder, HomeTown, Durian and Perfect Homes.

                    You may have your furniture all set up, but they could end up looking flat and incomplete without complementary decor. Curtains, cushion covers, bed sheets, wall shelves, paintings, floor lamps - find everything that turns a house to an inviting home under one roof at DesiShop.
                </p>

                <h6>Baby and Kids</h6>
                <p>Your kids deserve only the best. From bodysuits, booties, diapers to strollers, if you're an expecting mother or a new mother, you will find everything you need to set sail on a smooth parenting journey with the help of our baby care collection. When it comes to safety, hygiene and comfort, you can rely on us without a second thought. Huggies, Pampers, MamyPoko, and Johnson & Johnson: we host only the most-trusted names in the business for your baby.
                </p>

                <h6>Books, Sports and Games</h6>
                <p>Work hard and no play? We don't believe in that. Get access to best-selling fiction and non-fiction books by your favourite authors, thrilling English and Indian blockbusters, most-wanted gaming consoles, and a tempting range of fitness and sports gadgets and equipment bound to inspire you to get moving.
                </p>

                <h6>Grocery/Supermart</h6>
                <p>Launching into the grocery vertical, DesiShop introduces Supermart that is out to bring everyday essentials close to you. From pulses, spices, dairy, personal and sanitary care, breakfast essentials, health drinks, spreads, ready to cook, grooming to cleaning agents, we are happy to present everything you need to run a house. Now buy Grocery products for as low as 1 Rupee only - our 1 Rupee Store presents new products every day for a nominal price of 1 Rupee only. Terms and conditions apply.</p>
            </section>
        </Layout >
    );
};

export default HomePage;
