import { Box, Link } from '@chakra-ui/react';
import {Stack} from '@chakra-ui/react';
import React, { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import { Flex } from '@chakra-ui/react';
import {FcBarChart} from "react-icons/fc"
function SideBar() {
    const authContext = useContext(AuthContext);
    return ( 
        <Box width='25%' height="100vh" bgcolor="white" display="flex" flexDirection="column">
            <Box>   
                    <Link href="/admin/gestion_services" underline="none"><Flex><FcBarChart /> Dashboard</Flex></Link>
                    {authContext.user.isAdmin ? 
                        <Stack spacing={1}>
                        <Link href="#"><Flex><FcBarChart />Gestion des employees</Flex></Link>
                        <Link href="#"><Flex><FcBarChart />Gestion des employees</Flex></Link>
                        </Stack>
                        :
                        <p></p>
                    }
                    {authContext.user.isEmployee ?
                        <Stack spacing={1}>
                        <Flex><FcBarChart />Demande Congée</Flex>
                        </Stack>
                        :
                        <p></p>
                    }
            </Box>
        </Box>
        );
}

export default SideBar;