 
 
import { useDispatch } from "react-redux";
 
import { FormInstance, useForm } from "antd/es/form/Form";
import { useEffect } from "react";
 
import {   SpiAttitudeDto, SpiAttitudeDtoSp } from "../../Interfaces/GeneralInterface";
import { AppDispatch } from "../../../app/store";
 
import { createUpdateAsync } from "../../../app/reducers/craudSlice";
import { setModal } from "../../../app/reducers/modalSlice";
import SpniAttitudefrom from "./spniAttitudefrom";
 

export interface IForm {
    form: FormInstance,
    onFinish: (values: SpiAttitudeDto) => void,
    record: SpiAttitudeDtoSp
}


function CreateUpdate(record: SpiAttitudeDtoSp) {
    const dispatch = useDispatch<AppDispatch>();
    const [Form1] = useForm<SpiAttitudeDto>();
 

    const onFinish = async (value: SpiAttitudeDto) => {

        const a = (await dispatch(createUpdateAsync({ url: '/SpiAttitudes', formdata: value }))).payload ;
         
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
        if (Object.keys(record.record).length === 0){
       
        Form1.resetFields();
    }
            else { 
           
                Form1.setFieldsValue(record.record);
}
        }, [Form1, record.record]);
   
   

    return (
        <>
             <SpniAttitudefrom onFinish={onFinish} form={Form1} record={ record} /> 
        </>
    );


}

export default CreateUpdate;