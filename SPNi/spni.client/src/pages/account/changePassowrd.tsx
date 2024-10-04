
 
import {   Button,  Col, Form, Input, Row } from "antd";
import {   resetPass } from '../../Interfaces/GeneralInterface';
import { useForm } from "antd/es/form/Form";
 
 
import {  useSelector } from 'react-redux';
import {   RootState } from '../../../app/store';
 
import { useNavigate } from 'react-router-dom';
import Loading from '../../compontents/loading';
import axios from "../../api";
 
 
 

const ChangePassowrd = () => {
    
 
    const navigate = useNavigate();
    const [form] = useForm<resetPass>();
  

    
    const { loading  ,loginResponse } = useSelector((state: RootState) => state.auth)
    
  
   
 
    const onfinish = (values: resetPass  ) => {
        values.token = loginResponse.token;
         

      
            axios.post(`/Account/PasswordNew`, values)
                .then(res => {
                  
                    if (res.data) 
                    navigate('/login')
                })
        
    };

    
     
    return (


        < >
            
            {loading && <Loading />}
            {!loginResponse.loginStatus ? <h1>{loginResponse.message}</h1>:null }
            <Row className='a2' style={{ display: 'flex', justifyContent: 'center', minHeight: '100vh', alignContent: 'center'  } }>
                 
               
                <Col span={12} style={{  minHeight:'100vh',alignContent:'center'} }  >
                     
                
                    <h2 style={{ display: 'flex', justifyContent: 'center', color: '#ac70e4', fontFamily: 'Amiri-Bold',marginBottom:'10px' }}> عليك اعادة تعيين كلمة المرور الافتراضية للاستمرار </h2>
             
                    <Form
                                    form={form}
                                   name="trigger"
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 700, fontWeight: 500  }}
                                   
                        onFinish={onfinish}
                             
                        autoComplete="off"

                                >
                                      <Form.Item<resetPass>
                                            label="كلمة المرور الجديدة"
                                            name="newPassword"
                                         
                                         
                                             >
                                        <Input />
                                    </Form.Item>

                        <Form.Item<resetPass>
                                        label="تاكيد كلمة المرور الجديدة"
                                        name="confirmPassword"
                                    
                                    >

                                        <Input />
                        </Form.Item>

                        <Form.Item<resetPass>
                            label="user"
                            name="token"
                            hidden 
                        >

                            <Input />
                        </Form.Item>
                        
                        <Form.Item wrapperCol={{ offset: 8, span: 16, }} style={{    width:'45vw', display:'flex',justifyContent:'center', alignContent:'center'} }>
                            <Button style={{ backgroundColor: 'lightskyblue', color: 'white', fontFamily:'Amiri-Bold'}}  htmlType="submit">
                                     
                                 اعادة تعيين كلمة المرور الافتراضية
                                        </Button>
                                    </Form.Item>
                                </Form>
                            
                  </Col >
                 




                


                <Col span={12} style={{ /*backgroundColor: '#ac70e4'*/  minHeight:'100vh',alignContent:'center' } }>
                    <h1 style={{ display: 'flex', justifyContent: 'center', color: 'white', fontFamily: 'Amiri-Bold' }}> S.P.N.I </h1>
                    <h1 style={{ display: 'flex', justifyContent: 'center', color: 'white', fontFamily: 'Amiri-Bold' }}>    نظام  متابعة الاهداف الاستراتيجية </h1>
                    <div className='image' style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }} > <img src={'./images/global-network.png'} style={{ maxWidth: '30vw', maxHeight: '30vh', }} />
                    </div>

                      </Col  >
                </Row>
                    
               
             
        </>
    )
};
export default ChangePassowrd;