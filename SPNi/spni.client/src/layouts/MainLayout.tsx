import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { logout } from '../../app/reducers/authSlice'
import {

    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UsergroupDeleteOutlined,
    CalendarOutlined,
  
    GlobalOutlined,
    InsertRowRightOutlined,
    GoldOutlined,
    LogoutOutlined,
    PictureOutlined,
    UserSwitchOutlined,
    UsergroupAddOutlined,
    AimOutlined,
    SnippetsOutlined,
    PaperClipOutlined,
}
    from '@ant-design/icons';
 

import {  FloatButton, Layout, Menu, MenuProps } from 'antd';
import {  useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState} from '../../app/store';
import UserPdf from '../pages/SpniPdf/userPdf';
import { setModal } from '../../app/reducers/modalSlice';
 
import { RULES } from '../Interfaces/roles';
import localStorage from 'redux-persist/es/storage';
import { changeDiraction } from '../../app/reducers/settingSlice';
import { useTranslation } from 'react-i18next';
import arEG from 'antd/locale/ar_EG';
import enUs from 'antd/locale/en_Us';
 
 
 
 
/*import Loading from '../compontents/loading';*/

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;

}


 

function MainLayout() {
 
    const { t } = useTranslation();
  

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);

    const { userRoles } = useSelector((state: RootState) => state.auth.loginResponse);
    const { arlang,dir } = useSelector((state: RootState) => state.setting);
    

    const RagManager: boolean = userRoles?.includes(RULES.RajManger);
   
    const Admin: boolean = userRoles?.includes(RULES.Admin);
    const Manager:boolean = userRoles?.includes(RULES.Manager);
    const User: boolean = userRoles?.includes(RULES.User);
    const News: boolean = userRoles?.includes(RULES.News);

    const userPdfView = () => {
        dispatch(setModal({
            isOpen: true, content: <UserPdf />, Width: 500,
        }))
    }

    const items: MenuItem[] = [
        getItem((<Link to="/"  >
            <h1 className='d  '>{ t('home')} </h1>
        </Link>), '1', <GlobalOutlined style={{ color: '#C7253E' }} />),
         


        User?getItem((<Link to="/ListspiAttitude"  >
            <h1 className='d'>{t('targetfollow')} </h1>
        </Link>), '2', <CalendarOutlined style={{ color: '#C7253E' }} />):null,

        Manager ? getItem(<h1 className='d'>{t('usersmangment')}</h1>, "12", <  UserSwitchOutlined style={{ color: '#C7253E'  }} />, [

            getItem((<Link to="/Users" className='d'  >
                <UsergroupAddOutlined style={{ color: '#C7253E'}} />&nbsp;
                {t('usersdata')}
            </Link>), '4'),

        ]):null,



        RagManager || Admin ? getItem(<h1 className='d'>{t('systemMangment')}  </h1>, "", <InsertRowRightOutlined style={{ color: '#C7253E' }} />,
            [

                RagManager  ? getItem((<Link to="/ListTarget" className='d'>
                    {t('targets')}
                </Link>), '7', < AimOutlined style={{ color: '#C7253E' }} />) : null,

                RagManager ?getItem((<Link to="/ListofficerInfo" className='d'>
                    {t('nmpresentatives')}
                </Link>), '8', <UsergroupDeleteOutlined style={{ color: '#C7253E'}} />):null,

                Admin ? getItem((<Link to="/ListSubMangeMinistry" className='d  '  >
                    {t('modpresentatives')}
                </Link>), '9', <GoldOutlined style={{ color: '#C7253E' }} />) : null,

                Admin?getItem((<Link to="/ListSpniUnit" className='d'>
                    {t('commonunitsinthesystem')}
                </Link>), '10', <GoldOutlined style={{ color: '#C7253E' }} />) : null,
                Admin || RagManager ? getItem((<Link to="/ListTargetsMangeMinistry" className='d'>
                    {t('assignunitobjectives')}
                </Link>), '11', <GoldOutlined style={{ color: '#C7253E' }} />):null,

                RagManager ?getItem((<Link to="/ListImage" className='d'>
                    {t('maintainthephotogallery')}
                </Link>), '5', < PictureOutlined style={{ color: '#C7253E' }} />):null,

                RagManager ?getItem((<Link to="/ListISpniPdf" className='d'>
                    {t('sustainingcontexts')}
                </Link>), '6', <SnippetsOutlined style={{ color: '#C7253E' }} />) : null,
                RagManager || News ? getItem((<Link to="/ListNews" className='d'>
                    {t('maintainnotifications')}
                </Link>), '15', < PaperClipOutlined style={{ color: '#C7253E' }} />) : null, 


            ]
        ):null,
       
        getItem((<a className="d " style={{ borderRadius: "1px",   backgroundColor: 'transparent', color: "black"   }} onClick={userPdfView} >
            {t('contexts') }</a>
              
         ), '16', <GoldOutlined style={{ color: '#C7253E' }} />)  


    ];
    const { Sider } = Layout;


   

    const logout1 = async () => {
      const x = await  dispatch(logout())
        if (x) {
            if (localStorage.getItem("token") !== null) {
                localStorage.removeItem('token');
            }
            if (localStorage.getItem("refresh_token") !== null) {
                localStorage.removeItem('refresh_token');
            }
            if (localStorage.getItem("refresh_token_expiry") !== null) {
                localStorage.removeItem('refresh_token_expiry');
            }
           
           
        
            navigate('/')
        }
           
    }


    return (
        <>
        
           
            <Layout style={{ minHeight: '100vh' }} dir={dir}>
            <Layout>
                <Header className="header">
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            width: "100%"
                        }}>
                        <img src={'/Raj1.png'} width="60" height="60"
                            style={{ marginTop: "0px" }} />
                        <div style={{ textAlign: "center", padding: '15px' }} >
                                <h4 className='s'>{t('systemName')} </h4>
                        </div>
                        <img src={'/Nato.png'} width="60" height="60" style={{ marginTop: "0px" }} />
                    </div>
                </Header>
            </Layout>
            <Layout>
                    <Sider className='sider-1' width={arlang? 250:300} trigger={null} collapsible collapsed={collapsed}
                style={{
                    overflow: 'hidden',
                    background: "white",
                    marginTop: '74px',
                    maxHeight: '100vh',
                    borderRadius: '15px',
                    
                }}>


                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"

                    items={items}

                        />
                        <FloatButton.Group shape="circle" style={arlang ? { position: 'fixed', right: 30, bottom: 0 } : { position: 'fixed', right:'96%',bottom:0}}>
                          
                 
                            <FloatButton icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} onClick={() => setCollapsed(!collapsed)} />
                            <FloatButton icon={<LogoutOutlined />} onClick={() => logout1()} />
                            <FloatButton icon={null} description="AR" onClick={() => dispatch(changeDiraction({ dir: "rtl", locale: "ar", applocale: { arEG }, arlang:true }))} />
                            <FloatButton icon={null} description="EN" onClick={() => dispatch(changeDiraction({ dir: "ltr", locale: "en", applocale: { enUs }, arlang:false  }))} />
                           
                        </FloatButton.Group>

            </Sider>
                  
              <Layout  style={{ minHeight: 280, marginTop: '74px',marginBottom:'100px' }}>
              <Content
        
                        style={{
                            padding: '0 24px',
                            overflowY: 'auto',
                            height:'95vh'
                        }}
                    >
                            <div style={{minHeight:'90vh'} }> <Outlet /></div>
                            <Layout style={{ zIndex: 200 }}>
                                <Footer className="footer mt-3" >
                                    {t('copyWrite') }
                                </Footer>

                            </Layout > 
                        </Content>
                      
            </Layout>
            </Layout>
             
            </Layout > 
        </>
    );


}

export default MainLayout;