import { useState, useEffect } from "react";
import { Navbar } from "../../components/navbar";
import { PageContainer } from "../../components/pageContainer";
import { TopSection } from "./topSection";
import { Link , Redirect} from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Slider from "./slider"
import SingleProduct from "../../components/Products/Product/SingleProduct"
import { CommonStateContext } from "../../contexts/common";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort } from '@fortawesome/free-solid-svg-icons'
import Dropdown from 'react-dropdown';
import BankPopUp from "../../components/accountBox/bankPopup";
import 'react-dropdown/style.css';
// import Products from "../../components/Products/Products"
// export function HomePage(props)
// {
//     return (<PageContainer>
//         <TopSection>
//             <Navbar useTransparent />
//         </TopSection>
//         <Products />
//         </PageContainer>
//         );
// }

import React from 'react'
import './App.css'
import { Footer } from "../../components/Footer"
// const product_card=[
//     {id: 1, name: "Shoes", description: "Running shoes", details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donecvenenatis, dolor in finibus malesuada, lectus ipsum porta nunc, atiaculis arcu nisi sed mauris. Nulla fermentum vestibulum ex, egettristique tortor pretium ut. Curabitur elit justo, consequat idcondimentum ac, volutpat ornare.", price: "1500 taka", image: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/how-to-buy-running-shoes-1611448820.jpg?crop=0.516xw:0.774xh;0.247xw,0.226xh&resize=640:*" },
//     {id: 2, name: "Macbook", description: "Apple macbook", details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donecvenenatis, dolor in finibus malesuada, lectus ipsum porta nunc, atiaculis arcu nisi sed mauris. Nulla fermentum vestibulum ex, egettristique tortor pretium ut. Curabitur elit justo, consequat idcondimentum ac, volutpat ornare.", price: "90000 taka", image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-gold-select-201810?wid=904&hei=840&fmt=jpeg&qlt=80&.v=1633027804000" },
//     {id: 3, name: "Kettle", description: "Tea kettle", details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donecvenenatis, dolor in finibus malesuada, lectus ipsum porta nunc, atiaculis arcu nisi sed mauris. Nulla fermentum vestibulum ex, egettristique tortor pretium ut. Curabitur elit justo, consequat idcondimentum ac, volutpat ornare.", price: "750 taka", image: "data:image/jpeg;base64,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" },
//     {id: 4, name: "book", description: "The blue book", details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donecvenenatis, dolor in finibus malesuada, lectus ipsum porta nunc, atiaculis arcu nisi sed mauris. Nulla fermentum vestibulum ex, egettristique tortor pretium ut. Curabitur elit justo, consequat idcondimentum ac, volutpat ornare.", price: "400 taka", image: "data:image/jpeg;base64,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" },
//     {id: 5, name: "Keyboard", description: "Computer keyboard", details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donecvenenatis, dolor in finibus malesuada, lectus ipsum porta nunc, atiaculis arcu nisi sed mauris. Nulla fermentum vestibulum ex, egettristique tortor pretium ut. Curabitur elit justo, consequat idcondimentum ac, volutpat ornare.", price: "650 taka", image: "data:image/jpeg;base64,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" },
//     {id: 6, name: "Coffee beans", description: "Roasted coffee beans", details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donecvenenatis, dolor in finibus malesuada, lectus ipsum porta nunc, atiaculis arcu nisi sed mauris. Nulla fermentum vestibulum ex, egettristique tortor pretium ut. Curabitur elit justo, consequat idcondimentum ac, volutpat ornare.", price: "1000 taka", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQKk38JgYrUuxiJBpxLcnTC8zlK4ZmWzscZA&usqp=CAU" },
//     {id: 7, name: "Lamp", description: "Table lamp", details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donecvenenatis, dolor in finibus malesuada, lectus ipsum porta nunc, atiaculis arcu nisi sed mauris. Nulla fermentum vestibulum ex, egettristique tortor pretium ut. Curabitur elit justo, consequat idcondimentum ac, volutpat ornare.", price: "2000 taka", image: "data:image/jpeg;base64,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" },
//     {id: 8, name: "Headphones", description: "Over-ear headphones", details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donecvenenatis, dolor in finibus malesuada, lectus ipsum porta nunc, atiaculis arcu nisi sed mauris. Nulla fermentum vestibulum ex, egettristique tortor pretium ut. Curabitur elit justo, consequat idcondimentum ac, volutpat ornare.", price: "2500 taka", image: "data:image/jpeg;base64,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LaQqG4YikaRxwdMR9Wt5EnG7SA3bo61UGqdKGGxnks+ocMfXIwa0/daMB8zvK2lEQEREBERAREQEREBERBDRdnH4G+QUyhouzj8DfIKZAREQEREBERAREQEREHxwDhY4g53XOvSlqM7VifrYGn0SZx2LfmnnExnlmW8rjdc9Fry6U0dFpaJ8MzQ6OQWcD+BB3EGxB3EBByMIXcF8LCugm9EtIPz8/wD6v9C9lB0XaPpXte9r5i3ENmLSy/xMa1od3G4QUxqlqZX6wtJp4wIxlJKSyPuYbHatxaDbLBXXqHqDFqqOse7ralwsX2s1oObYgcubjieQwW4saGAAAAAWAGQAyAC+oNR171Eh1rAeD1VS0WZIBcEDJso+0MTY5i/eDSet2pFfq83anjDojfalhJewAfpDYFt+Lhyuuml8I2sDkc0HHRa4ZfS3dhy38dyk6l28Lo/SfRjo6ukMjWPhc73upcAz5RuDmty+yAvC7ompD+fn+fVf6EFX9GmpDta59qUEUkJBmP33ZiJp577ZDgXAro+NgjAa0AAAAACwAGQA3BeTQ+i4tDQshhbssYMOJOZc47yTc3XtQEREBERAREQEREBERAREQQ0XZx+BvkFMoaLs4/A3yCmQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERB//Z" },
//     ]

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
};

