 
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './Home';
import ListspiAttitude from './pages/spniAttitude/ListspiAttitude';
import ListSpniUnit from './pages/spniunit/ListSpniUnit';
import ListTarget from './pages/target/ListTarget';
import ListofficerInfo from './pages/officerInfo/ListofficerInfo';
import ListSubMangeMinistry from './pages/SubMangeMinistry/ListSubMangeMinistry';
import { Route, Routes } from 'react-router-dom';
 
 
import MainLayout from './layouts/MainLayout';
 
import Accessdenied from './Accessdenied';
import Login from './pages/account/Login';
 
import {  useDispatch, useSelector } from 'react-redux';
 
 
import { CloseModal } from '../app/reducers/modalSlice';
import {    Modal } from 'antd';
import Loading from './compontents/loading';
import { AppDispatch, RootState } from '../app/store';
import Users from './pages/account/ListUsers';
 
 import './App.css'
import PrivateRoute from './layouts/PrivateRoute';
import AnonymousLayout from './layouts/AnonymousLayout';
import ChangePassowrd from './pages/account/changePassowrd';
import ListImage from './pages/image/ListImage';
import ListISpniPdf from './pages/SpniPdf/ListISpniPdf';
import { RULES } from './Interfaces/roles';
import ListNews from './pages/news/ListNews';
import ListTargetsMangeMinistry from './pages/TargetsMangeMinistry/ListTargetsMangeMinistry';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
 
 
 
 
 



function App() {
    
    const { modalIcon, content, isOpen, Width, title, loading } = useSelector((state: RootState) => state.modal)
    const { dir  , locale } = useSelector((state: RootState) => state.setting);
    const dispatch = useDispatch<AppDispatch>();
    const { t, i18n } = useTranslation();

    useEffect(() => {

        i18n.changeLanguage(locale); //change the language

    }, [i18n,  locale])
 
    return (
        <>
         
      

            <Modal
              
                key={Math.random()}
                className="my-custom-class"
                title={<div className="" style={{ fontSize: '14px' }}>{title}{modalIcon}</div>}
                centered
                open={isOpen}
                onCancel={() => dispatch(CloseModal(false))}
                footer=""
                width={Width}
            >
             
                
                
                <div dir={dir}
                    style={{}}
                    className="content-m"
                >
                {content}
                    {loading && <Loading />}
                </div>
            </Modal>
         
            <Routes>
             
                <Route path='/' element={<MainLayout />}>
                   
                   
                    <Route path='/' element={<PrivateRoute allowedRules={[RULES.Admin,  RULES.Reader, RULES.Reports, RULES.RajManger, RULES.Manager, RULES.User, RULES.AllUnits,RULES.News]} />}>
                       
                        <Route path='/' element={<Home />} />  
                        
                    </Route>
                    <Route path='/' element={<PrivateRoute allowedRules={[RULES.Admin, RULES.Reader, RULES.Reports ,RULES.User]} />}>
                       
                        <Route path='ListspiAttitude' element={<ListspiAttitude />} />
                        
                    </Route>


                    <Route path='/' element={<PrivateRoute allowedRules={[RULES.Admin,RULES.Manager, RULES.Reports]} />}>
                        <Route path='Users' element={<Users />} />
                    </Route>
                    <Route path='/' element={<PrivateRoute allowedRules={[RULES.News]} />}>
                        <Route path='ListNews' element={<ListNews />} />
                    </Route>

                    <Route path='/' element={<PrivateRoute allowedRules={[RULES.Admin, RULES.Reports, RULES.RajManger]} />}>
                        <Route path='ListSpniUnit' element={<ListSpniUnit/>} />
                        <Route path='ListImage' element={<ListImage/>} />
                        <Route path='ListISpniPdf' element={<ListISpniPdf/>} />
                        <Route path='ListTarget' element={<ListTarget />} />
                        <Route path='ListofficerInfo' element={<ListofficerInfo />} />
                        <Route path='ListSubMangeMinistry' element={<ListSubMangeMinistry />} />
                        <Route path='ListTargetsMangeMinistry' element={<ListTargetsMangeMinistry />} />
                    </Route>

                </Route>

                <Route path='/' element={<AnonymousLayout />}>

                    <Route path='login' element={<Login/>} />
                    <Route path='changePassowrd' element={<ChangePassowrd />} />
                    <Route path='accessdenied' element={<Accessdenied />} />
                </Route>

                </Routes>
         
              
        </>
           );
              }
export default App;