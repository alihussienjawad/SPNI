 
import { Alert, Col, DatePicker, Form, Input, Row, Select, Switch } from "antd";

import { IForm } from "./createUpdate";
import CustomButton from "../../compontents/customButton";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import {  SpiAttitudeDto, TargetList, YearList } from "../../Interfaces/GeneralInterface";
import axios from "../../api";
import { useCallback, useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { EditOutlined } from "@ant-design/icons";
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useTranslation } from "react-i18next";
import {  TranslateTextArea,  TranslateToARTextArea } from "../../Interfaces/functions";
 
function SpniAttitudefrom({form,onFinish,record }:IForm  ) {
    const { message } = useSelector((state: RootState) => state.craud)
    
    const [year, setyear] = useState<number>(0);
    const [mId, setMId] = useState<number>(0);
    const [iscomplet, setiscomplet] = useState<boolean>(record.record.isComplete);
    const [Tscorr, setTscorr] = useState<number>(0);
    const [subTscorr, setsubTscorr] = useState<number>(0);
    const [Tid, setTid] = useState<number>(0);
    const [years, setyears] = useState<YearList[]>();
    const [target, setTarget] = useState<TargetList[]>([]);
    const { RangePicker } = DatePicker;
    const [typeTagret, SetTypeTaget] = useState<boolean>(true);
    const [TargetSub, setTargetSub] = useState<TargetList[]>([]);

    const { t } = useTranslation();
    const {  arlang } = useSelector((state: RootState) => state.setting);

    
    const ChangeTypeTarget = (e: boolean) => {
        SetTypeTaget(e);
        setyear(0);
        setMId(0);
        setTid(0);
    }
    const GetSubTarget = useCallback((year: number, mid: number, tid: number, typeTagret: boolean, edit: boolean) => {

        axios.get(`SpiAttitudes/GetSubTarget?year=${year}&mid=${mid}&tid=${tid}&typeTagret=${typeTagret}&edit${edit}`)
            .then(res => {
                arlang ? setTargetSub(res.data)
                    : setTargetSub(res.data.map((i: TargetList) => {
                        return {
                            label: i.labelEn,
                            value: i.value
                        } as TargetList
                    }))

            })
    }, [arlang]);
    const YearChange = (e: number) => {
        setyear(e)

    }
    const ChangeManageMinistry = (e: number) => {
        setMId(e)
        form.resetFields(["targetId,resetM,resetS"])

    }
    const GetYearList =async () => {
        await axios.get(`SpiAttitudes/GetYearAllList`).then(res => setyears(res.data))
    }
    const GetTargetList = useCallback((Nyear: number, MinistaryId: number ,edit :boolean) => {
        axios.get(`SpiAttitudes/GetTargetList?MinistaryId=${MinistaryId}&Nyear=${Nyear}&edit=${edit}&typeTagret=${typeTagret}`)
            .then(res => {
                arlang ? setTarget(res.data)
                    : setTarget(res.data.map((i: TargetList) => {
                        return {
                            label: i.labelEn,
                            value: i.value
                        } as TargetList
                    }))

            })

    }, [typeTagret,arlang])

    const ChangeMaintarget = (e:number) =>
    {
        if (typeTagret)
        {
            form.setFieldValue("targetId", e)
        }
        setTid(e);
        axios.get(`SpiAttitudes/GetTargetScorr?id=${e}`)
            .then(res => setTscorr(res.data))
             

    }
    
    const ChangeSubTarget = (e: number) => {
        if (!typeTagret) {
            form.setFieldValue("targetId", e)
        }
        axios.get(`SpiAttitudes/GetTargetScorr?id=${e}`)
            .then(res => setsubTscorr(res.data))
         
    }
    useEffect(() => {
        (async () => {
            await GetYearList();
        })()
       
    }, [])
    useEffect(() => {
       if (record.record.id === 0)
       form.resetFields();
    }, [form, record.record.id, typeTagret])


    useEffect(() => {
        if (record.record.id === 0) {
            GetTargetList(year, mId, false);
            GetSubTarget(year, mId, Tid, typeTagret, false);
        }
        else {
            GetTargetList(year, mId, true);
            GetSubTarget(year, mId, Tid, typeTagret, true);
        }
       
    }, [year, mId, Tid, GetTargetList, typeTagret, record.record.id, GetSubTarget])

 


    useEffect(() => {
        if (record.record.id == 0) {
           
            form.setFieldsValue({} as SpiAttitudeDto)
            setiscomplet(false)
            setyear(new Date().getFullYear())
        }
        else {
            form.setFieldsValue(record.record)
            setiscomplet(record.record.isComplete)
            GetTargetList(record.record.year, record.record.manageMinistryId,true)
             }
    }, [GetTargetList, form, record])

   
    const onRangeChange = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
        if (dates) {
            form.setFieldValue("startDateToComplete", dateStrings[0])
            form.setFieldValue("endDateToComplete", dateStrings[1])
        } else {
            console.log('Clear');
        }
    };

    return (
        <>

            <Form form={form} initialValues={record.record} name="trigger" onFinish={onFinish}      layout="vertical">
                <Row className="m-1">

                    {message.length > 0 ?
                        <Col span={24}>

                            {record.record.id > 0 ? <Alert type="info" message={message} /> : <Alert type="success" message={message} />}

                        </Col> : null
                    }
                </Row>
                <Row className="m-1">
                    {record.record.id === 0 ? <Col span={24}>
                        <Form.Item
                            hasFeedback
                            label={`${t("targettype")}`} 
                          
                            validateTrigger="onBlur"
                            valuePropName="checked"

                        >
                            <Switch defaultChecked checkedChildren={`${t("main-goal")}`} unCheckedChildren={`${t("sub-goal")}`} onChange={ChangeTypeTarget} />
                        </Form.Item>



                    </Col>:null}
                    <Col span={24}>
                        <Alert type="info" message={`${t("messegeinfo")}`} />
                        {record.record.endNotComplete ? <Alert type="error" className="mt-2" message="انتهت مهلة تحقيق الهدف دون ان يتم انجازه " /> : null }
                    </Col>
                </Row>
                <Row className="d-flex justify-content-between">
                    <Col span={9}>
                        <Row>
                            <Col span={24}>
                                <Form.Item
                                    hidden
                                    hasFeedback
                                    label={`${t("order")}`}
                                    name="id"

                                >
                                    <Input />
                                </Form.Item>


     
                                <Col span={24}>
                                    <Form.Item
                                        hasFeedback
                                        label={`${t("year")}`}
                                        name="year"
                                        validateTrigger="onBlur"

                                    >
                                        <Select options={years} onChange={YearChange} menuItemSelectedIcon={<EditOutlined />} />

                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item
                                        hasFeedback
                                        label={`${t("modpresentative")}`}
                                        name="manageMinistryId"
                                        validateTrigger="onBlur"
                                    >
                                        <Select options={record.manageministrys} onChange={ChangeManageMinistry} />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item
                                        hidden  
                                        name="targetId"
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        hasFeedback
                                        label={`${t("main-goal")}`}
                                        name="resetM"
                                        validateTrigger="onBlur"
                                        help={<p>  {`${t("targetscore")}`} {Tscorr}</p>} 
                                    >
                                        <Select options={target} onChange={ChangeMaintarget} />
                                    </Form.Item>
                          
                                </Col>
                                <Col span={24} hidden={typeTagret}>
                                    <Form.Item
                                        hasFeedback
                                        label={`${t("sub-goal")}`}
                                        name="resetS"
                                        validateTrigger="onBlur"
                                        help={<p> {`${t("targetscore")}`} {subTscorr}</p>} 
                                    >
                                        <Select options={TargetSub} onChange={ChangeSubTarget} />
                                    </Form.Item>


                                </Col> 
                            </Col>

                           
                            <Col span={24}>
                                <Form.Item
                                    hasFeedback
                                    label={`${t("nmpresentative")}`}
                                    name="officerInfoId"
                                    validateTrigger="onBlur"
                                >
                                    <Select options={record.officers} />
                                </Form.Item>

                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    hasFeedback
                                    label={`${t("rateComplete")}`} 
                                    name="rateComplete"
                                    validateTrigger="onBlur"
                                >
                                    <Input type="number" maxLength={2} min={0} />
                                </Form.Item>

                            </Col>
                            <Col span={24} className="mb-2">
                                <p> {`${t("timings")}`}</p>
                                <div dir="ltr" className="d-flex justify-content-between  ">
                                    <RangePicker defaultValue={[dayjs(record.record.startDateToComplete), dayjs(record.record.endDateToComplete)]} placeholder={['تاريخ المباشرة', 'تاريخ الانتهاء']} onChange={onRangeChange}
                                    />
                                </div>



                                <Form.Item
                                    name="startDateToComplete"
                                    validateTrigger="onBlur"
                                    hidden
                                >
                                    <Input type="date" />
                                </Form.Item>
                                <Form.Item
                                  
                                    name="endDateToComplete"
                                    validateTrigger="onBlur"
                                    hidden
                                >
                                    <Input type="date" />
                                </Form.Item>
                                </Col>

                            <Col span={24} className="mt-5 ">
                                <Form.Item
                                    name="isComplete"
                                    initialValue={iscomplet}
                                    valuePropName="checked"
                                >
                                    <Switch checkedChildren={`${t("compelete")}`} unCheckedChildren={`${t("uncompelete")}`} />
                                </Form.Item>

                            </Col>
                        </Row>
                    </Col>
                    <Col span={14}>
                         <Row className="d-flex justify-content-between">
                       
                            <Col span={12}>

                                <Form.Item
                                    hasFeedback
                                    label="المتابعة"
                                    name="follow"
                                    validateTrigger="onBlur"

                                >
                                    <TextArea style={{ resize: 'none' }} rows={5} onChange={e=>TranslateTextArea(e,form)} />
                                </Form.Item>
                            </Col>
                             
                            <Col span={11}>

                                <Form.Item
                                    hasFeedback
                                    label="Follow-Up"
                                    name="followEn"
                                    validateTrigger="onBlur"

                                >
                                    <TextArea style={{ resize: 'none' }} rows={5} onChange={e=>TranslateToARTextArea(e,form)} />
                                </Form.Item>
                            </Col> 
                        </Row>
                        <Row className="d-flex justify-content-between">
                              <Col span={12}>

                                <Form.Item
                                    hasFeedback
                                    label="الاجراءات المتخذة"
                                    name="actionTaken"
                                    validateTrigger="onBlur"

                                >
                                    <TextArea style={{ resize: 'none' }} rows={5} onChange={e=>TranslateTextArea(e,form)} />
                                </Form.Item>


                            </Col>

                                  <Col span={11}>

                                    <Form.Item
                                        hasFeedback
                                        label="Actions taken"
                                        name="actionTakenEn"
                                        validateTrigger="onBlur"

                                    >
                                    <TextArea style={{ resize: 'none' }} rows={5} onChange={e => TranslateToARTextArea(e,form)} />
                                    </Form.Item>


                                </Col> 
                        </Row>
                        <Row className="d-flex justify-content-between">
                            <Col span={12}>

                                <Form.Item
                                    hasFeedback
                                    label=" المقترحات"
                                    name="suggistion"
                                    validateTrigger="onBlur"

                                >
                                    <TextArea style={{ resize: 'none' }} rows={5} onChange={e => TranslateTextArea(e,form)} />
                                </Form.Item>


                            </Col>  
                                <Col span={11}>

                                    <Form.Item
                                        hasFeedback
                                        label="Suggistions"
                                        name="suggistionEn"
                                        validateTrigger="onBlur"

                                    >
                                    <TextArea style={{ resize: 'none' }} rows={5} onChange={e => TranslateToARTextArea(e,form)} />
                                    </Form.Item>


                                </Col> 
                        </Row>
                        <Row className="d-flex justify-content-between">
                         <Col span={12}>

                                <Form.Item
                                    hasFeedback
                                    label="القرار"
                                    name="resolution"
                                    validateTrigger="onBlur"

                                >
                                    <TextArea style={{ resize: 'none' }} rows={5} onChange={e => TranslateTextArea(e,form)} />
                                </Form.Item>


                            </Col> :
                                <Col span={11}>

                                    <Form.Item
                                        hasFeedback
                                        label="Decision"
                                        name="resolutionEn"
                                        validateTrigger="onBlur"

                                    >
                                    <TextArea style={{ resize: 'none' }} rows={5} onChange={e => TranslateToARTextArea(e,form)} />
                                    </Form.Item>


                                </Col>


                        </Row>
                       
                           

                        
                     
                    </Col>

                </Row>

                <Row>

                    <Col span={24} className="text-center">
                        <CustomButton flag={1} />

                    </Col>
                </Row>
                   
            </Form>

        </>
    )


}

export default SpniAttitudefrom;