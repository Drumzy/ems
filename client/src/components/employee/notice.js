import { Box, Button, FormControl, FormLabel, Heading, Input, Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";
import axios from "axios";
import { useState,useContext } from "react";
import { AuthContext } from "../../context/authContext";
import {VscRequestChanges} from "react-icons/vsc"
function NoticeEmployee() {
    const authContext = useContext(AuthContext);
    const [startDate,setStartDate] = useState('');
    const [duration,setDuration] = useState(0);
    const [finishDate,setFinishDate] = useState('');
    const NoticeDemande = () =>{
    let tmp_date = new Date(Date.parse(startDate));
    let tmp_day = +tmp_date.getDate()+ +duration;
    tmp_date.setDate(tmp_day+1);
    setFinishDate(tmp_date.getFullYear()+'-'+tmp_date.getMonth()+1+'-'+tmp_date.getDate());
    console.log(finishDate)
    const data = {
        Employee: authContext.user._id,
        StartDate: startDate,
        Duration: duration,
        FinishDate: finishDate,
        Status: 'onHold',
    }

    axios.post("http://localhost:3500/api/notice/notice_demande",data).then((res)=>{
        console.log(res.data);
    })
    }
    return ( 
        <Box marginTop="-30px" display="flex" flexDirection="column" width="100%" bg="white" mx="25%" height="80%" borderRadius="5px" alignItems={'center'}>
        <Heading my={5} size={'md'}>Demande de Congé</Heading>
        <FormControl my={5} >
            <FormLabel>Date de début</FormLabel>
            <Input type={"date"} onChange={e=>setStartDate(e.currentTarget.value)}/>
        </FormControl>
        <FormControl my={5}>
            <FormLabel>Durée</FormLabel>
            <Input type={"number"} onChange={e=>setDuration(e.currentTarget.value)}/>
        </FormControl >
        <Button my={5} onClick={NoticeDemande} variant={'outline'} color={'green'} leftIcon={<VscRequestChanges />}>Demander un Congé</Button>
        
        </Box>
     );
}

export default NoticeEmployee;