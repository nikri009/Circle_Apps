import { Avatar, Box, Flex, Text, Image, Button } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { BiArrowBack } from "react-icons/bi"
import { FaHeart } from "react-icons/fa"
import { LiaComment } from "react-icons/lia"
import { Link, useParams } from "react-router-dom"
import { api } from "../libs/api"
import { PostReplys } from "../elements/CreateReplys"
import { useSelector } from "react-redux"
import { RootState } from "../../store/type"
import { useDispatch } from "react-redux"
import { STATE_THREAD_BY_ID } from "../../store/rootReducer"


export const DetailThreads = () => {
    const [ like, setLike ] = useState<boolean>(false)
    // const [ data, setData ] = useState<DataProps>()
    const follow = () => {
        if (!like){
            setLike(true)
        } else {
            setLike(false)
        }
    }
    const { id } = useParams()

    const threadById = useSelector((state: RootState) => state.threadById)
    const dispatch = useDispatch()
    const getThreadById = async () => {
        try {
            const response = await api.get(`/thread/${id}`)
            dispatch(STATE_THREAD_BY_ID(response.data.data))
            // setData(response.data.data)
            
        } catch (error) {
            console.log(error)
        }
    }
    // console.log(data)

    const convertTime = ( time:string ) => {
        const date = new Date(time)
        const timeConvert = date.toLocaleString('id-ID', {day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric'})
        return timeConvert
    }

    useEffect(() => {
        getThreadById();
        
    })
    // console.log(data);
    

  return (
    <Box>
        <Link to={'/'} >
            <Flex p={'10px'} gap={3}  display={{ base: 'none',sm: 'none' , md:'flex', lg:'flex', xl:'flex'}}>
                    <BiArrowBack  size={30}/>
                    <Text fontSize={'xl'} fontWeight={'bold'}>Back</Text>
            </Flex>
          </Link>

        <Box 
        
        borderBottom={'1px solid #b2b2b2'}
        p="3vh"
        pb={'1vh'}
        
        
         >
            <Flex mb={'20px'} >
            <Avatar
                // src={items?.photo_profile}
                src={threadById?.user?.photo_profile}
                mr={'10px'}
            />
                 <Box  gap={{base:'0px', sm:'5px'}} mb='5px'>
                        <Text fontWeight={'bold'}>
                           
                            {/* {data?.user?.fullName} */}
                            {threadById?.user?.fullName}
                        </Text>
                        <Text color='#909090'>

                            {/* {data?.user?.fullName} */}
                             {threadById?.user?.username}
                        </Text>
                    </Box>
            </Flex>

            <Box 
                w='90%'
                ml='10px'
                
                >
                   

                    <Text fontSize={'sm'}>
                        {/* {data?.content} */}
                        {threadById?.content}
                        
                    </Text>

                    <Image
                        // src={data?.image_thread}
                        src={threadById?.image_thread}

                        w={'70%'}
                        my={5}
                        borderRadius={10}
                    />

                    <Flex mt='7px' ml={-19}>
                    
                        <Button  colorScheme='#262626' onClick={follow}>
                        { like ? <FaHeart size={20} color='red' /> : <FaHeart size={20} /> }
                        <Text color='#909090' ml={'5px'} mr={'20px'}>{threadById?.likes} </Text>
                        </Button>
                        <Button colorScheme='#262626'>
                            <Link to={'/'}>
                                <Flex>
                                    <LiaComment size={20} />
                                    <Text color='#909090' ml={'5px'}>
                                        {/* {data?.numberOfReply} */}
                                        {threadById?.numberOfReply} Replies</Text>
                                </Flex>
                            </Link>
                        </Button>
                    </Flex>
            </Box>
        </Box>
        <PostReplys/>


        {threadById?.reply?.map((items) => (
                    <Box 
                    display='flex'
                    borderBottom={'1px solid #b2b2b2'}
                    p="3vh"
                    pb={'1vh'}
                    key={items?.id}
                    
                     >
                        <Flex  >
                        <Avatar
                            src={items?.user?.photo_profile}
                        />
                        </Flex>
            
                        <Box 
                            w='90%'
                            ml='10px'
                            
                            
                            >
                                <Box display={{ base: 'grid', sm: 'flex' }} gap={{base:'0px', sm:'5px'}} mb='5px'>
                                    <Text fontWeight={'bold'}>
                                        {items?.user?.username} 
                                        
                                    </Text>
                                    <Text color='#909090'>
                                        @{items?.user?.fullName} 
                                        <span>&bull;</span> {
                                        convertTime(items?.created_at)}
                                    </Text>
                                </Box>
            
                                <Text fontSize={'sm'}>
                                    {items?.content}
                                </Text>
            
                                <Image
                                    // src={items?}
                                    w={'70%'}
                                    my={5}
                                    borderRadius={10}
                                />
            
                                
                        </Box>
                    </Box>
        ))}
    
        
    </Box>
  )
}