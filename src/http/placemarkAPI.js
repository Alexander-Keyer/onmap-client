import { $host } from "./http";

export const createOne = async (formData) => {

  const {data} = await $host.post('/api/placemark/createOne', formData)

  return data.placemark
}

export const getAllPrivate = async (userId) => {
  const {data} = await $host.get('/api/placemark/getAllPrivate', {params: {userId}})

  return data
}

export const getAllPublic = async () => {
  const {data} = await $host.get('/api/placemark/getAllPublic')

  return data
}

export const getFriendsPlacemarks = async (userId) => {
  const {data} = await $host.get('/api/placemark/getFriendsPlacemarks', {params: {userId}})

  return data
}

export const getOnePublic = async (id) => {
  const {data} = await $host.get('/api/placemark/getOnePublic', {params: {id}})
  
  return data
}

export const getOnePrivate = async (id) => {
  const {data} = await $host.get('/api/placemark/getOnePrivate', {params: {id}})

  return data
}

export const putOnePlacemark = async (formData) => {
  const {data} = await $host.put('/api/placemark/putOne', formData)

  return data
}

export const deleteOnePlacemark = async (id) => {
  const {data} = await $host.delete('/api/placemark/deleteOne', {params: {id}})

  return data
}