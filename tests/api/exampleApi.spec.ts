import {test,expect, request} from '@playwright/test'
import config from '../testdata/config.json' with { type: 'json' };

test.describe('API Test', () => {
  const baseurl='https://reqres.in/'
test.only("api get operation ",async({request})=>{
  const response=await request.get(`${config.api.baseUrl}/api/users/2`)
  console.log(await response.json())
  expect(response.status()).toBe(200)
  const body=await response.json()
console.log(body.data.email)
  expect(body.data.id).toBe(2)
})
test("api post request ",async({request})=>{
  const baseurl='https://reqres.in/'
  const reqbody={
    "name": "asif",
    "job": "leader"
  }
  const response = await request.post(`${baseurl}api/users`,{data:reqbody})
  expect(response.status()).toBe(201)
})
///////////////////
test("api put request ",async({request})=>{
  const baseurl='https://reqres.in/'
  const response = await request.put(`${baseurl}api/users/2`,{data:{
     "name": "Asif",
  "job": "test resident"
  }})
  expect(response.status()).toBe(200)
console.log(await response.json())
})
test("patch request ",async({request})=>{
  const response=await request.patch(`${baseurl}api/users/2`,{data:{
  "job": "changed job"
  }})
  expect(response.status()).toBe(200)
  console.log(await response.json())
})

test("Delete request ",async({request})=>{
  const baseurl='https://reqres.in/'
  const reposne=await request.delete(`${baseurl}api/users/2`)
  expect(reposne.status()).toBe(204)
})

// header and query / param
test("api get with headers request ",async({request})=>{
  const baseurl='https://reqres.in/'
  const response = await request.get(`${baseurl}api/users`,{headers:{"Content-Type":"application/json"},params:{
    page:2
  }})
  expect(response.status()).toBe(200)
})
})