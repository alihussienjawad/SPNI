import { useDispatch } from "react-redux"; 
import { FormInstance, useForm } from "antd/es/form/Form";
import { useEffect } from "react";
import {   TargetDto } from "../../Interfaces/GeneralInterface";
import { AppDispatch } from "../../../app/store";
import { createUpdateAsync } from "../../../app/reducers/craudSlice";
import { setModal } from "../../../app/reducers/modalSlice";
import Targetform from "./Targetfrom";
 
 

export interface IForm {
    form: FormInstance,
    onFinish: (values: TargetDto) => void,
    record: TargetDto
}


function CreateUpdate(record: TargetDto) {
    const dispatch = useDispatch<AppDispatch>();
    const [Form1] = useForm<TargetDto>();
 



 
    const onFinish = async (record: TargetDto) => {
   
             const a = (await dispatch(createUpdateAsync({ url: '/Targets', formdata: record }))).payload;
   
      
       

       
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
            if (Object.keys(record).length === 0)
                Form1.resetFields();
            else
                Form1.setFieldsValue(record);
            
     
        }, [Form1, record]);
   
   

    return (
        <>
             < Targetform onFinish={onFinish} form={Form1} record={ record} /> 
        </>
    );


}

export default CreateUpdate;