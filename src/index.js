import ReactDOM from 'react-dom/client'
import './assets/base.less'
import Router from './router'
import store from './store'
import {Provider} from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
   <Provider store={store}>
        <Router />
   </Provider>
        
)
    