export function HomePage() {
    
    const options = [
        'Sort by newest', 'Sort by oldest', 'Sort by budget (ascending)', 'Sort by budget (descending)'
      ];
    const defaultOption = options[0];
    const [initial, setinitial] = useState([])
    const [products, setproducts] = useState([])
    const [collection, setcollection] = useState([])
    const [services, setservices] = useState([])
    const [popupOpen, setPopupOpen]= useState(true)
    let history= useHistory()
    useEffect(() => {

        async function fetchProducts() {
            const { data } = await axios.get('http://127.0.0.1:5000/api/products')
            setproducts(data)
            setinitial(data)
            console.log(data)

            // var data2 = {"username": "bob_baker","secret": "secret-123-jBj02","email": "b_baker@mail.com","first_name": "Bob","last_name": "Baker","custom_json": { "fav_game": "Candy Crush", "high_score": 2002 }};

            var config2 = {
                headers: {
                    'PRIVATE-KEY': '{{dbab5f23-8b77-4ffc-b8c6-6d2894ef1ea0}}'
                }
            };

            // const { data2 } = await axios.post(
            //     'https://api.chatengine.io/users/',
            //     {
            //       'username': 'test',
            //       'secret': '123456'
            //     },
            //     config2)

            // console.log()
        }

        fetchProducts()

        // async function fetchCollection() {
        //     const { data } = await axios.get('http://127.0.0.1:8000/store/collections')
        //     setcollection(data)
        //     console.log(data)
        // }

        // fetchCollection()

        // async function fetchServices() {
        //     console.log("service")
        //     const { data } = await axios.get('http://127.0.0.1:8000/store/services')
        //     setservices(data)

        // }

        // fetchServices()


    }, [])


    function handleSort(x){
        if(x==0)
            setproducts(initial)
        else if(x==1)
        {
            let arr= initial
            arr.reverse()
            setproducts(arr)
        }
        else if(x==2)
        {
            let arr= products
            arr.sort( function(a,b){return a.budget-b.budget} )
            setproducts(arr)
        }
        else
        {
            let arr= products
            arr.sort( function(a,b){return b.budget-a.budget} )
            setproducts(arr)
        }
        
    }

    const listItems1 = products.map((item) => {
        if (item.Category == '1' && item._id=="629484e5e3acff4e1c71a7e4")
            return (
                <Link to={`/item/${item._id}`} >
                    <div className="card" key={item.id}>

                        <div className="card_img">
                        {/* <img src={'http://127.0.0.1:8000' + item.image} /> */}
                            <img src={'https://i.ibb.co/VWJQKTC/laptop-png-6754.png'} />
                        </div>
                        <div className="card_header">
                            <h2>{item.Title}</h2>
                            <p>{item.description}</p>
                            <p className="price">{item.Price}<span></span></p>
                            <div className="btn">Show Details</div>
                        </div>
                    </div>
                </Link>
            )

        else if( item.Category == '1' && item._id=="629ec3706ae7b0bad55b9cd4" )
        return (
            <Link to={`/item/${item._id}`} >
                <div className="card" key={item.id}>

                    <div className="card_img">
                    {/* <img src={'http://127.0.0.1:8000' + item.image} /> */}
                        <img src={'https://i.ibb.co/WV7WTtG/camera-icon.png'} />
                    </div>
                    <div className="card_header">
                        <h2>{item.Title}</h2>
                        <p>{item.description}</p>
                        <p className="price">{item.Price}<span></span></p>
                        <div className="btn">Show Details</div>
                    </div>
                </div>
            </Link>
        )   
        
        else if( item.Category == '1' && item._id=="629eca7a20bbe33432055f46" )
        return (
            <Link to={`/item/${item._id}`} >
                <div className="card" key={item.id}>

                    <div className="card_img">
                    {/* <img src={'http://127.0.0.1:8000' + item.image} /> */}
                        <img src={'https://i.ibb.co/GMjSrcG/Headphone-icon.png'} />
                    </div>
                    <div className="card_header">
                        <h2>{item.Title}</h2>
                        <p>{item.description}</p>
                        <p className="price">{item.Price}<span></span></p>
                        <div className="btn">Show Details</div>
                    </div>
                </div>
            </Link>
        )          
    }

    );


    const listItems2 = products.map((item) => {
        if (item.Category == '2' && item._id=="6288fca2cf6785cbfd5d8d23")

            return (
                <Link to={`/item/${item._id}`} >
                    <div className="card" key={item.id}>

                        <div className="card_img">
                        {/* <img src={'http://127.0.0.1:8000' + item.image} /> */}
                            <img src={'https://i.ibb.co/Ms0LFg8/jacket.png'} />
                        </div>
                        <div className="card_header">
                            <h2>{item.Title}</h2>
                            <p>{item.description}</p>
                            <p className="price">{item.Price}<span></span></p>
                            <div className="btn">Show Details</div>
                        </div>
                    </div>
                </Link>
            )
            if (item.Category == '2' && item._id=="629ed00320bbe33432055f5a")
            return (
                <Link to={`/item/${item._id}`} >
                    <div className="card" key={item.id}>

                        <div className="card_img">
                        {/* <img src={'http://127.0.0.1:8000' + item.image} /> */}
                            <img src={'https://i.ibb.co/7rd596B/tshirt-1.png'} />
                        </div>
                        <div className="card_header">
                            <h2>{item.Title}</h2>
                            <p>{item.description}</p>
                            <p className="price">{item.Price}<span></span></p>
                            <div className="btn">Show Details</div>
                        </div>
                    </div>
                </Link>
            )

            if (item.Category == '2' && item._id=="629ee45820bbe33432055f6a")
            return (
                <Link to={`/item/${item._id}`} >
                    <div className="card" key={item.id}>

                        <div className="card_img">
                        {/* <img src={'http://127.0.0.1:8000' + item.image} /> */}
                            <img src={'https://i.ibb.co/9bZf2Nv/cloth-1.png'} />
                        </div>
                        <div className="card_header">
                            <h2>{item.Title}</h2>
                            <p>{item.description}</p>
                            <p className="price">{item.Price}<span></span></p>
                            <div className="btn">Show Details</div>
                        </div>
                    </div>
                </Link>
            )
    }

    );

    const listItems3 = products.map((item) => {
        if (item.Category == '3')

            return (
                <Link to={`/item/${item._id}`} >
                    <div className="card" key={item.id}>

                        <div className="card_img">
                        {/* <img src={'http://127.0.0.1:8000' + item.image} /> */}
                            <img src={'https://ibb.co/M5cYCg3'} />
                        </div>
                        <div className="card_header">
                            <h2>{item.Title}</h2>
                            <p>{item.description}</p>
                            <p className="price">{item.Price}<span></span></p>
                            <div className="btn">Show Details</div>
                        </div>
                    </div>
                </Link>
            )
    }

    );

    const listItems4 = products.map((item) => {
        if (item.collection == 4)

            return (
                <Link to={`/products/${item.id}`} >
                    <div className="card" key={item.id}>

                        <div className="card_img">
                            <img src={'http://127.0.0.1:8000' + item.image} />
                        </div>
                        <div className="card_header">
                            <h2>{item.title}</h2>
                            <p>{item.description}</p>
                            <p className="price">{item.budget}<span></span></p>
                            <div className="btn">Show Details</div>
                        </div>
                    </div>
                </Link>
            )
    }


    );

    const listItems5 = products.map((item) => {
        if (item.collection == 10)

            return (
                <Link to={`/products/${item.id}`} >
                    <div className="card" key={item.id}>

                        <div className="card_img">
                            <img src={'http://127.0.0.1:8000' + item.image} />
                        </div>
                        <div className="card_header">
                            <h2>{item.title}</h2>
                            <p>{item.description}</p>
                            <p className="price">{item.budget}<span></span></p>
                            <div className="btn">Show Details</div>
                        </div>
                    </div>
                </Link>
            )
    }
    );

    const serviceItem1 = services.map ((item) => {

        console.log("service")
        return (
            <Link to={`/services/${item.id}`} >
                <div className="card" key={item.id}>

                    <div className="card_img">
                        <img src={'http://127.0.0.1:8000' + item.image} />
                    </div>
                    <div className="card_header">
                        <h2>{item.title}</h2>
                        <p>{item.description}</p>
                        <p className="price">{item.budget}<span></span></p>
                        <div className="btn">Show Details</div>
                    </div>
                </div>
            </Link>

        
        )

    }

    );

//    localStorage.clear();

  function handleClose()
  {
    setPopupOpen(false);
  }
  // if (localStorage.getItem("user") == "629ebb2ee9a4d3fbd9dff488") {
  //   return ( <Redirect to="/dashboard"> </Redirect>);
  // }
  return (
    <PageContainer>
      <Navbar />
      <Slider />
      {localStorage.getItem("registered") == null ? (
        <BankPopUp open={false} />
      ) : (
        <BankPopUp open={popupOpen} onClose={handleClose} />
      )}
      <div className="cont">
        <Link to="/electronics">
          <h1 style={{ color: "#fff" }}>Electronics</h1>
        </Link>
        {/* <Slider {...settings}> */}
        {/* <div><h1>
                    <FontAwesomeIcon icon={faSort} color="#fff"></FontAwesomeIcon>
                    <Dropdown options={options} onChange={()=>{}} value={defaultOption} placeholder="Select an option" />;
                    </h1></div> */}
                <div className="main_content">
                    {listItems1}
                </div>
                {/* </Slider> */}
                <Link to="/furnitures">
                    <h1 style={{ "color": "#fff" }}>
                        Mens' and Womens' Closet
                    </h1>
                </Link>
                <div className="main_content">
                    {listItems2}
                </div>
                {/* <Link to="/other">
                <h1 style={{"color": "#fff"}}>
                   Other
                </h1>
                </Link>
                <div className="main_content">
                    {listItems5}
                </div>
                <Link to="/other">
                <h1 style={{"color": "#fff"}}>
                   Services
                </h1>
                </Link>
                <div className="main_content">
                    {serviceItem1}
                </div> */}
                <Footer>
                </Footer>
            </div>

        </PageContainer>

    )
}