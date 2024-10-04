

import { useEffect, useState } from "react";
 
import {  TargetsMangeMinistryDto  } from "../../Interfaces/GeneralInterface";
import {  EditFilled, EditOutlined } from "@ant-design/icons";
 
import Button from "antd/es/button/button";
import { Col,   Row } from "react-bootstrap";
import {  Space, Table } from "antd";
import axios from "../../api";
 
import { AppDispatch, RootState } from "../../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../../app/reducers/modalSlice";
import { ColumnsType } from "antd/es/table";
import CreateUpdate from "./createUpdate";
import { SetError } from "../../../app/reducers/craudSlice";
import { useTranslation } from "react-i18next";
import { DataIndex } from "../../Interfaces/functions";
 

 

const ListTargetsMangeMinistry = () => {
  
    const [TargetsMangeMinistry, SetTargetsMangeMinistry] = useState<TargetsMangeMinistryDto[]>();
    const { t } = useTranslation();
    const { arlang } = useSelector((state: RootState) => state.setting);
    const { postState } = useSelector((state:RootState) => state.modal);
    const dispatch = useDispatch<AppDispatch>();


    useEffect(() => {
        axios.get("/TargetsMangeMinistry/GetTargetsManage")
             
            .then(data => SetTargetsMangeMinistry(data.data));
    }, [postState]);

 
   
 

    const updateSpniUnit = (row: TargetsMangeMinistryDto) => {
       
        dispatch(SetError())
        dispatch(setModal({ modalIcon: <EditOutlined style={{ color: 'green' }} />, isOpen: true, content: <CreateUpdate {...row} />, Width: 500, title: " تعديل" })
        )
    };


    const columns: ColumnsType<TargetsMangeMinistryDto> = [
         
        {
            title: 'id',
            dataIndex: 'id',
            hidden:true
        },
        {
            title: 'id',
            dataIndex: 'mangeMinistryId',
            hidden: true
        },
        {
            title: t('unitName'),
            dataIndex: DataIndex(arlang,"mangeMinistryName"),
             
        },
        {
            title:t('unitGoals'),
            dataIndex: 'targetsMangeMinistryList',
            render: (_: number, record: TargetsMangeMinistryDto) => (
                record.targetsMangeMinistryList.map(item => <p key={item.value }>{arlang? item.label:item.labelEn}</p>)
            )
        },
        
        {
            title: t('actions'),
            key: 'aa',
            render: (_: number, record: TargetsMangeMinistryDto) => (
                    
                <Space size="middle">

                    <Button onClick={() => updateSpniUnit({ ...record, targetsList: record.targetsMangeMinistryList.map(i=>i.value)})} className="btn-border-edit"><EditFilled className="edit-icon" /></Button>
                 </Space>
            )
        },


    ];


    return (
     
            <Row>

              
            <Row className="sticky-top box-sh">
                <Space className="w-100" size='middle'
                    style={{ display: 'felx', justifyContent: 'space-between' }}  >
                    <h6>{t('assignunitobjectives') }</h6>
                </Space>
            </Row>
            <Row className="mt-3" style={{ marginBottom: '200px', overflowX: 'auto' }}>
                <Col     span={24 }  >
                    <Table dataSource={TargetsMangeMinistry} columns={columns} rowKey="id" size={ "small"}  bordered/>
                    </Col>
                </Row>
            </Row>

     




    )
};
export default ListTargetsMangeMinistry;


