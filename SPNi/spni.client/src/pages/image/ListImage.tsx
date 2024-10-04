

import { useEffect, useState } from "react";
import {  DeleteFilled, DeleteOutlined,  PlusOutlined } from "@ant-design/icons";
import Button from "antd/es/button/button";
import { Col, Row } from "react-bootstrap";
import {  Space, Table } from "antd";
import Delete from "./Delete";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { setModal } from "../../../app/reducers/modalSlice";
import axios from "../../api";
import { SetError } from "../../../app/reducers/craudSlice";
import { ColumnsType } from "antd/es/table";
import { Images  } from "../../Interfaces/GeneralInterface";
import FormFile from "./fromFile";
import { useTranslation } from "react-i18next";
import { DataIndex } from "../../Interfaces/functions";
 
 

const ListImage = () => {
    const [image, Setimage] = useState<Images[]>();

    const { t } = useTranslation();
    const { postState } = useSelector((state: RootState) => state.modal);
    const { arlang,dir } = useSelector((state: RootState) => state.setting);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        axios.get("/Images")
            .then(data => Setimage(data.data));
    }, [postState]);

 

 
    const addimage = () => {
        dispatch(SetError())
        dispatch(setModal({
            isOpen: true, content: <FormFile    />, Width: 500, title: "اضافة جديد"
        }))
    };
 
    const deleteimage = (row: Images) => {
        dispatch(SetError())
        dispatch(setModal({ modalIcon: <DeleteOutlined style={{ color: 'red' }} />, isOpen: true, content: <Delete  {...row} />, Width: 500, title: " حذف" })
        )
    };

 
 
    const columns: ColumnsType<Images> = [
        {
            title: t("order"),
            dataIndex: 'sort',

           
        },
        {
            title: 'id',
            dataIndex: 'id',
            hidden:true,
        },
        {
            title: 'userId',
            dataIndex: 'userId',
            hidden: true,
        },
        {
            title: t("imageName"),
            dataIndex: DataIndex(arlang,"name"),
          
        },
        {
            title: t("howAddedImage"),
            dataIndex: 'userName',
           
        },
        {
            title: t("imageDate"),
            dataIndex: 'createdDate',
            render: (_: number, record: Images) => record.createdDate.toString().split('T')[0], 
        },
        {
            title: 'الوحدة',
            dataIndex: 'unitName',
            hidden:true
        },
        {
            title: ' اللون ',
            dataIndex: 'color',
            hidden:true,
            render: (_: number, record: Images) => (

                <Space size="middle" dir={dir }>
                    <input type="color" defaultValue={record.color} disabled></input>
                </Space>
            )
        },
        {
            title: t("description"),
            dataIndex: DataIndex(arlang,"description"),
           
        },
        {
            title: '  مسار الصورة',
            dataIndex: 'imageFileName',
            hidden:true
        },
        {
            title: t("actions"),
            key: 'Images',
            render: (_: number, record: Images) => (

                <Space size="middle" dir={dir }>

                   {/* <Button onClick={() => updateSpniUnit(record)} className="btn-border-edit"><EditFilled className="edit-icon" /></Button>*/}
                    <Button onClick={() => deleteimage(record)} className="btn-border-delet"><DeleteFilled className="delete-icon" /></Button> 
                </Space>
            )
        },


    ];


    return (
     
            <Row>

                
            <Row className="sticky-top box-sh">
                <Space className="w-100" size='middle'
                    style={{ display: 'felx', justifyContent: 'space-between' }}  >
                    <h5> {t('maintainthephotogallery')}</h5>
                    <Button ghost={false}
                        iconPosition={"end"}
                        shape="default"
                        size="small"
                        type="primary" onClick={addimage}>
                        <span> {t('add') }</span>
                        <PlusOutlined />
                    </Button>

                </Space>
            </Row>
            <Row className="mt-3" style={{ marginBottom: '200px', overflowX: 'auto' }}>
                <Col span={24}>
                    <Table dataSource={image} size="small" columns={columns} rowKey="id" />
                    </Col>
                </Row>
            </Row>

     




    )
};
export default ListImage;


