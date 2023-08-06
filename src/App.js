import styles from './App.module.scss'
import classNames from 'classnames/bind';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { publicRoutes } from './routes';
import { Suspense, lazy } from 'react';
import Loading from './components/lazy-loading';
import { useGlobalState } from './provider/useGlobalState';
import OrderBox from './components/order-box';
import PoPup from './components/po-pup';


const cx = classNames.bind(styles)
const LazyComponent = lazy(() => import('./components/lazy/index'));


function App() {

  const [state, ] = useGlobalState()

  return (
    <div className={cx('wrapper')}>
       <Suspense fallback={<Loading/>}>
          <LazyComponent/>
            <Router>
              <div>
                <Routes>
                  {
                    publicRoutes.map((route, index)=>{
                      const Page = route.page
                      return (
                        <Route path={route.path} key={index} element={<route.layout><Page/></route.layout>}/>
                      )
                    })
                  }
                </Routes>
              </div>
            </Router>
       </Suspense>
       { state.isLoading && <Loading/> }
       { state.order &&  <div className={cx('order-box')}><OrderBox/></div> }
       { state.popup && <div className={cx('po-pup')}><PoPup text={state.popup.text} type={state.popup.type}/></div> }
    </div>
  );
}

export default App;
