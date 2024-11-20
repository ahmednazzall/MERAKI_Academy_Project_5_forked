import React,{useEffect,useState} from 'react';

import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { getAllUsers } from '../../redux/reducers/sliceUser';
import { setPosts } from '../../redux/reducers/slicePosts';
import { ResponsivePie } from '@nivo/pie'

const AdminHome = () => {
const dispatch=useDispatch()
const [admin, setAdmin] = useState(null)
const token = localStorage.getItem('token')
const users = useSelector((users)=>{
  return users.users.users
})
const posts = useSelector((posts)=>{
  return posts.posts.posts
})
const isLogin = users.filter((elem)=>{
  return elem.is_login == true
})
useEffect(() => {
  axios.get('http://localhost:5000/users/all',{
      headers: {
          Authorization: `Bearer ${token}`,
        },
  }).then((res)=>{
      // console.log(res.data);
      
      dispatch(getAllUsers(res.data.Users))
      const AdminProfile = res.data.Users.find((user=>{return user.role_id===1}))
      // console.log(admin);
      setAdmin(AdminProfile)
  }).catch((err)=>{
      console.log(err);
      
  })
 
}, [users]);

useEffect(() => {
  axios.get('http://localhost:5000/posts',{
      headers: {
          Authorization: `Bearer ${token}`,
        },
  }).then((res)=>{
      if (res.data.Posts.length) {
          dispatch(setPosts(res.data.Posts))
          
      }
      else{
          dispatch(setPosts([]))
      }
      
  }).catch((err)=>{
      console.log(err);
      
  })
 
}, [posts]);
// console.log(posts.length);

const data=[
  {
    "id": "users",
    "label": "users",
    "value": users.length,
    "color": "hsl(153, 70%, 50%)"
  },
  {
    "id": "posts",
    "label": "posts",
    "value": posts.length,
    "color": "hsl(344, 70%, 50%)"
  },
  {
    "id": "Activity",
    "label": "Activity",
    "value": 5,
    "color": "hsl(183, 70%, 50%)"
  },
  {
    "id": "I have No Idea",
    "label": "erlang",
    "value": 6,
    "color": "hsl(260, 70%, 50%)"
  },
  {
    "id": "Meraki",
    "label": "money",
    "value": 10,
    "color": "hsl(43, 70%, 50%)"
  }
]
  return (
    <div style={{height:"500px" ,width:"700px"}}>
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.2
                ]
            ]
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    2
                ]
            ]
        }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'ruby'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'c'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'go'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'python'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'scala'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'lisp'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'elixir'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'javascript'
                },
                id: 'lines'
            }
        ]}
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
    />

    </div>
  )
}

export default AdminHome