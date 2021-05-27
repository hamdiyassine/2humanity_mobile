import {ADD_POST,DELETE_POST } from './actions';

export const add_post=(newPost)=>({
    type:ADD_POST,
    post:newPost
})
export default delete_post =(id_)=>({
    type:DELETE_POST,
    id:id_

})
// export const add_comment=()=>({
//     type:ADD_COMMENT,
    
// })