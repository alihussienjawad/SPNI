import {   Button, Col,    Row } from "antd"
import '../../App.css'
import { Role, User, } from "../../Interfaces/GeneralInterface";
import { useEffect, useState } from "react";
import axios from "../../api";
import Table from "antd/es/table";
import { CloseModal } from "../../../app/reducers/modalSlice";
import { AppDispatch } from "../../../app/store";
import { useDispatch } from "react-redux";
 
 
 
 


const Details = (record: User) => {  
    const [Roles, SetRole] = useState<Role[]>([] as Role[]);
    const dispatch = useDispatch<AppDispatch>();

   
     
    const EnableDesableAccount = () => {
     
        axios.post(`/Account/LockInOut/${record.id}` )  
            .then((res) => {
                if (res.data) {
                    dispatch(CloseModal(!res.data))
                     
                }

            })
    }

    function SetPassword1  ()  {
        
        axios.post(`/Account/ResetPassword/${record.id}`)
            .then((res) => {
                if (res.data) {
                    dispatch(CloseModal(!res.data))
                }

            })
}
    useEffect(() => {
        axios.get(`/Account/GetAllRole?userid=${record.id}`)
            .then(res => SetRole(res.data))


    }, [record.id])
    const columns = [
        {

            title: 'صلاحيات المستخدم',
            dataIndex: 'roleNameAR',
            key: 'roleNameAR',
        },
    ];

    return (
        <>
            {record.closedBy != "" ? <h4 className="text-danger d-flex justify-content-center">اغلق من قبل /{record.closedBy}  </h4> : ""}
            <hr />
          
            <Row>
                <Col span={18} style={{ color: "black", fontWeight: "bolder" }}>

                    <h6>{record.rankName} /{record.personName}       </h6>
                    <h6> المنصب                  /{record.personPosition}   </h6>
                    <h6>السيسكو                  /{(record.cisco).toString()}            </h6>     
                    <h6>الايميل                   /<span className="text-danger" >{record.email}</span> </h6>
                    <h6>انشأ من قبل              /{record.created_by}  بتاريخ  {(record.created_date).toString()}    </h6>
                    <h6>تم التحديث من قبل        /{record.updated_by} بتاريخ  {(record.updated_date).toString()}     </h6>
                    {record.hrTest  ? <h6>الموارد                  /{record.hrTest}   فعال          </h6> : <h6>الموارد  /{record.hrTest}   غير فعال  </h6>  }


                </Col>
                <Col span={6} style={{    fontWeight: "bolder", marginTop:'10px' }}>
                     <Table  dataSource={Roles.filter(i=>i.isSelected)} columns={columns} rowKey="roleNameAR" style={{  float: 'left', width: '100%' }} />
                </Col>
                <Col span={24}>
                    <Button onClick={SetPassword1}  className="btn btn-md btn-warning w-60 text-light " >  اعادة تعيين كلمة المرور  </Button> |
                    <Button onClick={() => EnableDesableAccount()} className={record.lockoutEnabled ? "btn btn-md btn-success" : "btn btn-md btn-danger"}> {record.lockoutEnabled ? "تفعيل الحساب" : "تعطيل الحساب"} </Button>
                </Col>      
            </Row>
        </>
    )
};
export default Details