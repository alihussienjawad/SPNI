 
import { Alert, Checkbox, Col, Form, Input,Row, Select, Switch } from "antd";

import { IForm } from "./createUpdate";
 
import {  useSelector } from "react-redux";
import {  RootState } from "../../../app/store";
import { ChangeEvent, useEffect, useState } from "react";
import {  TargetList, TargetScorrDto, YearList } from "../../Interfaces/GeneralInterface";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
 
import { CheckboxChangeEvent } from "antd/es/checkbox";
import axios from "../../api";
import CustomButton from "../../compontents/customButton";
 
import { validateTargetScorr } from "../validate";
import { useTranslation } from "react-i18next";
import { Translate, TranslateToAR } from "../../Interfaces/functions";

  
function Targetform({form,onFinish,record }:IForm  ) {
    const { message } = useSelector((state: RootState) => state.craud)
    const [ch, setCh] = useState<boolean>(false);
  
    const [typeTagret, SetTypeTaget] = useState<boolean>(true);
    const [TargetMain, setTargetMain] = useState<TargetList[]>( );
    const [TargetScorr, setTargetScorr] = useState<TargetScorrDto>({} as TargetScorrDto );
    const [Moshtrak, setMoshtrak] = useState<boolean>(false);
    const [years, setyears] = useState<YearList[]>();
    

    const { t } = useTranslation();




    
        
   
    const ChChange = (e: CheckboxChangeEvent) => {
        setCh(e.target.checked)

    }

    const MoshtrakChange = (e: CheckboxChangeEvent) => {
        setMoshtrak(e.target.checked)

    }

    const GetYearList = () => {

        axios.get(`SpiAttitudes/GetYearAllList`).then(res => setyears(res.data))

    }
    const GetTargetMain = () => {
  
        axios.get(`Targets/GetTargetMain` ).then(res => setTargetMain(res.data))

    }

   

    const ChangeTypeTarget = (e: boolean) => {
        SetTypeTaget(e);
    }

    const ComputeScorr = (e: ChangeEvent<HTMLInputElement>) => {

        const pId = form.getFieldValue("perentTargetId");
        const year = form.getFieldValue("year");
        const mainTarget = form.getFieldValue("mainTarget");
        if (!mainTarget) {
            axios.get(`Targets/GetTargetscorr?year=${year}&perentTargetId=${pId}&scorr=${e.target.value} `)
                .then(res => {
                    console.log(res.data)
                    setTargetScorr(res.data)
                })
        }
       

       
        
    }

    useEffect(() => {
        GetYearList();
        GetTargetMain();
    }, [])
  
    useEffect(() => {
        if (record.id==0) {
            form.resetFields()
            setMoshtrak(false);
            setCh(false);
            SetTypeTaget(record.mainTarget);
                     }
    else {

            form.setFieldsValue(record)
            setCh(record.active)
            setMoshtrak(record.moshtrak)
            SetTypeTaget(record.mainTarget);
                 
             }
    }, [form, record])


 
 
    return (
        <>

            <Form form={form} name="trigger" onFinish={onFinish} autoComplete="off" layout="vertical">

                <Row className="m-1">

                    {message.length > 0 ?
                        <Col span={24}>

                            {record.id > 0 ? <Alert type="info" message={message} /> : <Alert type="success" message={message} />}

                        </Col> : null
                    }
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            hasFeedback
                            label={t("targettype")}
                            name="mainTarget"
                            validateTrigger="onBlur"
                            valuePropName="checked"
                        >
                            <Switch checkedChildren={t("main-goal")} unCheckedChildren={t("sub-goal")} onChange={ChangeTypeTarget} />
                        </Form.Item>



                    </Col>
                   
                    <Col span={24} hidden={typeTagret}>
                        <Form.Item
                            hasFeedback
                            label={t("main-goal")}
                            name="perentTargetId"
                            validateTrigger="onBlur"
                       
                        >
                            <Select  options={TargetMain} />
                        </Form.Item>

                        
                    </Col> 
                    <Col span={24} hidden={!typeTagret}>
                        <Form.Item
                            hasFeedback
                            label={t("year")}
                            name="year"
                            validateTrigger="onBlur"
                        >
                            <Select options={years} />
                        </Form.Item>

                       
                    </Col>
                    <Col span={24}>
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
                            label="اسم الهدف"
                            name="name"
                             
                            validateTrigger="onBlur"
                            rules={[
                               
                                { validator:  validateTargetScorr }
                            ]}
                        >
                            <Input placeholder="اسم الهدف" onChange={e=>Translate(e,form)} />
                        </Form.Item>
                        <Form.Item
                            hasFeedback
                            label="Target Name"
                            name="nameEn"

                            validateTrigger="onBlur"
                            rules={[

                                { validator: validateTargetScorr }
                            ]}
                        >
                            <Input placeholder="TargetName" onChange={e=>TranslateToAR(e,form)} />
                        </Form.Item>
                        {!typeTagret ? <p>  {t("residual")} : <span className="text-danger">{(TargetScorr.mainTargetScorr - TargetScorr.sumSubTargetScorr).toString() === "NaN" ? "" : TargetScorr.mainTargetScorr - TargetScorr.sumSubTargetScorr }</span></p> :null}
                        
                        <Form.Item
                            hasFeedback
                            label={t("targetScorr")}
                            name="targetScorr"
                            validateTrigger="onBlur"
                           
                        >
                            <Input type="number" min={0} max={TargetScorr.mainTargetScorr - TargetScorr.sumSubTargetScorr} placeholder="الوزن" onChange={e=>ComputeScorr(e)} />
                        </Form.Item>
                      
                    </Col>


                    <Col span={24}>

                        <Form.Item
                            hasFeedback
                            label={t("sort")}
                            name="sort"
                            validateTrigger="onBlur"
                            rules={[
                                {
                                    required: true,
                                    message: 'الاسبقية مطلوبة!',
                                },
                                {

                                    pattern: new RegExp(/^\d{1,10}$/),
                                    message: 'يجب ان يحتوي الاسبقية على ارقام فقط!',
                                },
                            ]}   
                        >
                            <Input placeholder="ألاسبقية" />
                        </Form.Item>
                    </Col>


                    <Col span={24}>

                        <Form.Item
                            hasFeedback
                            label={t("status")}
                            name="active"
                            valuePropName="checked"
                            validateTrigger="onBlur"
                        >
                            <Checkbox onChange={ChChange}>
                                {ch ? <p> <CheckOutlined style={{ fontSize: '22px', color: 'green' }} /> {t("active")} </p> : <p>  <CloseOutlined style={{ fontSize: '22px', color: 'red' }} />{t("unactive")} </p>}
                            </Checkbox>

                        </Form.Item>
                    </Col>
                    <Col span={24}>

                        <Form.Item
                            hasFeedback
                            label={t("moshtrak")}
                            name="moshtrak"
                            valuePropName="checked"
                            validateTrigger="onBlur"
                        >
                            <Checkbox onChange={MoshtrakChange} >
                                {Moshtrak ? <p> <CheckOutlined style={{ fontSize: '22px', color: 'green' }} /> {t("moshtrak")} </p> : <p>  <CloseOutlined style={{ fontSize: '22px', color: 'red' }} />{t("unmoshtrak")} </p>}
                            </Checkbox>

                        </Form.Item>
                    </Col>
                    <Col span={24} className="text-center">
                         
                            
                        <CustomButton flag={1} />
                           
                         
                    </Col>

                </Row>
            </Form>

        </>
    )


}

export default Targetform;