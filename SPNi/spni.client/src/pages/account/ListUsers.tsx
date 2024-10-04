
import {  Button, Col,  Row,  Space, Table } from "antd";
import { useEffect, useState } from "react";
 
import {       AddUser, User } from "../../Interfaces/GeneralInterface";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import axios from "../../api";
import { CalendarOutlined, DeleteFilled, DeleteOutlined, EditFilled, EditOutlined, PlusOutlined,   } from "@ant-design/icons";
import { setModal } from "../../../app/reducers/modalSlice";
import { ColumnsType } from "antd/es/table";
 
import CreateUpdate from "./createUpdate";
import Delete from "./Delete";
import { SetError } from "../../../app/reducers/craudSlice";
import Details from "./Details";
import { useTranslation } from "react-i18next";
 
 
 

const intialvalue: AddUser = {
    id: "",
    roleWithUserDto: [],
    cisco:  0n ,
    email:"",
    hrTest:false,
    personName:"",
    personNo:  0n,
    personPosition:"",
    rankId:0,
    ur_no:0,
    user_state: false,
    unitUser:[]
}

 



 
 


const Users = () => {
    const [users, SetUsers] = useState<User[]>();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch<AppDispatch>()
    //for server side
    const { postState } = useSelector((state: RootState) => state.modal);

    const { t } = useTranslation();
  



    //Get data
    const GetUSERS = () => {
       
        setLoading(true);
     
        axios.get(`account/GetAllUser`)
            .then((res) => SetUsers(res.data))
          
         
        setLoading(false);
                };
 
    
    useEffect(() => {
        GetUSERS();
        
    }, [loading, postState ] );


  


    const addUsers = () => {
        dispatch(SetError())
        dispatch(setModal({
            isOpen: true, content: <CreateUpdate {...intialvalue}  />, Width: 900, title: "اضافة جديد"
        }))
    };

    const deleteUsers = (row: User) => {
        dispatch(SetError())
        dispatch(setModal({ modalIcon: <DeleteOutlined style={{ color: 'red' }} />, isOpen: true, content: <Delete  {...row} />, Width: 500, title: " حذف" })
        )
    };

    const updateUsers = (row: User) => {
            
        dispatch(SetError())
        dispatch(setModal({ modalIcon: <EditOutlined style={{ color: 'green' }} />, isOpen: true, content: <CreateUpdate   {...row} />, Width: 900, title: " تعديل" })
        )
    };
    const DetailsUsers = (row: User) => {

        dispatch(SetError())
        dispatch(setModal({ modalIcon: < CalendarOutlined style={{ color: 'green' }} />, isOpen: true, content: < Details  {...intialvalue}   {...row} />, Width:1000, title: " تفاصيل " })
        )
    };
    const columns: ColumnsType<User> = [
        {

            title: 'الاسم الكامل',
            dataIndex: 'id',
            hidden:true
        },
        {

            title: 'وحدات المستخدم',
            dataIndex: 'unitUser',
            hidden: true
        },
        {

            title: 'الاسم الكامل',
            dataIndex: 'personName',
            
        },
        {

            title: 'الرقم الاحصائي',
            dataIndex: 'personNo',
        },
        {

            title: 'الرتبة',
            dataIndex: 'rankName',
          
         
          
        },
        {

            title: 'الوحدة',
            dataIndex: 'unitName',
           
        },
        {

            title: 'حالة الحساب',
            dataIndex: 'lockoutEnabled',
            hidden:true
        },
        {

            title: 'الحساب',
            dataIndex: 'email',
           
        },
        {

            title: ' تحديث من قبل',
            dataIndex: 'updated_by',
            hidden: true
        },
        {

            title: 'انشا بتاريخ ',
            dataIndex: 'created_date',
            hidden: true
        },
        {

            title: 'انشا من قبل  ',
            dataIndex: 'created_by',
            hidden: true
        },
        {

            title: 'انشا بتاريخ  ',
            dataIndex: 'updated_date',
            hidden: true
        },
        {
       
            title: 'العمليات',
            key: 'User',
            render: (_: number, record: User) => (

                <Space size="middle">

                    <Button onClick={() => updateUsers(record)} className="btn-border-edit"><EditFilled className="edit-icon" /></Button>
                    <Button onClick={() => deleteUsers(record)} className="btn-border-delet"><DeleteFilled className="delete-icon" /></Button>
                    <Button onClick={() => DetailsUsers(record)} className="btn-border-detail w-75"> <CalendarOutlined className="detail-icon" /> </Button>
                </Space>
            )
        },
    ];

  
 


    return (
       
                <>
            <Row className="sticky-top box-sh">
                <Space className="w-100" size='middle'
                    style={{ display: 'felx', justifyContent: 'space-between' }}  >
                    <h5>{t('usersmangment')}</h5>
                    <Button ghost={false}
                        iconPosition={"end"}
                        shape="default"
                        size="small"
                        type="primary" onClick={addUsers}  >
                        <span> اضافة مستخدم</span>
                        <PlusOutlined />
                    </Button>
                  
                    </Space>
                </Row>
                <Row className="mt-3" style={{ marginBottom: '200px', overflowX: 'auto' }}>
                    <Col span={24}  >
                    <Table dataSource={users} size="small" columns={columns} rowKey="id" />
                    </Col>
                </Row>
           </>
    );

}
export default Users;