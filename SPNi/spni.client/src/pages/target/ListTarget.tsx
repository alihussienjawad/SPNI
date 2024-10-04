

import { useEffect, useState } from "react";
import { CheckOutlined, CloseOutlined, DeleteFilled, DeleteOutlined, EditFilled, EditOutlined, PlusOutlined } from "@ant-design/icons";
import Button from "antd/es/button/button";
import { Col, Row } from "react-bootstrap";
import {  Space, Table } from "antd";
import Delete from "./Delete";
import {  TargetDto } from "../../Interfaces/GeneralInterface";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { setModal } from "../../../app/reducers/modalSlice";
import CreateUpdate from "./createUpdate";
import axios from "../../api";
import { SetError } from "../../../app/reducers/craudSlice";
import { ColumnsType } from "antd/es/table";
import { useTranslation } from "react-i18next";
import { DataIndex, DataIndexValue } from "../../Interfaces/functions";
 
 
 
const intialvalue: TargetDto = {
    id: 0,
    active: false,
    moshtrak:false,
    name: "",
    nameEn:"",
    sort: 0,
    year:  0,
    mainTarget: true,
    perentTargetId: 0,
    targetScorr: 0,
    subTargets:[],
    
}
 
const ListTarget = () => {
    const [traget, Settarget] = useState<TargetDto[]>();
    const { t } = useTranslation();
    const { postState } = useSelector((state:RootState) => state.modal);
    const { arlang,dir } = useSelector((state:RootState) => state.setting);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        axios.get("/Targets")
            .then(data => {
                Settarget(data.data)
            });
       
    }, [postState]);

    const addTarget = () => {
        dispatch(SetError())
        dispatch(setModal({
            isOpen: true, content: <CreateUpdate   {...intialvalue}  />, Width: 500, title: "اضافة جديد" }))
    };

    const deleteTarget = (row: TargetDto) => {
        dispatch(SetError())
        dispatch(setModal({ modalIcon: <DeleteOutlined style={{ color: 'red' }} />, isOpen: true, content: <Delete  {...row} />, Width: 500, title: " حذف" })
        )
    };

    const updateTarget = (row: TargetDto) => {
        dispatch(SetError())
        dispatch(setModal({ modalIcon: <EditOutlined style={{ color: 'green' }} />, isOpen: true, content: <CreateUpdate    {...row}  />, Width: 500, title: " تعديل" })
        )
    };
  
  
    const columns: ColumnsType<TargetDto> = [
        {
            title: t("order"),
            dataIndex: 'sort',
            width: 100, 
        },
        {
            title:'id',
            dataIndex:'id',
            hidden: true
        },
   
        {
            title: t("targetName1"),
            dataIndex: DataIndex(arlang,"name"),
            render: (_: number, record: TargetDto) => (
                DataIndexValue(arlang,"name", record) ? <span>{DataIndexValue(arlang,"name", record)}</span> : <mark> {DataIndexValue(arlang,"name", record)}</mark>
            ),

        },
        {
            title: t("targetScorr"),
            dataIndex: 'targetScorr',
            width: 150, 
        },
        {
            title: t("year"),
            dataIndex: 'year',
            width: 150,
        },
       
    
        {
            key: 'moshtrak',
            title: t("moshtrak"),
            render: (_: number, record: TargetDto) => (
                record.moshtrak ? <p> <CheckOutlined style={{ fontSize: '22px', color: 'green',   }} /></p> : <p><CloseOutlined style={{ fontSize: '22px', color: 'red',  }} />  </p>


            ),
            width: 150,

        },
        
        {
            title: t("actions"),
            key: 'Target',
            render: (_: number, record: TargetDto) => (

                
                <Space dir={dir }>
                    <Button onClick={() => updateTarget(record)} className="btn-border-edit"><EditFilled className="edit-icon" /></Button>
                   <Button onClick={() => deleteTarget(record)} className="btn-border-delet"><DeleteFilled className="delete-icon" /></Button> 
                </Space>
            ),
            width: 250,
        },


    ];
  
    const expandedRowRender = (s: TargetDto) => {

        
        const subcolumns: ColumnsType<TargetDto> = [
            {
                title: `${t("order")}`,
                dataIndex: 'sort',
                width: 150,
                render: (_: number, record: TargetDto) => (
                    <span dir={dir }> {s.sort} - { record.sort}</span> 
                ),
            },
            {
                title: 'id',
                dataIndex: 'id',
                hidden: true
            },
            {
                title: `${t("targetName1")}`,
                dataIndex: DataIndex(arlang, "name"),
                render: (_: number, record: TargetDto) => (
                    DataIndexValue(arlang,"name", record) ? <span>{DataIndexValue(arlang, "name", record)}</span> : <mark> {DataIndexValue(arlang, "name", record)}</mark>
                ),

            },
            {
                title: `${t("targetScorr")}`,
                dataIndex: 'targetScorr',
                width: 150,
            },
            {
                title: `${t("year")}`,
                dataIndex: 'year',
                width: 150,
            },


            {
                key: 'moshtrak',
                title: `${t("moshtrak")}`,
                render: (_: number, record: TargetDto) => (
                    record.moshtrak ? <p> <CheckOutlined style={{ fontSize: '22px', color: 'green', }} /></p> : <p><CloseOutlined style={{ fontSize: '22px', color: 'red', }} />  </p>


                ),
                width: 150,

            },

            {
                title: `${t("actions")}`,
                key: 'Target',
                render: (_: number, record: TargetDto) => (

                    <Space size="middle" dir={dir}>

                        <Button onClick={() => updateTarget(record)} className="btn-border-edit"><EditFilled className="edit-icon" /></Button>
                        <Button onClick={() => deleteTarget(record)} className="btn-border-delet"><DeleteFilled className="delete-icon" /></Button> 
                    </Space>
                ),
                width: 250,
            },


        ];

        
        return (
            <div dir={dir}>
                <p className="text-success w-100 d-flex justify-content-start"  > {t("subgoalsof")} ( {arlang ? s.name : s.nameEn}) </p>
            <Table
            className="sub-targets"
            columns={subcolumns}
            rowClassName="sub-targets"
            dataSource={s.subTargets}
            pagination={false}
                    direction={dir }
                    rowKey="id"
            style={{ marginRight: '-10px', minWidth: '101%' }}
        /></div>)
            ;
    }
    return (
     
            <Row>

                
            <Row className="sticky-top box-sh">
                <Space className="w-100" size='middle'
                    style={{ display: 'felx', justifyContent: 'space-between' }}  >
                    <h6> {t('targets')}</h6>
                    <Button ghost={false}
                        iconPosition={"end"}
                        shape="default"
                        size="small"
                        type="primary"  onClick={addTarget}>
                        <span> {t('add')}</span>
                        <PlusOutlined />
                    </Button>

                </Space>
            </Row>
            <Row className="mt-3" style={{ marginBottom: '200px', overflowX: 'auto' }}>
                <Col span={24}  >
                    <Table<TargetDto>  
                        dataSource={traget}
                        columns={columns}
                        rowKey="id"
                        direction={dir}
                        expandable={{expandedRowRender, defaultExpandedRowKeys: ['0'] }}
                        size={"small"} />
                    </Col>
                </Row>
            </Row>

     




    )
};
export default ListTarget;


