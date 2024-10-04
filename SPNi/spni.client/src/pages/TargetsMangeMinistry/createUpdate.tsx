 
 
import { useDispatch } from "react-redux";
 
import { FormInstance, useForm } from "antd/es/form/Form";
import { useEffect } from "react";
 
import { AppDispatch } from "../../../app/store";
 
import { createUpdateAsync } from "../../../app/reducers/craudSlice";
import { setModal } from "../../../app/reducers/modalSlice";
 

import TargetsMangeMinistryfrom from "./TargetsMangeMinistryfrom";
import {   TargetsMangeMinistryDto  } from "../../Interfaces/GeneralInterface";
 

export interface IForm {
    form: FormInstance,
    onFinish: (values: TargetsMangeMinistryDto) => void,
    record: TargetsMangeMinistryDto
}


function CreateUpdate(record: TargetsMangeMinistryDto) {
    const dispatch = useDispatch<AppDispatch>();
    const [Form1] = useForm<TargetsMangeMinistryDto>();

    
    const onFinish = async (value: TargetsMangeMinistryDto) => {
        const a = (await dispatch(createUpdateAsync({ url:'/TargetsMangeMinistry', formdata: value }))).payload ;

       
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
        
           
            
       
            if (Object.keys(record).length === 0) {
                
                Form1.resetFields();
            }
            else{ 
                Form1.setFieldsValue(record);
             }
        }, [Form1, record]);
   
 
    return (
        <>
            <TargetsMangeMinistryfrom onFinish={onFinish} form={Form1} record={record} /> 
        </>
    );


}

export default CreateUpdate;