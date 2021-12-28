import { Avatar, Box,Button,Image,Text } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { Heading } from '@chakra-ui/react'
function MyAccount() {
    const authContext = useContext(AuthContext);
    const [firstName,setFirstName] = useState('');
    return ( 
        <Box marginTop="-100px" display="flex" flexDirection="column" width="100%" bg="white" mx="25%" h="fit-content" borderRadius="5px">
                <Avatar src={"http://localhost:3500"+authContext.user.picture} size={'2xl'} pos={'relative'} left={'70%'} top={5}/>
                <Box display={'flex'} flexDirection={'column'} mx={5}>
                <Heading size={'md'}>Nom</Heading>
                <Text>{authContext.user.firstName}</Text>
                <Heading size={'md'}>Prénom</Heading>
                <Text>{authContext.user.lastName}</Text>
                <Heading size={'md'}>Email</Heading>
                <Text>{authContext.user.email}</Text>    
                </Box>
        </Box>
     );
}

export default MyAccount;