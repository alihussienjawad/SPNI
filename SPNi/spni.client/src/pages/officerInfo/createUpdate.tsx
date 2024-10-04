
import { useDispatch } from "react-redux";
import OfficerInfoform from "./officerInfofrom";
import { FormInstance, useForm } from "antd/es/form/Form";
import { useEffect } from "react";
import { OfficerInfoDto, OfficerInfoDtoSp } from "../../Interfaces/GeneralInterface";
import { AppDispatch } from "../../../app/store";
import { createUpdateAsync } from "../../../app/reducers/craudSlice";
import { setModal } from "../../../app/reducers/modalSlice";
 

export interface IForm {
    form: FormInstance,
    onFinish: (values: OfficerInfoDto) => void,
    record: OfficerInfoDtoSp
}


function CreateUpdate(record: OfficerInfoDtoSp) {
    const dispatch = useDispatch<AppDispatch>();
    const [Form1] = useForm<OfficerInfoDto>();


    const onFinish = async (value: OfficerInfoDto) => {

        const a = (await dispatch(createUpdateAsync({ url: '/OfficerInfoes', formdata: value }))).payload ;
         
        if (Object.keys({ a }).length > 2)
        {
            console.log(a);
        }
        else
        {
            dispatch(setModal(a))
        }
    }

        useEffect(() => {
            if (Object.keys(record.record).length === 0)
                Form1.resetFields();

            else
                Form1.setFieldsValue(record.record);


        }, [Form1, record.record]);
   
   

    return (
        <>
             < OfficerInfoform onFinish={onFinish} form={Form1} record={ record} /> 
        </>
    );


}

export default CreateUpdate;