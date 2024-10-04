

import { useEffect, useState } from "react";

 
import {  NewsDto } from "../../Interfaces/GeneralInterface";
import { CheckOutlined, CloseOutlined, DeleteFilled, DeleteOutlined, EditFilled, EditOutlined, PlusOutlined } from "@ant-design/icons";
 
import Button from "antd/es/button/button";
import { Col, Row } from "react-bootstrap";
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
import { DataIndex } from "../../Interfaces/functions";
 
 
 
 
 
const intialvalue: NewsDto = {
    id: 0,
    can: false,
    canAll:false,
    details: "",
    detailsEn: "",
    applicationUserId:'aa',
    id1: 0,

}



const ListNews = () => {
    const [newss, SetNewss] = useState<NewsDto[]>();

   
    const { postState } = useSelector((state: RootState) => state.modal);
    const { arlang, dir } = useSelector((state: RootState) => state.setting);
    const { t } = useTranslation();

    const dispatch = useDispatch<AppDispatch>();


    useEffect(() => {
        axios.get("/News")
            .then(res =>
               SetNewss(res.data));
    }, [postState]);
 
    const addNews = () => {
        dispatch(SetError())
        dispatch(setModal({
            isOpen: true, content: <CreateUpdate {...intialvalue}    />, Width: 500, title: "اضافة جديد" }))
    };

const deleteNews = (row: NewsDto) => {
    dispatch(SetError())
        dispatch(setModal({ modalIcon: <DeleteOutlined style={{ color: 'red' }} />, isOpen: true, content: <Delete  {...row} />, Width: 800, title: " حذف" })
        )
    };

const updateNews = (row: NewsDto) => {
    dispatch(SetError())
    dispatch(setModal({ modalIcon: <EditOutlined style={{ color: 'green' }} />, isOpen: true, content: <CreateUpdate     {...row}  />, Width:800, title: " تعديل" })
        )
    };


    const columns: ColumnsType<NewsDto> = [
        {
            title: `${t("order")}`,
            dataIndex: 'sort',
            hidden: true
        },
        {
            title: 'id',
            dataIndex: 'id',
            hidden: true
        },
        {
            title: 'صاحب التبليغ',
            dataIndex: 'applicationUserId',
            hidden:true
        },

        {
            title: t("NewsDetails"),
            dataIndex:DataIndex(arlang,"details"),
             
        },

        {
            title: t("ShowNews"),
            dataIndex: 'can',
            render: (_: number, record: NewsDto) => (
                record.can ? <p   > <CheckOutlined style={{ fontSize: '22px', color: 'green', }} /></p> : <p  ><CloseOutlined style={{ fontSize: '22px', color: 'red', }} />  </p>


            )
        },
     
        {
            title: t("actions"),
            key:Math.random(),
            render: (_: number, record: NewsDto) => (

                <Space size="middle" dir={dir }>

                    <Button onClick={() => updateNews(record)} className="btn-border-edit"><EditFilled className="edit-icon" /></Button>
                   <Button onClick={() => deleteNews(record)} className="btn-border-delet"><DeleteFilled className="delete-icon" /></Button> 
                </Space>
            )
        },


    ];


    return (
     
            <Row>

           
            <Row className="sticky-top box-sh">
                <Space className="w-100" size='middle'
                    style={{ display: 'felx', justifyContent: 'space-between' }}  >
                    <h5> {t('maintainnotifications')}</h5>
                    <Button ghost={false}
                        iconPosition={"end"}
                        shape="default"
                        size="small"
                        type="primary" onClick={addNews}  >
                        <span> {t("add")}</span>
                        <PlusOutlined />
                    </Button>

                </Space>
            </Row>
            <Row className="mt-3" style={{ marginBottom: '200px', overflowX: 'auto' }}>
                    <Col span={24}>
                    <Table dataSource={newss} size="small" columns={columns} rowKey="id" />
                    </Col>
                </Row>
            </Row>

     




    )
};
export default ListNews;


