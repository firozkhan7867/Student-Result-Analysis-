import React, { Component, useState } from 'react';
import "./sidebar.css"; 
import styled from 'styled-components';
import { Link } from '@material-ui/core';
import * as RiIcons from 'react-icons/ri';
import { fetchSemData, fetchSubjData ,fetchSubjSectAnalysys} from '../../actions/visua';
import { connect } from 'react-redux';
import { useNavigate } from "react-router-dom";


const SidebarLinksem = styled(Link)`
display: flex;
color: white;
justify-content: space-between;
align-items: center;
padding: 20px;
list-style: none;
height: 60px;
text-decoration: none;
font-size: 18px;
margin-left:40px;
z-index:500;
text-decoration:none;
&:hover {
  background: #252831;
  border-left: 4px solid #632ce4;
  cursor: pointer;
  color:white;
}
`;

const SidebarLabelsem = styled.span`
margin-left: 46px;
z-index:111500;
`;




const SidebarLabeltt = styled.span`
margin-left: 66px;
`;


const DropdownLinktt = styled(Link)`
background: #e0d5d5;
height: 60px;
padding-left: 3rem;
display: flex;
margin-left:20px;
align-items: center;
text-decoration: none;
color: black;
font-size: 18px;
z-index:10000;
&:hover {
  background: white;
  cursor: pointer;
  color:black;
}
`;

const SubSemSubmenu = ({item, fetchSemData,fetchSubjData,fetchSubjSectAnalysys}) => {

  const [subnava1, setSubnava1] = useState(false);
  let history = useNavigate();

  const showSubnava1 = () => setSubnava1(!subnava1);

  
    const get = async (id) =>{
      fetchSemData(id).then(()=>{
        if (window.location.pathname !== "/analysis"){
          history("/analysis");
        }
      }).catch(()=>{
        if (window.location.pathname === "/analysis"){
          history("/");
        }
      } 
      );
      // fetchSubjData(id);
      // fetchSubjSectAnalysys(id);
      // await new Promise(resolve => setTimeout(resolve, 3000));
      // await wait(2000);
      // history('/analysis');
      // console.log(window.location.pathname);
      

      if (window.location.pathname !== "/analysis"){
        history("/analysis");
      }
      // if ()
    }
    
  
  
    return (
        <>
        <SidebarLinksem onClick={item.name && showSubnava1}>
            <div>
            <SidebarLabelsem>{item.name} Semester</SidebarLabelsem>
            </div>
            <div>
          {item.name && subnava1
              ? <RiIcons.RiArrowUpSFill />
              : item.name
              ? <RiIcons.RiArrowDownSFill />
              : null}
          </div>
        </SidebarLinksem>
        {subnava1 &&
          <p onClick={get(item.id)}></p>
          }
        
        </>
    );
  };
  



  export default connect(null, {fetchSemData,fetchSubjData,fetchSubjSectAnalysys})(SubSemSubmenu);
  