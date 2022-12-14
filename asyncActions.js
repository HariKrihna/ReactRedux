const redux=require('redux')
const thunkMiddleWare=require('redux-thunk').default
const axios=require('axios')


const createStore=redux.createStore
const applyMiddleWare=redux.applyMiddleware


const intialState={
    loading:true,
    users:[],
    error:''
}

const FETCH_USERS_REQUEST='FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS='FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE='FETCH_USERS_FAILURE'

const fetchUsersRequest=()=>{
    return{
        type:FETCH_USERS_REQUEST
    }
}

const fetchUsersSuccess=(users)=>{
    return{
        type:FETCH_USERS_SUCCESS,
        payload:users
    }
}

const fetchUsersFailure=(error)=>{
    return{
        type:FETCH_USERS_FAILURE,
        payload:error
    }
}

const reducer=(state=intialState,action)=>{
    switch(action.type){
        case FETCH_USERS_REQUEST:
            return{
                ...state,
                loading:true
            }
        case FETCH_USERS_SUCCESS:
            return{
                loading:false,
                users:action.payload,
                error:''
            }
        case fetchUsersFailure:
            return{
                loading:false,
                users:[],
                error:action.payload
            }
    }
}

const fetchUsers=()=>{
    return function(dispatch){
        dispatch(fetchUsersRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response=>{
            //response data
            const users=response.data.map(user=>user.id)
            console.log(users)
            dispatch(fetchUsersSuccess(users))
        })

        .catch(error=>{
           //erroe message
           dispatch(fetchUsersFailure(error.message))
        })
    }
}
const store= createStore(reducer,applyMiddleWare(thunkMiddleWare))
store.subscribe(()=>{console.log(store.getState())})
store.dispatch(fetchUsers())