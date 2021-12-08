import { Box } from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import {InputGroup, InputLeftElement, Input, Wrap, WrapItem, Avatar, AvatarBadge} from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
function Header() {
    const authContext = useContext(AuthContext);
    console.log(authContext.user.picture)
    return ( 
        <Box w="100%" h="50px" display="flex" p={2} alignItems='center'>
            <InputGroup flexBasis='60%' marginTop={2}>
                <InputLeftElement
                pointerEvents="none"
                children={<BsSearch color="gray.300" />} />
            <Input type="text" placeholder="Enter your search"/>    
            </InputGroup>
            <Wrap flexBasis='40%' marginRight={5} marginTop={2}>
                <WrapItem justifyContent='flex-end' ><Avatar name={authContext.user.firstName +' '+ authContext.user.lastName} src={'http://localhost:3000'}><AvatarBadge boxSize='1.25em' bg='green.500'/></Avatar></WrapItem>
            </Wrap>
        </Box>
     );
}

export default Header;