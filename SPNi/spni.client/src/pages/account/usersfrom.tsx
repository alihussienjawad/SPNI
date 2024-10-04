/* eslint-disable @typescript-eslint/no-unused-vars */

import { Alert, AutoComplete , Col, Form, Input, InputNumber, Row, Select,  Switch, } from "antd";
import { IForm } from "./createUpdate";

import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
 

import { useEffect, useState } from "react";
import CustomButton from "../../compontents/customButton";
import axios from "../../api";
import { AddUser, ManageMinistryList, SpiUnitAutoComplete } from "../../Interfaces/GeneralInterface";
import { validateArabicName, validateArabicPosition } from "../validate";
 
 
 
 





 
function Usersform({ form, onFinish, record }: IForm) {
    const { message } = useSelector((state: RootState) => state.craud)
    const [mangeministry, setMangeMinistry] = useState<ManageMinistryList[]>([]);
    const [Ranks, setRanks] = useState();
    const [getval, setgetval] = useState<number>();
 
    const [Unit, setUnit] = useState<SpiUnitAutoComplete[]>([]);

    const GetSpiAutoComplete = () => {
        axios.get('Account/GetSpiAutoComplete').then(res => setUnit(res.data))
    }

      const GetManageMinistryList = () => {
        axios.get('account/GetManageMinistryList').then(res => setMangeMinistry(res.data))
    }
     
     
    useEffect(() => {
        GetSpiAutoComplete();
        GetAllRak();
        GetManageMinistryList();
    }, []);
    const GetAllRak = () => {
        axios.get(`/Account/GetAllRanks`)
            .then(res => setRanks(res.data))

    } 

  
    useEffect(() => {
      
        if (record.id <= (0).toString())
        { 
            form.resetFields();
        
            form.setFieldsValue({ ur_no: getval } as AddUser)
         
      }
        else
            form.setFieldsValue(record)
    }, [form, record,getval]);


    return (
        <>

            <Form form={form}   initialValues={record} onFinish={onFinish} autoComplete="off" layout="vertical">

                <Row className="m-1">

                    {message.length > 0 ?
                        <Col span={24}>

                            {record.id.length > 0 ? <Alert type="info" message={message} /> : <Alert type="success" message={message} />}

                        </Col> : null
                    }

                </Row>
                <Row gutter={16} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Col span={12}>
                        <h5 className="w-100 text-center">بيانات المستخدم</h5>
                        
                            <Form.Item
                                hidden
                                hasFeedback
                                label="ت"
                                name="id"

                            >
                                <Input />
                        </Form.Item>
                        <Form.Item
                            hasFeedback
                            label="رقم الوحدة"
                            name="ur_no"
                            hidden
                            validateTrigger="onBlur"

                        >
                            <Input placeholder="رقم الوحدة" />
                     
                     
                        
                        </Form.Item>

                        <Form.Item
                            hasFeedback
                       

                            validateTrigger="onBlur"

                        >
                        {record.ur_no > 0 ? null :
                            <Col span={24}>
                                <label className="pb-2 ">اسم الوحدة </label>
                                <AutoComplete
                                    allowClear={true}
                                    onSelect={(_, option) => setgetval(option.key)}
                                    style={{ width: 400 }}
                                    options={Unit}
                                    placeholder="بحث  اسم الوحدة"
                                    filterOption={(inputValue, option) =>
                                        option!.value.toString().indexOf(inputValue) !== -1
                                    }
                                />

                            </Col>}
                    </Form.Item>

                        <Form.Item
                            hasFeedback
                        label="الرقم الاحصائي"
                         name="personNo"
                         validateTrigger="onBlur"
                            rules={[
                                {
                                    required: true,
                                    message: 'الرقم الاحصائي مطلوب!',
                                },
                                {
                                
                                    pattern: new RegExp(/^\d{8,10}$/),
                                    message: 'يجب ان يحتوي الرقم الاحصائي  على ارقام فقط!',
                                },
                            ]}
                        >
                            <InputNumber className="w-100" placeholder="الرقم الاحصائي مطلوب" />
                        </Form.Item>



                        <Form.Item
                            hasFeedback
                            label="الرتبة"
                            name="rankId"
                            validateTrigger="onBlur">
                            <Select options={Ranks} placeholder="الرتبة"></Select>
                        </Form.Item>




                        <Form.Item
                            hasFeedback
                            label="الاسم الكامل"
                            name="personName"
                            
                            validateTrigger="onBlur"
                            rules={[
                                
                                { validator: validateArabicName }
                            ]} >
                            <Input placeholder="الاسم الكامل" />
                        </Form.Item>
                    
                        {record.ur_no > 0 ?
                            <Form.Item
                                hasFeedback
                                label="اسم الوحدة السابقة"
                                name="unitName"

                                validateTrigger="onBlur"

                            >
                                <Input readOnly placeholder="اسم الوحدةالسابقة" />
                            </Form.Item> : null}
                       
                        <Form.Item
                            hasFeedback
                            label="المنصب"
                            name="personPosition"
                           
                            validateTrigger="onBlur"
                            rules={[
                              
                                { validator: validateArabicPosition }
                            ]}


                             
                        >

                            <Input placeholder="المنصب مطلوب" />
                        </Form.Item>
                        <Form.Item
                            hasFeedback
                            label="رقم الهاتف"
                            name="cisco"
                            validateTrigger="onBlur"
                            rules={[
                                {
                                    required: true,
                                    message: 'رقم الهاتف مطلوب!',
                                },
                                {

                                    pattern: new RegExp(/^\d{5,10}$/),
                                    message: 'يجب ان يحتوي رقم الهاتف  على ارقام فقط!',
                                },
                            ]}>
                           
                            <InputNumber className="w-100" placeholder="*********07" />
                        </Form.Item>
                        <Form.Item
                            hasFeedback
                            label="الايميل"
                            name="email"
                            validateTrigger="onBlur"
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

                            <Input placeholder="الايميل" />
                        </Form.Item>
                        <Col span={12}>
              
                            <Form.Item
                                hasFeedback
                                label="مراقبة الموارد"
                                name="hrTest"
                                validateTrigger="onBlur"
                               

                            >
                                <Switch checkedChildren="فعال" unCheckedChildren="غير فعال"/>
                            </Form.Item>

                        </Col>

                        
                        <Col span={24}>
                            <Form.Item
                                hasFeedback
                                label="ممثلي الوزارة"
                                name="unitUser"
                                validateTrigger="onBlur"
                               
                            >
                                <Select defaultValue={record.unitUser} mode="multiple" style={{ width: '100%' }} options={mangeministry}  />
                            </Form.Item>


                        </Col>
                        <Form.Item>

                            <CustomButton flag={1} />

 
                        </Form.Item>
                    </Col>

                    <Col span={10} style={{ height: '80vh', width: '100%', overflowY: 'auto' }} className="role-col">
                        <h5 className="w-100 text-center title" style={{ position: 'sticky', top: '0', zIndex: '2' }} >صلاحيات المستخدم</h5>

                        <Form.List
                            name="roleWithUserDto"
                            
                        >
                            {(fields) => (
                                <>
                                    {fields.map((field) => (

                                        <div
                                            key={field.name}
                                            className="p-2"
                                           
                                        >
                                            <Form.Item    hidden name={[field.name, 'roleName']} noStyle> <Input  /> </Form.Item>
                                            <Form.Item     hidden name={[field.name, 'roleName']} noStyle> <Input /></Form.Item>
                                            <Form.Item     hidden name={[field.name, 'roleNameAR']} noStyle> <Input /></Form.Item>

                                            <Form.Item
                                                validateTrigger="onBlur"
                                                hasFeedback
                                                name={[field.name, 'isSelected']}

                                            >
                                                <Switch className="w-100" checkedChildren={record.roleWithUserDto[field.name].roleNameAR} unCheckedChildren={record.roleWithUserDto[field.name].roleNameAR} />
                                            </Form.Item>


                                        </div>
                                    ))}

                                </>
                            )}
                        </Form.List>



 


                    </Col>

 


                </Row>


            </Form>
        </>
    )


}

export default Usersform;