 
 
import { useDispatch } from "react-redux";
 
import { FormInstance, useForm } from "antd/es/form/Form";
import { useEffect } from "react";
 
import { AppDispatch } from "../../../app/store";
 
import { createUpdateAsync } from "../../../app/reducers/craudSlice";
import { setModal } from "../../../app/reducers/modalSlice";
 
import SubManageMinistryfrom from "./SubManageMinistryfrom";
import { SubMangeMinistrysDto, SubMangeMinistryDtoSp } from "../../Interfaces/GeneralInterface";
 
 

export interface IForm {
    form: FormInstance,
    onFinish: (values: SubMangeMinistrysDto) => void,
    record: SubMangeMinistryDtoSp
}


function CreateUpdate(record: SubMangeMinistryDtoSp) {
    const dispatch = useDispatch<AppDispatch>();
    const [Form1] = useForm<SubMangeMinistrysDto>();


    const onFinish = async (value: SubMangeMinistrysDto) => {

        const a = (await dispatch(createUpdateAsync({ url: '/SubMangeMinistries', formdata: value }))).payload ;

       
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
                Form1.setFieldsValue(record.record);
     
        }, [Form1, record, record.record]);
   
   

    return (
        <>
            <SubManageMinistryfrom onFinish={onFinish} form={Form1} record={ record} /> 
        </>
    );


}

export default CreateUpdate;