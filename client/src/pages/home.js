import { Box } from '@chakra-ui/react';
import React from 'react';
import { Route, Routes } from 'react-router';
import Employees from '../components/admin/empoyee';
import RolesAndPermissions from '../components/admin/rolesandpermissions';
import Services from '../components/admin/services';
import Dashboard from './dashboard';
function Home (){
    return(
        <Box display="flex" width="100" bg="#e6e7f2">
           <Routes>
               <Route  path="admin/gestion_services" element={ <Services />} />
               <Route  path="dashboard" element={ <Dashboard /> } />
               <Route  path="services" element={ <Services />} />
               <Route  path="employees" element={<Employees />} />
               <Route  path="rolesandpermissions" element={<RolesAndPermissions />} />
           </Routes>
        </Box>
    )
}

export default Home;