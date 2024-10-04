 
 
import { useDispatch } from "react-redux";
 

import { useEffect, useState } from "react";
 
import {   AddUser , Role } from "../../Interfaces/GeneralInterface";
import { AppDispatch } from "../../../app/store";
 
import { createUpdateAsync } from "../../../app/reducers/craudSlice";
import { setModal } from "../../../app/reducers/modalSlice";
import UsersForm from "./usersfrom";
import axios from "../../api";
import { FormInstance } from "antd";
import useForm from "antd/es/form/hooks/useForm";
 
 

export interface IForm {
    form: FormInstance,
    onFinish: (values: AddUser) => void,
    record: AddUser
}


function CreateUpdate( record : AddUser) {
    const dispatch = useDispatch<AppDispatch>();
    const [form] = useForm<AddUser>();
    const [Roles, SetRole] = useState<Role[]>([] as Role[]);
    const [newRecord, SetNewRecord] = useState<AddUser>(record);

  
    useEffect(() => {
        axios.get(`/Account/GetAllRole?userid=${record.id}`)
            .then(res => SetRole(res.data))
      
    }, [record])

   
    useEffect(() => {
        SetNewRecord({ ...record, roleWithUserDto: Roles });

    }, [record, Roles])


    const onFinish = async (values: AddUser) => {
    
   

        const a = (await dispatch(createUpdateAsync({ url: '/Account', formdata: values }))).payload;
        
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

            form.resetFields();
        }
        else {
            form.setFieldsValue(record);
        }
    }, [form, record]);


   
   

    return (
        
        <UsersForm onFinish={onFinish} form={form} record={newRecord} /> 
         
    );


}

export default CreateUpdate;