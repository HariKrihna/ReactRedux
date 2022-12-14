const redux=require('redux')
const reduxLogger=require('redux-logger')



const logger=reduxLogger.createLogger()
const createStore=redux.createStore
const applyMiddleWare=redux.applyMiddleware
const combineReducers=redux.combineReducers

const BUY_CAKE='BUY_CAKE'
const BUY_ICECREAM='BUY_ICECREAME'

// ACTION

const buyCake=()=>{
    return{
        type:BUY_CAKE,
    }
}

const buyIceCream=()=>{
    return{
        type:BUY_ICECREAM
    }
}

const intialCakeState={
    numberOfCakes:10
}
const intialIceCreamState={
    numberOfIceCream:20
}

const reducer=(state=intialState,action)=>{
    switch(action.type){
        case BUY_CAKE:
            return {
                ...state,
                numberOfCakes:state.numberOfCakes-1
            }
        default:
            return state
    }
}

const cakeReducer=(state=intialCakeState,action)=>{
    switch(action.type){
        case BUY_CAKE:
            return {
                ...state,
                numberOfCakes:state.numberOfCakes-1
            }
        default:
            return state
    }
}

const icecreamReducer=(state=intialIceCreamState,action)=>{
    switch(action.type){
        case BUY_ICECREAM:
            return {
                ...state,
                numberOfIceCream:state.numberOfIceCream-1
            }
        default:
            return state
    }
}



const rootreducer=combineReducers({
cake:cakeReducer,icecream:icecreamReducer
})


//1 creating store
const store=createStore(rootreducer,applyMiddleWare(logger))
//2 allow access to state
console.log('Initial State',store.getState())
//4 subscribe
const unsubscribe=store.subscribe(()=>{})
//3 updating the state
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())
//5 unsubscribe
unsubscribe()