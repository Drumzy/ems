import { Box } from '@chakra-ui/react';
import React from 'react';
import { Route, Routes } from 'react-router';
import Services from '../components/admin/services';
function Home (){
    return(
        <Box display="flex">
            <div>Hello im home</div>
           <Routes>
               <Route path="/admin/gestion_services" element={ <Services />} />
           </Routes>
        </Box>
    )
}

export default Home;