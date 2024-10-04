﻿import { Alert, Col, Input, Popconfirm, Space } from "antd"
 
 
 

import { NewsDto } from "../../Interfaces/GeneralInterface";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
 
import CustomButton from "../../compontents/customButton";
import { DeleteAsync } from "../../../app/reducers/craudSlice";
import { setModal } from "../../../app/reducers/modalSlice";
 
 



const Delete = (record: NewsDto) => {
   
    const dispatch = useDispatch<AppDispatch>();
    const { message } = useSelector((state: RootState) => state.craud)


    const delete1 = async () => {
        
        const a = ( await dispatch(DeleteAsync({ url: '/News', formdata: record }))).payload
        if (Object.keys({ a }).length > 2) {
            console.log(a);
        }
        else {
            dispatch(setModal(a))
        }
    }
   




    return (
        <>
            <h6>
                {message && <Alert type="error" message={message}/> }
                <Space size="middle">
                    <span> التفاصيل:</span>
                    <span>{record.details}</span>
                </Space>
            </h6>

            <form>
                <Input hidden id="id" value={record.id} />
                <Popconfirm
                    title="حذف"
                    description="هل انت متأكد من حذف هذا السجل؟"
                    onConfirm={delete1}
                    
                        
                    okText="نعم"
                    cancelText="كلا"
                >

                    <Col span={24} className="text-center mt-3">
                        <CustomButton flag={3} />
                    </Col>

                </Popconfirm>


            </form>
        </>
    )
};
export default Delete