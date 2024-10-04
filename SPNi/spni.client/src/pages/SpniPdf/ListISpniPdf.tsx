

import { useEffect, useState } from "react";
 
 
 
import {   DeleteFilled, DeleteOutlined,  PlusOutlined } from "@ant-design/icons";
 
import Button from "antd/es/button/button";
import { Col, Row } from "react-bootstrap";
import {   Space, Table } from "antd";
 
import Delete from "./Delete";
import {  SpniPdf } from "../../Interfaces/GeneralInterface";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { setModal } from "../../../app/reducers/modalSlice";
 
import axios from "../../api";
import { SetError } from "../../../app/reducers/craudSlice";
import { ColumnsType } from "antd/es/table";
import FromFilePdf from "./fromFilePdf";
import { useTranslation } from "react-i18next";
import { DataIndex } from "../../Interfaces/functions";
 
 
 
 
 

const ListISpniPdf = () => {
    const [Pdf, SetPdf] = useState<SpniPdf[]>();
 
    const { postState } = useSelector((state:RootState) => state.modal);
    const dispatch = useDispatch<AppDispatch>();
    const { arlang } = useSelector((state: RootState) => state.setting);
    const { t } = useTranslation();

    useEffect(() => {
        axios.get("/SpniPdfs")
            .then(data => SetPdf(data.data));
    }, [postState]);

 

    const addPdf = () => {
        dispatch(SetError())
        dispatch(setModal({
            isOpen: true, content: <FromFilePdf     />, Width: 500, title: "اضافة جديد" }))
    };

    const deletepdf = (row: SpniPdf) => {
        dispatch(SetError())
        dispatch(setModal({ modalIcon: <DeleteOutlined style={{ color: 'red' }} />, isOpen: true, content: <Delete  {...row} />, Width: 500, title: " حذف" })
        )
    };

  
 
    const columns: ColumnsType<SpniPdf> = [
        {
            title: 'ت',
            dataIndex: 'id1',
            hidden: true,
        },
        {
            title: 'id',
            dataIndex: 'id',
            hidden: true
        },
        {
            title: t("order"),
            dataIndex: 'sort',

        },
        {
            title: t("FileName"),
            dataIndex:DataIndex(arlang, 'name'),

        },
       
        {
            title: t("color"),
            dataIndex: 'color',

            render: (_: number, record: SpniPdf) => (

                <Space size="middle">
                   <input type="color" defaultValue={record.color} disabled></input>
                </Space>
            )
        },
        {
            title: t("description"),
            dataIndex: DataIndex(arlang, 'description'),
          

        },
        {
            title: '  مسار الملف',
            dataIndex: 'pdfFileName',
            hidden:true
        },
        {
            title: t("actions"),
            key: 'SpniPdf',
            render: (_: number, record: SpniPdf) => (

                <Space size="middle">
                    <Button onClick={() => deletepdf(record)} className="btn-border-delet"><DeleteFilled className="delete-icon" /></Button>
                </Space>
            )
        },


    ];


    return (
     
            <Row>

                
                 

                <Row className="sticky-top box-sh">
                    <Space className="w-100" size='middle'
                        style={{ display: 'felx', justifyContent: 'space-between' }}  >
                    <h5> {t('sustainingcontexts')}</h5>
                    <Button ghost={false}
                        iconPosition={"end"}
                        shape="default"
                        size="small"
                        type="primary" onClick={addPdf}  >
                        <span> {t("add")}</span>
                            <PlusOutlined />
                        </Button>

                    </Space>
                </Row>
            <Row className="mt-3" style={{ marginBottom: '200px', overflowX: 'auto' }}>
                <Col span={24}>
                    <Table dataSource={Pdf} columns={columns} size="small" rowKey="id" />
                    </Col>
                </Row>
            </Row>

     




    )
};
export default ListISpniPdf;


