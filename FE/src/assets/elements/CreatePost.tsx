import { Avatar, Button, Flex, FormLabel, Input } from '@chakra-ui/react'
// import { useFormik } from 'formik'
import { SlPicture } from 'react-icons/sl'
import { api } from '../libs/api'
import { useState } from 'react'

interface IFrom {
  content: string,
  image_thread: File | null
}
export const CreatePost = ( ) => {
  
 
  const token = sessionStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
  }

  // const formik = useFormik({
  //   initialValues: {
  //     content:"",
  //     image:"",
      
  //   }, onSubmit: async () => {
  //     try {
        
  //       await api.post('/thread/post', formik.values, config)
        
        
  //     } catch (error) {
  //       console.log(error);
        
  //     }
  //   }
  // });

  // console.log(formik.values.image)

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //   const { name, value } = e.target;
    //   setFile((prevFile) => ({ ...prevFile, [name]: value }));
    // }
    const [ file, setFile ] = useState<IFrom>(
      {
        content:"",
        image_thread: null,
      }
    )
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await api.post('/thread/post', file, config)
      console.log(response);
      console.log(file);
      
      
      
    } catch (error) {
      console.log(error);
      
    }
  }
  

  return (
    <form onSubmit={handleSubmit} >         
      <Flex 
          p={'3vh'}  
          gap={'2vh'} 
          w={'100%'}>
          <Avatar
              src="https://cdn.pixabay.com/photo/2020/10/11/19/51/cat-5646889_640.jpg"/>
          <Input 
          name='content' 
          type="text" 
          placeholder="What is Happening!? " 
          border={'none'} 
          // onChange={formik.handleChange} 
          // value={formik.values.content}
          onChange={(e)=> setFile((prevFile)=>({...prevFile, content: e.target.value}))} 
          ></Input>

          <FormLabel htmlFor="image">
              <SlPicture size={38} color="#005e0e"/>
          </FormLabel>
          <Input 
          type="file" 
          id="image"
          name='image' 
          // onChange={(e) => { formik.setFieldValue('image', e.target.files![0]) }} 
          onChange={(e)=> setFile((prevFile)=>({...prevFile, image_thread: e.target.files![0]}))}
          accept='image/jpg, image/jpeg, image/png'
          hidden/>  
          <Button bg={'#005e0e'} type='submit'>Post</Button>
      </Flex>
    </form>
  )
}