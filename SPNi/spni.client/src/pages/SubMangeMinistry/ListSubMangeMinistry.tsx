

import { useEffect, useState } from "react";
 
 
 
import {   DeleteFilled, DeleteOutlined, EditFilled, EditOutlined, PlusOutlined } from "@ant-design/icons";
 
import Button from "antd/es/button/button";
import { Col,  Row } from "react-bootstrap";
import {  Space, Table } from "antd";
 
import Delete from "./Delete";
import { RankList,   RuleList,   SubMangeMinistrysDto } from "../../Interfaces/GeneralInterface";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { setModal } from "../../../app/reducers/modalSlice";
import { ColumnsType } from "antd/es/table";
import CreateUpdate from "./createUpdate";
import axios from "../../api";
import { SetError } from "../../../app/reducers/craudSlice";
import { useTranslation } from "react-i18next";
import { DataIndex, DataIndexValue } from "../../Interfaces/functions";
 


const ListSubMangeMinistry = () => {
    const [sub, Setsub] = useState<SubMangeMinistrysDto[]>();
    const [rank, setrank] = useState<RankList[]>([]);
    const [rule, setRule] = useState<RuleList[]>([]);
 
    const { postState } = useSelector((state: RootState) => state.modal);
    const { arlang, dir } = useSelector((state: RootState) => state.setting);

    const dispatch = useDispatch<AppDispatch>();
    const { t } = useTranslation();
    useEffect(() => {
        axios.get("/SubMangeMinistries")
            .then(data => Setsub(data.data));
 
    }, [postState]);
     

    const GetRankList = () => {
        axios.get('/OfficerInfoes/GetRankList')
            .then(res => {
                setrank(res.data)
                if (!arlang) {
                    setrank(res.data.map((i: RankList) => {
                        return {
                            label: i.labelEn,
                            value: i.value
                        } as RankList
                    }))
                }
            })
    }
 
    const GetRuleList = () => {
        axios.get('/OfficerInfoes/GetRuleList')
            .then(res => {
                setRule(res.data)
                if (!arlang) {
                    setRule(res.data.map((i: RuleList) => {
                        return {
                            label: i.labelEn,
                            value: i.value
                        } as RuleList
                    }))
                }
            })
    };

    useEffect(() => {
        GetRankList();
        GetRuleList();
    }, [postState, arlang])

    const addSubMangeMinistry = () => {
        dispatch(SetError())
        dispatch(setModal({
            isOpen: true, content: <CreateUpdate ranks={rank} rule={rule}  record={{ id: 0 } as SubMangeMinistrysDto} />, Width: 600, title: "اضافة جديد" }))
    };

    const deleteSubMangeMinistry = (row: SubMangeMinistrysDto) => {
        dispatch(SetError())
        dispatch(setModal({ modalIcon: <DeleteOutlined style={{ color: 'red' }} />, isOpen: true, content: <Delete  {...row} />, Width: 600, title: " حذف" })
        )
    };

    const updateSubMangeMinistry = (row: SubMangeMinistrysDto) => {
        dispatch(SetError())
        console.log(row)
        dispatch(setModal({ modalIcon: <EditOutlined style={{ color: 'green' }} />, isOpen: true, content: <CreateUpdate ranks={rank} rule={rule} record={row} />, Width: 600, title: " تعديل" })
        )
    };


    const columns: ColumnsType<SubMangeMinistrysDto> = [
        {
            title: `${t("order")}`,
            dataIndex: 'sort',

        },
        {
            title: 'id',
            dataIndex: 'id',
            hidden: true
        },
        {
            title: t("rankName"),
            dataIndex: DataIndex(arlang, "rankName")

        },
        {
            title: t("fullName"),
            dataIndex: DataIndex(arlang, "name"),
            render: (_: number, record: SubMangeMinistrysDto) => (
                record.active ? <span>{DataIndexValue(arlang, "name", record)}</span> : <mark>{DataIndexValue(arlang, "name", record)}</mark>
            )
        } ,
  
        {
            title: t("position"),
            dataIndex: DataIndex(arlang, "position") 

        },
        {
            title: t("Validity"),
            dataIndex: DataIndex(arlang, "ruleOfficerMinistryName") 

        },
        {
            title: t("Actingperiod"),
            children: [{
                title: t("from"),
                dataIndex: 'from',

            }, {
                title: t("to"),
                dataIndex: 'to',

            },]
        },
       
 
   
        {
            title: t("actions"),
            key: 'SubMangeMinistry',
            render: (_: number, record: SubMangeMinistrysDto) => (

                <Space size="middle" dir={dir }>

                    <Button onClick={() => updateSubMangeMinistry(record)} className="btn-border-edit"><EditFilled className="edit-icon" /></Button>
                    <Button onClick={() => deleteSubMangeMinistry(record)} className="btn-border-delet"><DeleteFilled className="delete-icon" /></Button>
                </Space>
            )
        },


    ];


    return (
     
            <Row>
            <Row className="sticky-top box-sh">
                <Space className="w-100" size='middle'
                    style={{ display: 'felx', justifyContent: 'space-between' }}  >
                    <h6>{t('modpresentatives')}</h6>
                    <Button ghost={false}
                        iconPosition={"end"}
                        shape="default"
                        size="small"
                        type="primary" onClick={addSubMangeMinistry}  >
                        <span> {t('add')}</span>
                        <PlusOutlined />
                    </Button>

                </Space>
            </Row>
            <Row className="mt-3" style={{ marginBottom: '200px', overflowX: 'auto' }}>
                    <Col span={24}>
                    <Table
                        dataSource={sub}
                        columns={columns}
                        rowKey="id"
                        bordered
                        size='small'
                         
                    />
                    </Col>
                </Row>
            </Row>
    )
};
export default ListSubMangeMinistry;


