import { useDispatch } from 'react-redux'
import { api } from '../../../libs/api'
import { Action, ThunkDispatch } from '@reduxjs/toolkit'
import { RootState } from '../../../store/type'
import { dataThreads } from '../../../store/slice'
import { useThreadUser } from '../../DitailUser/hooks/useThreadUser'

export const useThreadLikes = () => {

    const { threadUser } = useThreadUser()
    const dispatch = useDispatch<ThunkDispatch<RootState, unknown, Action>>()


    const token = sessionStorage.getItem('token')

    const config = {
        headers: { Authorization: `Bearer ${token}`}
    }
    const handleLikes =  async (id: number) => {
        try{
            const data = {
                thread:id
            }
            const response = await api.post('/thread/like',data, config)
            console.log(response.data)
            dispatch(dataThreads());
            threadUser();
            
        } catch (error){
            console.log("error in post like",error)
        }
    }
    
  return {
    handleLikes
  }
}
