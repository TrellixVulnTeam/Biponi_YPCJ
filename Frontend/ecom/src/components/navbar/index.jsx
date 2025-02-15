import React from "react";
import styled from "styled-components";
import { BrandLogo } from "../brandLogo";
import { Button } from "../../components/button";
import { Link, Route, Switch } from "react-router-dom";
import { Marginer } from "../marginer";
import { ShoppingCart } from "@material-ui/icons";
import { IconButton, Badge } from "@material-ui/core";
import { Form } from "react-bootstrap";
import { CommonStateContext } from "../../contexts/common";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas, faSearch } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from "react-router-dom";
import { useState } from "react";

const NavbarContainer = styled.div`
  width: 100%;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5em;
  background-color: ${({ useTransparent }) =>
    useTransparent ? "transparent" : "#264653"};
`;

const AccessibilityContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AnchorLink = styled.a`
  font-size: 14px;
  color: #fff;
  cursor: pointer;
  text-decoration: none;
  outline: none;
  transition: all 200ms ease-in-out;
  &:hover {
    filter: contrast(0.6);
  }
`;

const Seperator = styled.div`
  min-height: 35%;
  width: 1px;
  background-color: #fff;
`;

export function Navbar(props) {
  const { useTransparent } = props;
  const [query,setQuery]= useState("")
  const history= useHistory()

  return (
    <NavbarContainer>
      <Link to="/">
      <BrandLogo />
      </Link>
      <AccessibilityContainer>
      {
        localStorage.getItem('user')!=null && (
          <Link to="/chat">
          <Button size={19}> Chat </Button>
         
        </Link>
        )
      }
      <Marginer direction="horizontal" margin={16} />
      {/* <Form onSubmit={(e)=>{
        e.preventDefault()
          history.push("/search?query="+query)
      }} >
      <FontAwesomeIcon icon={faSearch} color="#fff"  useTransparent={useTransparent}></FontAwesomeIcon>
        <input onChange={(e)=>{setQuery(e.target.value)}} value={query} type="text" placeholder="         Search..." />
      </Form> */}
      { localStorage.getItem('user')!=null && (
        <Link to="/dashboard">
        <Button size={19}> Dashboard </Button>
       
      </Link>
      ) }
        <Marginer direction="horizontal" margin={16} />
        { localStorage.getItem('user')==null && (<Link to="/customer/access/signin">
          <Button size={19}> Login </Button>
         
        </Link>) }
        {/* <Marginer direction="horizontal" margin={16} />
        { localStorage.getItem('user') && (<Link to="/myproducts">
        <h3 style={{"color":"#fff"}}>My Products</h3>
        </Link>) } */}
        <Marginer direction="horizontal" margin={16} />
        { localStorage.getItem('user') && (<Link to="/">
        <div onClick={()=>{
          
          console.log("Logout clicked");
          localStorage.clear()
          
          }}><Button size={17}> Logout </Button></div>
        </Link>) }
        <Marginer direction="horizontal" margin={16} />
        <Link to="/cart">
        <button >
      <i className="fas fa-shopping-cart" ></i>
              </button>
        </Link>
      </AccessibilityContainer>
    </NavbarContainer>
  );
}
