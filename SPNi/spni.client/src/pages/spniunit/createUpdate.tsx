 
 
import { useDispatch } from "react-redux";
 
import { FormInstance, useForm } from "antd/es/form/Form";
import { useEffect } from "react";
 
import { AppDispatch } from "../../../app/store";
 
import { createUpdateAsync } from "../../../app/reducers/craudSlice";
import { setModal } from "../../../app/reducers/modalSlice";
 
 
import SpniUnitfrom from "./SpniUnitfrom";
import { SpiUnitDTO  } from "../../Interfaces/GeneralInterface";
 

export interface IForm {
    form: FormInstance,
    onFinish: (values: SpiUnitDTO) => void,
    record: SpiUnitDTO
}


function CreateUpdate(record: SpiUnitDTO) {
    const dispatch = useDispatch<AppDispatch>();
    const [Form1] = useForm<SpiUnitDTO>();


    const onFinish = async (value: SpiUnitDTO) => {
        const a = (await dispatch(createUpdateAsync({ url:'/SpiUnits', formdata: value }))).payload ;

       
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
            <SpniUnitfrom onFinish={onFinish} form={Form1} record={record} /> 
        </>
    );


}

export default CreateUpdate;