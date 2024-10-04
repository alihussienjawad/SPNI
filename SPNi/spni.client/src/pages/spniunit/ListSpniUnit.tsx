

import { useEffect, useState } from "react";
 
import {  SpiUnitDTO  } from "../../Interfaces/GeneralInterface";
import { CheckOutlined, CloseOutlined, DeleteFilled, DeleteOutlined, EditFilled, EditOutlined, PlusOutlined } from "@ant-design/icons";
 
import Button from "antd/es/button/button";
import { Col,   Row } from "react-bootstrap";
import {  Space, Table } from "antd";
import axios from "../../api";
import Delete from "./Delete";
import { AppDispatch, RootState } from "../../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../../app/reducers/modalSlice";
import { ColumnsType } from "antd/es/table";
import CreateUpdate from "./createUpdate";
import { SetError } from "../../../app/reducers/craudSlice";
import { useTranslation } from "react-i18next";
import { DataIndexValue } from "../../Interfaces/functions";
 

const intialvalue: SpiUnitDTO = {
    id: 0,
    bgColor:"",
    canAdd:false,
    ur_no:0,
    color:"",
        active: false,
        name: "",
        nameEn: "",
        sort: 0,
        id1: 0,
     
}

const ListSpniUnit = () => {
  
    const [SpniUnit, SetSpniUnit] = useState<SpiUnitDTO[]>();

    const { t } = useTranslation();
    const { arlang, dir } = useSelector((state: RootState) => state.setting);
    const { postState } = useSelector((state:RootState) => state.modal);
    const dispatch = useDispatch<AppDispatch>();


    useEffect(() => {
        axios.get("/SpiUnits")
             
            .then(data => SetSpniUnit(data.data));
    }, [postState]);

   
 
  

    const addSpniUnit = () => {
        dispatch(SetError())
        dispatch(setModal({
            isOpen: true, content: <CreateUpdate  {...intialvalue} />, Width: 600, title: "اضافة جديد" }))
    };

    const deleteSpniUnit = (row: SpiUnitDTO) => {
        dispatch(SetError())
        dispatch(setModal({ modalIcon: <DeleteOutlined style={{ color: 'red' }} />, isOpen: true, content: <Delete  {...row} />, Width: 600, title: " حذف" })
        )
    };

    const updateSpniUnit = (row: SpiUnitDTO) => {
        dispatch(SetError())
        dispatch(setModal({ modalIcon: <EditOutlined style={{ color: 'green' }} />, isOpen: true, content: <CreateUpdate {...row} />, Width: 600, title: " تعديل" })
        )
    };


    const columns: ColumnsType<SpiUnitDTO> = [
        {
            title: t("order"),
            dataIndex: 'sort',
             
        },
        {
            title: 'id',
            dataIndex: 'id',
            hidden:true
        },
        {
            title: t("unitName"),
            dataIndex: 'name',
            render: (_: number, record: SpiUnitDTO) => (
                record.active ?  <span>{DataIndexValue(arlang,"name", record)}</span>: <mark> { record.name}</mark>
            )
        },
        
         

       
        {
            key: 'canAdd',
            title: t("canAdd"),
            render: (_: number, record: SpiUnitDTO) => (
                record.canAdd ? <p   > <CheckOutlined style={{ fontSize: '22px', color: 'green'   }} /></p> : <p   ><CloseOutlined style={{ fontSize: '22px', color: 'red'}}  />  </p>  


            )

        },
        {
            title: t("actions"),
            key: 'SpiUnit',
            render: (_: number, record: SpiUnitDTO) => (

                <Space size="middle" dir={dir }>

                    <Button onClick={() => updateSpniUnit(record)} className="btn-border-edit"><EditFilled className="edit-icon" /></Button>
                  <Button onClick={() => deleteSpniUnit(record)} className="btn-border-delet"><DeleteFilled className="delete-icon" /></Button> 
                </Space>
            )
        },


    ];


    return (
     
            <Row>

              
            <Row className="sticky-top box-sh">
                <Space className="w-100" size='middle'
                    style={{ display: 'felx', justifyContent: 'space-between' }}  >
                    <h6>  {t('commonunitsinthesystem')}</h6>
                    <Button ghost={false}
                        iconPosition={"end"}
                        shape="default"
                        size="small"
                        type="primary" onClick={addSpniUnit}  >
                        <span>{t("add")}</span>
                        <PlusOutlined />
                    </Button>

                </Space>
            </Row>
            <Row className="mt-3" style={{ marginBottom: '200px', overflowX: 'auto' }}>
                <Col     span={24 }  >
                    <Table dataSource={SpniUnit} columns={columns} rowKey="id" size={ "small"}  bordered/>
                    </Col>
                </Row>
            </Row>

     




    )
};
export default ListSpniUnit;


