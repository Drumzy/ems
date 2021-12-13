import { Box } from "@chakra-ui/react";
import { Table, Thead, Tbody,Tr, Th, Td} from '@chakra-ui/react';
import {Button, Text} from "@chakra-ui/react";
import { useDisclosure } from '@chakra-ui/react'
import {AiOutlinePlus,AiTwotoneDelete} from "react-icons/ai";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody,  ModalCloseButton,} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react'
import { FormControl,FormLabel,Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

function Services() {
    const toast = useToast();
    const {onClose} = useDisclosure();
    const [serviceName,setServiceName] = useState('');
    const [rows, setRows] = useState([]);
    const [addModal,setaddModal] = useState(false);
    const [updateModal,setupdateModal] = useState(false);
    const [deleteModal,setdeleteModal] = useState(false);
    const selectModal = (service_id,e) =>{
        if(e == "add-service-btn"){
            setaddModal(true);
        }else if(e == "update-service-btn"){
            setupdateModal(true);
            localStorage.setItem('service_id',service_id);
        }else if(e == "delete-service-btn"){
            setdeleteModal(true);
            localStorage.setItem('service_id',service_id);
        }
    }
    function AddedToast(){
        return(
            toast({
                title: 'Service Ajoutée',
                description: "La Service a été ajouter avec success",
                duration: 5000,
                status: 'success',
                isClosable: true,
            })
        )
    }
    function UpdatedToast(){
        return(
            toast({
                title: 'Service Mis â jour',
                description: "La Service a été modifier avec success",
                duration: 5000,
                status: 'success',
                isClosable: true,
            })
        )
    }
    function DeleteToast(){
        return(
            toast({
                title: 'Service Supprimé',
                description: "La Service a été supprimer avec success",
                duration: 5000,
                status: 'success',
                isClosable: true,
            })
        )
    }
    const AddService = (e) =>{
        const body = {
            ServiceName : serviceName
        }
        const headers = {
            'Content-Type':'application/json',
            'X-Auth-Token': `${localStorage.getItem('token')}`,
        };
        e.preventDefault();
        axios.post('http://localhost:3500/api/service/add_service',body,{headers}).then((res)=>{
            AddedToast();
        },(error) =>{
            console.log(error.response);
        })
    }
    const UpdateService = (e) => {
        const body = {
            _id : localStorage.getItem('service_id'),
            ServiceName : serviceName
        };
        const headers = {
            'Content-Type':'application/json',
            'X-Auth-Token': `${localStorage.getItem('token')}`,
        }
        e.preventDefault();
        axios.post('http://localhost:3500/api/service/update_service',body,{headers}).then((res)=>{
            UpdatedToast();
        },(error)=>{
            console.log(error.response);
        })
    }
    const DeleteService = (e) => {
        const body = {
            _id : localStorage.getItem('service_id')
        };
        const headers = {
            'Content-Type':'application/json',
            'X-Auth-Token': `${localStorage.getItem('token')}`,
        }
        e.preventDefault();
        axios.post('http://localhost:3500/api/service/delete_service',body,{headers}).then((res)=>{
            DeleteToast();
        },(error)=>{
            console.log(error.response);
        })
    }
     function newFunction() {
                 axios.get('http://localhost:3500/api/service/all', { headers: { 'Content-Type': 'application/json', 'X-Auth-Token': `${localStorage.getItem('token')}` } })
                    .then((res) => {
                        setRows(res.data);
                    });
            }
    useEffect(() => {
        const interval = setInterval(()=>{
         newFunction();
        },3500);
        return () =>clearInterval(interval);
    },[]);
    return ( 
        <Box marginTop="-100px" display="flex" flexDirection="column" width="100%" bg="white" mx="25%" height="80%" borderRadius="5px">
            <Button id="add-service-btn" w={100} marginLeft="15px" marginTop="15px" display="flex" onClick={e=>selectModal(null,e.currentTarget.id)} colorScheme="green"><AiOutlinePlus />Ajouter</Button>
            <Table>
                <Thead>
                    <Tr>
                        <Th>Service</Th>
                        <Th>Chef de Service</Th>
                        <Th>Nombre des employees</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                   {rows.map(row =>
                        row != '' ?
                        <Tr key={row._id} id={row._id}  _hover={{backgroundColor:"#758dd6",transition:"0.8s ease-out"}}>
                            <Td mx={2} my={3}>{row.ServiceName}</Td>
                            <Td mx={2} my={3}>{row.ServiceChef}</Td>
                            <Td mx={2} my={3}>{row.EmployeeNumber}</Td>
                            <Td display="flex" flexDirection="row">
                            <Button mx={2} my={2} id="update-service-btn" variant="outline" colorScheme="#FF5600" color="#FF5600" onClick={e=>selectModal(row._id,e.currentTarget.id)}><AiTwotoneDelete /></Button>
                            <Button mx={2} my={2} id="delete-service-btn" variant="outline" colorScheme="red" color="red" onClick={e=>selectModal(row._id,e.currentTarget.id,)}><AiTwotoneDelete /></Button>
                            </Td>
                        </Tr>
                        : null
                    )} 
                </Tbody>
            </Table>
            <Modal isOpen={addModal} onClose={function(event){onClose();setaddModal(false);}}>
            <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Ajouter une Service</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl id="service_name">
                            <FormLabel>Nom de Service</FormLabel>
                            <Input type="text" onChange={e=>setServiceName(e.target.value)}/>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="red" mr={3} onClick={function(event){onClose();setaddModal(false);}}>Fermer</Button>
                        <Button color="green" mr={3} onClick={AddService}> Ajouter</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Modal isOpen={updateModal} onClose={function(event){onClose();setupdateModal(false);}}>
            <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modifer une Service</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl id="service_name">
                            <FormLabel>Nom de Service</FormLabel>
                            <Input type="text" onChange={e=>setServiceName(e.target.value)}/>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="red" mr={3} onClick={function(event){onClose();setupdateModal(false);}}>Fermer</Button>
                        <Button color="green" mr={3} onClick={UpdateService}> Modifer</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Modal isOpen={deleteModal} onClose={function(event){onClose();setdeleteModal(false);}}>
            <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Supprimer Service</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>Vous Etes sûr que vous voulez supprimer cette Service ?</Text>
                        <Text color="tomato">Cela va supprimer toutes la service avec les données reliées !</Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="blue" mr={3} onClick={function(event){onClose();setdeleteModal(false);}}>Fermer</Button>
                        <Button color="red" mr={3} onClick={DeleteService}> Supprimer</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
     );
}

export default Services;