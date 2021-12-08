import { Box } from '@chakra-ui/react';
import React from 'react';
import { Route, Routes } from 'react-router';
import Services from '../components/admin/services';
function Home (){
    return(
        <Box display="flex" width="80%">
            <div>Hello im home</div>
           <Routes>
               <Route exact path="/admin/gestion_services" element={ <Services />} />
           </Routes>
        </Box>
    )
}

export default Home;