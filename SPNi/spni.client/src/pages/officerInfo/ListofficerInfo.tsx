

import { useEffect, useState } from "react";
import { CountryList, OfficerInfoDto, RankList, RuleList } from "../../Interfaces/GeneralInterface";
import { DeleteFilled, DeleteOutlined, EditFilled, EditOutlined, PlusOutlined } from "@ant-design/icons";
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
import { DataIndex, DataIndexValue } from "../../Interfaces/functions";
 
 
const ListofficerInfo = () => {
    const [officerInfo, SetofficerInfo] = useState<OfficerInfoDto[]>();
    const [rank, setrank] = useState<RankList[]>([]);
    const [country, setcountry] = useState<CountryList[]>([]);
    const [rule, SetRule] = useState<RuleList[]>([]);
    const { postState } = useSelector((state: RootState) => state.modal);
    const { arlang,dir } = useSelector((state: RootState) => state.setting);


    const { t } = useTranslation();
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        axios.get("/OfficerInfoes")
            .then(res =>
                SetofficerInfo(res.data));
    }, [postState]);



    useEffect(() => {
        GetRankList();
        GetCountryList();
        GetRuleList();
    }, [arlang, postState]);

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
    const GetCountryList = () => {
        axios.get('/OfficerInfoes/GetCountryList') 
            .then(res => {
                setcountry(res.data)
                if (!arlang) {
                    setcountry(res.data.map((i: CountryList) => {
                        return {
                            label: i.labelEn,
                            value: i.value
                        } as CountryList
                    }))
                }
            })
    }
    const GetRuleList = () => {
        axios.get('/OfficerInfoes/GetRuleList')
            .then(res => {
                SetRule(res.data)
                if (!arlang) {
                    SetRule(res.data.map((i: RuleList) => {
                        return {
                            label: i.labelEn,
                            value: i.value
                        } as RuleList
                    }))
                }
            }) 
    };
    const addOfficer = () => {
        dispatch(SetError())
        dispatch(setModal({
            isOpen: true, content: <CreateUpdate ranks={rank} country={country} rule={rule} record={{ id: 0 } as OfficerInfoDto} />, Width: 600, title: "اضافة جديد"
        }))
    };

    const deleteOfficer = (row: OfficerInfoDto) => {
        dispatch(SetError())
        dispatch(setModal({ modalIcon: <DeleteOutlined style={{ color: 'red' }} />, isOpen: true, content: <Delete  {...row} />, Width: 600, title: " حذف" })
        )
    };

    const updateOfficer = (row: OfficerInfoDto) => {
        dispatch(SetError())
        dispatch(setModal({ modalIcon: <EditOutlined style={{ color: 'green' }} />, isOpen: true, content: <CreateUpdate rule={ rule} ranks={rank} country={country} record={row} />, Width: 600, title: " تعديل" })
        )
    };

    const columns: ColumnsType<OfficerInfoDto> = [
        {
            title: t("order"),
            dataIndex: "sort",
             
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
            dataIndex: DataIndex(arlang, "name") ,
            render: (_: number, record: OfficerInfoDto) => (
                record.active ? <span>{DataIndexValue(arlang, "name", record)}</span> : <mark>{DataIndexValue(arlang, "name", record)}</mark>
            )
        },
        
        {
            title: t("position"),
            dataIndex: DataIndex(arlang, "position") 
        },

        {
            title: t("CountryName"),
            dataIndex: DataIndex(arlang, "countryName") 

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
            key: 'officerInfo',
            render: (_: number, record: OfficerInfoDto) => (
                <Space size="middle" dir={dir }>
                    <Button onClick={() => updateOfficer(record)} className="btn-border-edit"><EditFilled className="edit-icon" /></Button>
                   <Button onClick={() => deleteOfficer(record)} className="btn-border-delet"><DeleteFilled className="delete-icon" /></Button> 
                </Space>
            )
        },


    ];
    return (
     
            <Row>
                <Row className="sticky-top box-sh">
                    <Space className="w-100" size='middle'
                        style={{ display: 'felx', justifyContent: 'space-between' }}  >
                    <h6> {t('nmpresentatives')}</h6>
                    <Button ghost={false}
                        iconPosition={"end"}
                        shape="default"
                        size="small"
                        type="primary" onClick={addOfficer} >
                        <span> { t('add')}</span>
                            <PlusOutlined />
                        </Button>
                    </Space>
                </Row> 
            <Row className="mt-3" style={{ marginBottom: '200px', overflowX: 'auto' }}>
                    <Col span={24}>
                    <Table
                        dataSource={officerInfo}
                        columns={columns}
                        rowKey="id"
                        bordered size='small'  
                    />
                    </Col>
                </Row>
            </Row>

    )
};
export default ListofficerInfo;


