
import { Box, Link } from '@chakra-ui/react';
import {Heading} from '@chakra-ui/react';
import React, { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import { Flex } from '@chakra-ui/react';
import {FcBarChart} from "react-icons/fc";
import {AiFillFlag} from "react-icons/ai";
import './sidebar.css'
function SideBar() {
    const authContext = useContext(AuthContext);
    return ( 
        <Box width='25%' height="100vh" bgcolor="white" >
            <Heading as="h3" size='lg' mx={75} marginTop="25px" w="150px">EMS APP</Heading>
            <Box height="500px" display="flex" flexDirection="column" justifyContent="center" alignItems="flex-start" marginLeft="5px">   
                    <Link href="/home/dashboard" className="side-bar-link" my="5px"><Flex alignItems="center"><FcBarChart /> Dashboard</Flex></Link>
                    {authContext.user.isAdmin ? 
                        <Box >
                        <Link href="#" className="side-bar-link" my="5px"><Flex alignItems="center"><FcBarChart />Gestion des employees</Flex></Link>
                        <Link href="/home/services" className="side-bar-link" my="5px"><Flex alignItems="center"><FcBarChart />Gestion des services</Flex></Link>
                        </Box>
                        :
                        <p></p>
                    }
                    {authContext.user.isEmployee ?
                        <Box spacing={1}>
                        <Link href="/home/dashboard" className="side-bar-link" my="5px"><Flex alignItems="center" ><FcBarChart />Demande Congée</Flex></Link>
                        </Box>
                        :
                        <p></p>
                    }
            </Box>
        </Box>
        );
}

export default SideBar;