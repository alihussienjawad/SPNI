
 
import {   Button,  Col, Form, Input, Row } from "antd";
import { ILoginResponse, LoginDto } from '../../Interfaces/GeneralInterface';
import { useForm } from "antd/es/form/Form";
 
import {    useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import { LoginAsync, NotLogin } from '../../../app/reducers/authSlice';
import { useNavigate } from 'react-router-dom';
import Loading from '../../compontents/loading';
 
 
const Login = () => {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [form] = useForm<LoginDto>();
    const [loginResponse, setloginResponse] = useState<ILoginResponse>({} as ILoginResponse)
    const [error, seterror] = useState<string>("")
    const { loading} = useSelector((state: RootState) => state.auth)

 

    const onFinish = async (values: LoginDto) => {

        const x = (await dispatch(LoginAsync(values))).payload as ILoginResponse;
        
        if (x.loginStatus) {
            setloginResponse(x);
            localStorage.setItem('token', x.token)
            localStorage.setItem('refresh_token', x.refresh_token)
            localStorage.setItem('refresh_token_expiry', x.refresh_token_expiry?.toString())
            navigate('/')

        }
        else {
            seterror("اسم المستخدم او كلمة المرور غير صحيحة");
            dispatch(NotLogin());
        }
    };



    return (


        < >
      
            {loading && <Loading />}
            {!loginResponse.loginStatus ? <h1>{loginResponse.message}</h1>:null }
            <Row className='a1' style={{ display: 'flex', justifyContent: 'center', minHeight: '100vh', alignContent: 'center'  } }>
                 
               
                <Col span={12} style={{  minHeight:'100vh',alignContent:'center'} }  >
                     
                
            
                    {error.length > 0 ? <h5 className="text-danger w-100 text-center">{error}</h5> : null}
                    <Form
                                    form={form}
                                   name="trigger"
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 700, fontWeight: 500  }}
                                    initialValues={{ remember: true }}
                                    onFinish={onFinish}
                             
                        autoComplete="off"

                                >
                                    <Form.Item<LoginDto>
                                        label="اسم المستخدم"
                                         name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'الايميل مطلوب!',
                                },
                                {
                                    pattern: new RegExp(/^[A-Za-z0-9._%+-]+@mod\.com$/),
                                    message: 'يجب ان يحتوي الايميل على الدومين mod.com@',
                                },
                            ]} 
                                         
                                    >
                            <Input  />
                                    </Form.Item>

                        <Form.Item<LoginDto>
                                        label="كلمة المرور"
                                        name="password"
                                    
                                    >
                                        <Input.Password   />
                                    </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16, }} style={{    width:'45vw', display:'flex',justifyContent:'center', alignContent:'center'} }>
                            <Button   style={{ backgroundColor: '#ac70e4', color: 'white', fontFamily:'Amiri-Bold'}}  htmlType="submit" >
                                     
                                 تسجيل الدخول
                                        </Button>
                                    </Form.Item>
                                </Form>
                            
                  </Col >
                 




                


                <Col span={12} style={{ /*backgroundColor: '#ac70e4'*/  minHeight:'100vh',alignContent:'center' } }>
                    <h1 style={{ display: 'flex', justifyContent: 'center', color: 'white', fontFamily: 'Amiri-Bold' }}> S.O.F.S </h1>
                    <h1 style={{ display: 'flex', justifyContent: 'center', color: 'white', fontFamily: 'Amiri-Bold' }}>    نظام  متابعة الاهداف الاستراتيجية </h1>
                    <div className='image' style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }} > <img src={'./images/global-network.png'} style={{ maxWidth: '30vw', maxHeight: '30vh', }} />
                    </div>

                      </Col  >
                </Row>
                    
               
             
        </>
    )
};
export default Login;