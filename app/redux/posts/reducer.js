import {ADD_POST,DELETE_POST} from './actions';

const initialState={
   
   Posts:[],
}
export const Post_Reducer=(state=initialState,action)=>{
    switch(action.type){
        case ADD_POST:
            return {...state,
                Posts:state.Posts.concat({
                    post:action.post

                })

            }
        case DELETE_POST:
            return;

        default:
             return state

    }
}

