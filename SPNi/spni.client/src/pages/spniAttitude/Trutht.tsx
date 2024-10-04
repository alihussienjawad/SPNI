import { Alert, Button, Col, Form, Input, Row, Switch, message } from "antd"
import { useEffect, useState } from "react";
import { SpiAttitudeDto, SpiAttitudeDtoSp } from "../../Interfaces/GeneralInterface";
import { useForm } from "antd/es/form/Form";
 
import axios from "../../api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { CloseModal } from "../../../app/reducers/modalSlice";
 

function Trutht(Model: SpiAttitudeDtoSp) {

    const [Form1] = useForm<SpiAttitudeDto>();
    const [loading, setLoading] = useState(false);
    const [ch, setCh] = useState<boolean>(Model.record.isTrue);

    const dispatch = useDispatch<AppDispatch>();


    const ChChange = (e: any) => {
        setCh(e);

    }
 

    useEffect(() => {
        Form1.setFieldsValue(Model.record)
        setCh(Model.record.isTrue)
    }, [Form1, Model.record])
    const onFinish = async (value: SpiAttitudeDto) => {
        
        setLoading(true)
         
        await axios.post(`/SpiAttitudes/Truth?Id=${value.id}&IsTrue=${ch}`)
            .then(res => {
                 
                if (res.status === 200) {
                    if (value.isTrue)
                        message.success('تم المصادقة ');
                    else
                        message.success('تم الغاء المصادقة');
                    dispatch(CloseModal(false))
                    Form1.resetFields();
                }
                else {
                    message.error('error');
                    Form1.resetFields();
                }

            })
            .catch((error: any) => console.log(error))
            .finally(() => {
                setLoading(false)

            })


    };
    const content = <Form form={Form1} initialValues={Model.record} name="trigger" onFinish={onFinish}   autoComplete="off" layout="vertical">

        <Row className="m-1">
            <Col span={24}>
                {
                    !Model.record.isTrue ?
                        <Alert type="warning" message="يرجى التأكد انه سيتم مصاقة هذا القلم ولا يمكن تعديله بدون الغاء المصادقة" />
                        : <Alert type="error" message="سيتم الغاء مصادقة هذا القلم" />
                }
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Form.Item
                    hidden
                    hasFeedback
                    name="id"
                >
                    <Input />
                </Form.Item>

            </Col>
            <Col span={24}>
                <Form.Item
                    hasFeedback
                    label="السنة"
                    name="year"

                >
                    <p>{Model.record.year} </p>
                </Form.Item>
            </Col>

            <Col span={24}>
                <Form.Item
                    hasFeedback
                    label="الهدف"
                    name="targetId"
                    validateTrigger="onBlur"
                >
                    <p>{Model.record.targetName} </p>
                </Form.Item>
            </Col>

            <Col span={24}>
                <Form.Item
                    hasFeedback
                    label="مسؤول البعثة"
                    name="officerInfoId"
                    validateTrigger="onBlur"
                >
                    <p>{Model.record.officerInfoId} </p>
                </Form.Item>

            </Col>
            <Col span={24}>
                <Form.Item
                    hasFeedback
                    label="مسؤولية الوزارة"
                    name="manageMinistryId"
                    validateTrigger="onBlur"
                >
                    <p>{Model.record.manageMinistryId} </p>
                </Form.Item>

            </Col>

            <Col span={24}>

                <Form.Item
                    hasFeedback
                    label="المتابعة"
                    name="follow"
                    validateTrigger="onBlur"
                >
                    <p>{Model.record.follow} </p>
                </Form.Item>
            </Col>


            <Col span={24}>

                <Form.Item
                    hasFeedback
                    label="الاجراء المتخذ"
                    name="actionTaken"
                    validateTrigger="onBlur"
                >
                    <p>{Model.record.actionTaken} </p>
                </Form.Item>


            </Col>
            <Col span={24}>

                <Form.Item
                    hasFeedback
                    label="المقترحات"
                    name="suggistion"
                    validateTrigger="onBlur"
                >
                    <p>{Model.record.suggistion} </p>
                </Form.Item>


            </Col>
            <Col span={24}>

                <Form.Item
                    hasFeedback
                    label="القرار"
                    name="resolution"
                    validateTrigger="onBlur"
                >
                    <p>{Model.record.resolution} </p>
                </Form.Item>


            </Col>

            <Col span={24}>
                <Form.Item
                    hasFeedback
                    label="مصادقة / الغاء المصادقة"
                    name="isTrue"
                    validateTrigger="onBlur"
                    valuePropName="checked"
                >
                    <Switch onChange={ChChange} checkedChildren="مصادقة" unCheckedChildren="الغاء المصادقة"  checked/>


                </Form.Item>

            </Col>


            {ch ?
                <Col span={24} className="text-center">
                    {
                        ch != Model.record.isTrue ?
                            <Button htmlType="submit" loading={loading} className="btn btn-md btn-success w-50">مصادقة</Button>
                            : <Button htmlType="submit" loading={loading} className="btn btn-md btn-success w-50" disabled>مصادقة</Button>
                    }
                </Col>
                : 
                <Col span={24} className="text-center">
                    {
                        ch != Model.record.isTrue ?
                            <Button htmlType="submit" loading={loading} className="btn btn-md btn-danger w-50">الغاء المصادقة</Button>
                            : <Button htmlType="submit" loading={loading} className="btn btn-md btn-danger w-50" disabled>الغاء المصادقة</Button>
                    }
                </Col>
            }
        </Row>
    </Form>


    return (
        <>
            {content}
        </>
    );
}

export default Trutht;