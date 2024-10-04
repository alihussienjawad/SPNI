

import {useCallback, useEffect, useState } from "react";
 
 
import {     ManageMinistryList,    OfficerList,    SpiAttitudeDto, YearList  } from "../../Interfaces/GeneralInterface";
import { CheckOutlined, CloseOutlined, DeleteFilled, DeleteOutlined, EditFilled, EditOutlined,   PlusOutlined } from "@ant-design/icons";
 
import Button from "antd/es/button/button";
import { Col, Row } from "react-bootstrap";
import { Select, Space, Switch, Table, Form, TableColumnsType, Tooltip } from "antd";
import axios from "../../api";
import Delete from "./Delete";
import { AppDispatch, RootState } from "../../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../../app/reducers/modalSlice";
import CreateUpdate from "./createUpdate";
import { SetError } from "../../../app/reducers/craudSlice";
import Trutht from "./Trutht";
import { RULES } from "../../Interfaces/roles";
import { useTranslation } from "react-i18next";
import { DataIndex, DataIndexValue } from "../../Interfaces/functions";

 


 
const ListspiAttitude = () => {
    const [spiAttitude, SetspiAttitude] = useState<SpiAttitudeDto[]>();
   

    const { t } = useTranslation();
    const [mangeministry, setMangeMinistry] = useState<ManageMinistryList[]>([]);
 
    const [officer, setOfficer] = useState<OfficerList[]>([]);
    const { postState } = useSelector((state:RootState) => state.modal);
    const { arlang ,dir } = useSelector((state:RootState) => state.setting);
  
    const { userRoles } = useSelector((state: RootState) => state.auth.loginResponse);
   

   
    //const User: boolean = userRoles?.includes(RULES.User);
    const Musadaqa: boolean = userRoles?.includes(RULES.Musadaqa);
    
    
       
    const [ch, setCh] = useState<boolean>(false);
    const [chMujmal, setChMujmal] = useState<boolean>(false);
    const [year, setyear] = useState<number>(0);
    const [years, setyears] = useState<YearList[]>();
    
    const dispatch = useDispatch<AppDispatch>();


    const GetOfficerList =useCallback( () => {
        axios.get('SpiAttitudes/GetOfficerList')
            .then(res => {
                arlang ? setOfficer(res.data)
                    : setOfficer(res.data.map((i: OfficerList) => {
                        return {
                            label: i.labelEn,
                            value: i.value
                        } as OfficerList
                    }))

            })
    },[arlang])
    const GetManageMinistryList = useCallback(() => {
        axios.get('SpiAttitudes/GetManageMinistryListWithUser')
            .then(res => {
                arlang ? setMangeMinistry(res.data)
                    : setMangeMinistry(res.data.map((i: ManageMinistryList) => {
                        return {
                            label: i.labelEn,
                            value: i.value
                        } as ManageMinistryList
                    }))

            })
    }, [arlang]);
    useEffect(() => {
        GetYearList(ch);
    }, [ch])

    useEffect(() => {
        axios.get(`/SpiAttitudes?Nch=${ch}&Nyear=${year}&Mujmal=${chMujmal}`)
            .then(res =>  
            
                SetspiAttitude(res.data)
            );
        
    }, [ch, postState, year, chMujmal]);
  

 
    useEffect(() => {
        GetOfficerList()
        GetManageMinistryList()
    }, [postState, GetOfficerList, GetManageMinistryList]);

  
 
    const GetYearList = (ch: boolean) => {
        axios.get(`SpiAttitudes/GetYearList?Nch=${ch}`).then(res => setyears(res.data))
    }
   
    
    const ChChange1 = (e: boolean) => {
        setCh(e);
        setChMujmal(false)

        }  
         
    
    const ChMujmalChange = (e: boolean) => {
        setChMujmal(e);

    }
    const YearChange = (e:number) => {
 
       setyear(e);

    }

    const addSpniAttitude = () => {
        dispatch(SetError())
        dispatch(setModal({
            isOpen: true, content: <CreateUpdate officers={officer} manageministrys={mangeministry} record={{ id: 0, year: new Date().getFullYear() } as SpiAttitudeDto}   />, Width: 1300, title: "اضافة جديد" }))
    };

    const deleteSpniAttitude = (row: SpiAttitudeDto) => {
        dispatch(SetError())
        dispatch(setModal({ modalIcon: <DeleteOutlined style={{ color: 'red' }} />, isOpen: true, content: <Delete  {...row} />, Width: 600, title: " حذف" })
        )
    };

    const updateSpniAttitude = (row: SpiAttitudeDto) => {
        dispatch(SetError())
        dispatch(setModal({ modalIcon: <EditOutlined style={{ color: 'green' }} />, isOpen: true, content: <CreateUpdate   officers={officer} manageministrys={mangeministry} record={row}  />, Width: 1300, title: " تعديل" })
        )
    };
    
        const TruthSpniAttitude = (row: SpiAttitudeDto) => {
         !row.isTrue ?
                dispatch(setModal({ modalIcon: <CheckOutlined style={{ color: 'green' }} />, isOpen: true, content: <Trutht officers={officer} manageministrys={mangeministry} record={row} />, Width: 600, title: " مصادقة" }))
                :
                dispatch(setModal({ modalIcon: <CloseOutlined style={{ color: 'red' }} />, isOpen: true, content: <Trutht officers={officer} manageministrys={mangeministry} record={row} />, Width: 600, title: " الغاء المصادقة" }))
           
        }; 
 
   
    const columns: TableColumnsType<SpiAttitudeDto> = [
        {
            title:t("order") ,
            dataIndex: 'id1',
            width:200
        },
        {
            title: 'id',
            dataIndex: 'id',
            hidden:true
        },
   
        {
            title: t("targetName"),
            dataIndex: DataIndex(arlang,'targetName'),
            width: 400,
            render: (_: number, record: SpiAttitudeDto) => (
                record.targetScorr < record.rateComplete ? <span>{DataIndexValue(arlang,"targetName", record)}</span> : <mark>{DataIndexValue(arlang,"targetName", record)}</mark>
            )
        },

     

        {
            title: t("modpresentatives"),
            dataIndex: 'manageMinistryName',
            render: (_: number, record: SpiAttitudeDto) => {
                if (record.mujmal) {
                    const S = record.manageMinistryName.split("\n");
                    return S.map(item => <div key={Math.random()} className="d-flex justify-content-center" style={{ minWidth: '150px' }}>{item}</div>
                    )
                }
                else
                    return <p style={{ minWidth: '150px' }}>{ record.manageMinistryName }</p>
            },
            width: 200,
        },
        {
            title: t("nmpresentatives"),
            dataIndex: 'officerName',
            width: 300,
        },
  
        {
            title: t("actionTaken"),
            dataIndex: DataIndex(arlang,"actionTaken"),
            render: (_: number, record: SpiAttitudeDto) => {
                if (record.mujmal) {
                    const S = DataIndexValue(arlang,"actionTaken", record).split("\n");
                   
                    return S.map((item:string) => <div key={Math.random()}  className="d-flex justify-content-center" style={{ minWidth: '150px' }}>{item}</div>)
                     
                }
                else
return <p style={{ minWidth: '150px' }}>{DataIndexValue(arlang,"actionTaken", record)}</p>
            }
        },
        {
            title: t("follow"),
            dataIndex: DataIndex(arlang,"follow"),
            render: (_: number, record: SpiAttitudeDto) => {
                if (record.mujmal) {
                    const S = DataIndexValue(arlang,"follow", record).split("\n");
                    return S.map((item: string) => <div key={Math.random()} className="d-flex justify-content-center" style={{ minWidth: '150px' }}>{item}</div>
                    )
                }
                else
                    return <p style={{ minWidth: '150px' }}>{DataIndexValue(arlang,"follow", record)}</p>
            }
        },
        {
            title: `${t("timings")}`,
            
            children: [


                {
                    title: t("form"),
                    dataIndex: 'startDateToComplete',
                    width: 400,
                    render: (_: number, record: SpiAttitudeDto) => record.startDateToComplete.toString().split('T')[0],
                     
                },
                {
                    title: t("to"),
                    dataIndex: 'endDateToComplete',
                    width: 400,
                    render: (_: number, record: SpiAttitudeDto) => record.endDateToComplete.toString().split('T')[0],
                    
                },]
        },

        {
            title:t("suggistions"),
        dataIndex: DataIndex(arlang,'suggistion'),
            render: (_: number, record: SpiAttitudeDto) => {
                if (record.mujmal) {
                    const S = DataIndexValue(arlang,"suggistion", record).split("\n");
                    return S.map((item: string) => <div key={Math.random()}  className="d-flex justify-content-center" style={{ minWidth: '150px' }}>{item}</div>
                    )
                }
                else
                    return <p style={{ minWidth: '150px' }}>{DataIndexValue(arlang,"suggistion", record)}</p>
            }
        },
        {
            title: t("targetScorr"),
            dataIndex: 'targetScorr',
        
        }, {
            title: t("rateComplete"),
            dataIndex: 'rateComplete',
        
        },
        {
            title:t("resolution"),
        dataIndex: DataIndex(arlang,'resolution'),
            render: (_: number, record: SpiAttitudeDto) => {
                if (record.mujmal) {
                    const S = DataIndexValue(arlang,"resolution", record).split("\n");
                    return S.map((item: string) => <div key={Math.random()}  className="d-flex justify-content-center" style={{ minWidth: '150px' }}>{item}</div>
                    )
                }
                else
                    return <p style={{ minWidth: '150px' }}>{DataIndexValue(arlang,"resolution", record)}</p>
            }
        },
        {
            title: t("actions"),
            key: 'SpiAttitudeDto',
            render: (_: number, record: SpiAttitudeDto) => (

                <Space size="middle" dir={ dir}>

                    <Tooltip placement="top" title={t('edit')} color={'green'}>
                        {!record.isTrue && <Button onClick={() => updateSpniAttitude(record)} className="btn-border-edit"><EditFilled className="edit-icon" /></Button>}
                    </Tooltip>
                    <Tooltip placement="top" title={!record.isTrue ? t("truth") : t("untruth")} color={!record.isTrue ? 'cyan' : 'volcano'}>


                        {
                            Musadaqa ? !record.isTrue ?
                                <Button onClick={() => TruthSpniAttitude(record)} className="btn-border-edit"><CheckOutlined className="edit-icon text-success" /></Button>
                                : <Button onClick={() => TruthSpniAttitude(record)} className="btn-border-edit"><CloseOutlined className="edit-icon text-danger" /></Button>
                                : null
                        }


                    </Tooltip>
                    <Tooltip placement="top" title={t('delete')} color={'red'}>
                        {!record.isTrue && <Button onClick={() => deleteSpniAttitude(record)} className="btn-border-delet"><DeleteFilled className="delete-icon" /></Button>}
                    </Tooltip>
                </Space>
            ),
            width: 150,
            fixed: 'left',
        },


    ];
    const expandedRowRender = (s: SpiAttitudeDto) => {
        const subcolumns: TableColumnsType<SpiAttitudeDto> = [
            {
                title: t("order"),
                dataIndex: 'id1',
                render: (_: number, record: SpiAttitudeDto) => <span dir={ dir}> {s.id1} -  {record.id1}</span>,
                width:300,
            },
            {
                title: 'id',
                dataIndex: 'id',
                hidden: true
            },

            {
                title: t("targetName"),
                dataIndex: 'targetName',
                width: 400,
                render: (_: number, record: SpiAttitudeDto) => (
                    record.targetScorr < record.rateComplete ? <span>{DataIndexValue(arlang,"targetName", record)}</span> : <mark>{DataIndexValue(arlang,"targetName", record)}</mark>
                )
            },



            {
                title: t("modpresentatives"),
                dataIndex: 'manageMinistryName',
                render: (_: number, record: SpiAttitudeDto) => {
                    if (record.mujmal) {
                        const S = record.manageMinistryName.split("\n");
                        return S.map(item => <div key={Math.random()} className="d-flex justify-content-center" style={{ minWidth: '150px' }}>{item}</div>
                        )
                    }
                    else
                        return <p style={{ minWidth: '150px' }}>{record.manageMinistryName}</p>
                },
                width: 300,
            },
            {
                title: t("nmpresentatives"),
                dataIndex: 'officerName',
                width: 300,
            },

            {
                title: t("actionTaken"),
                dataIndex: DataIndex(arlang,"actionTaken"),
                render: (_: number, record: SpiAttitudeDto) => {
                    if (record.mujmal) {
                        const S = DataIndexValue(arlang,"actionTaken", record).split("\n");

                        return S.map((item: string) => <div key={Math.random()} className="d-flex justify-content-center" style={{ minWidth: '150px' }}>{item}</div>
                        )
                    }
                    else
                        return <p style={{ minWidth: '150px' }}>{DataIndexValue(arlang,"actionTaken", record)}</p>
                }
            },
            {
                title: t("follow"),
                dataIndex: DataIndex(arlang,"follow"),
                render: (_: number, record: SpiAttitudeDto) => {
                    if (record.mujmal) {
                        const S = DataIndexValue(arlang,"follow", record).split("\n");
                        return S.map((item: string) => <div key={Math.random()} className="d-flex justify-content-center" style={{ minWidth: '150px' }}>{item}</div>
                        )
                    }
                    else
                        return <p style={{ minWidth: '150px' }}>{DataIndexValue(arlang,"follow", record)}</p>
                }
            },
            {
                title: t("timings"),

                children: [


                    {
                        title: `${t("form")}`,
                        dataIndex: 'startDateToComplete',
                        width: 200,
                        render: (_: number, record: SpiAttitudeDto) => record.startDateToComplete.toString().split('T')[0],

                    },
                    {
                        title: t("to"),
                        dataIndex: 'endDateToComplete',
                        width: 200,
                        render: (_: number, record: SpiAttitudeDto) => record.endDateToComplete.toString().split('T')[0],

                    },]
            },

            {
                title: t("suggistions"),
                dataIndex: DataIndex(arlang,'suggistion'),
                render: (_: number, record: SpiAttitudeDto) => {
                    if (record.mujmal) {
                        const S = DataIndexValue(arlang,"suggistion", record).split("\n");
                        return S.map((item: string) => <div key={Math.random()} className="d-flex justify-content-center" style={{ minWidth: '150px' }}>{item}</div>
                        )
                    }
                    else
                        return <p style={{ minWidth: '150px' }}>{DataIndexValue(arlang,"suggistion", record)}</p>
                }
            },
            {
                title: t("targetScorr"),
                dataIndex: 'targetScorr',

            }, {
                title: t("rateComplete"),
                dataIndex: 'rateComplete',

            },
            {
                title: t("resolution"),
                dataIndex: DataIndex(arlang,'resolution'),
                render: (_: number, record: SpiAttitudeDto) => {
                    if (record.mujmal) {
                        const S = DataIndexValue(arlang,"resolution", record).split("\n");
                        return S.map((item: string) => <div key={Math.random()} className="d-flex justify-content-center" style={{ minWidth: '150px' }}>{item}</div>
                        )
                    }
                    else
                        return <p style={{ minWidth: '150px' }}>{DataIndexValue(arlang,"resolution", record)}</p>
                }
            },
            {
                title: t("actions"),
                key: 'SpiAttitudeDto',
                render: (_: number, record: SpiAttitudeDto) => (

                    <Space size="middle" dir={dir }>

                        <Tooltip placement="top" title={t('edit')} color={'green'}>
                            {!record.isTrue && <Button onClick={() => updateSpniAttitude(record)} className="btn-border-edit"><EditFilled className="edit-icon" /></Button>}
                        </Tooltip>
                        <Tooltip placement="top" title={!record.isTrue ?t("truth") :t("untruth") } color={!record.isTrue ? 'cyan' : 'volcano'}>


                            {
                                Musadaqa ? !record.isTrue ?
                                    <Button onClick={() => TruthSpniAttitude(record)} className="btn-border-edit"><CheckOutlined className="edit-icon text-success" /></Button>
                                    : <Button onClick={() => TruthSpniAttitude(record)} className="btn-border-edit"><CloseOutlined className="edit-icon text-danger" /></Button>
                                    : null
                            }


                        </Tooltip>
                        <Tooltip placement="top" title={t('delete')} color={'red'}>
                            {!record.isTrue && <Button onClick={() => deleteSpniAttitude(record)} className="btn-border-delet"><DeleteFilled className="delete-icon" /></Button>}
                        </Tooltip>
                    </Space>
                ),
                width: 150,
                fixed: 'left',
            },


        ];
        return (
            <>
            <div dir={dir}>
                <p className="text-success w-100 d-flex justify-content-start"  > {t("subgoalsof")} ({arlang ? s.targetName : s.targetNameEn}) </p>
                
                <Table
                     
                    className="sub-targets"
                    columns={subcolumns}
                    rowClassName="sub-targets"
                    dataSource={s.subSpiAttitude}
                    pagination={false }
                    bordered
                    rowKey="id"
                    showHeader={false}
                    style={{ marginRight: '-0px' }}
                    />
                </div>
                </>)
    }

    return (
   
        <>

            <Row className="sticky-top box-sh" style={{ zIndex: 3 }}>
                <Col className="p-0 m-0">
                    <Form.Item
                        hasFeedback
                        validateTrigger="onBlur"
                        layout="vertical"
                    >
                        <Switch onChange={ChChange1} checkedChildren= {`${t("commongoals")}`} unCheckedChildren={`${t("uncommongoals")}`} />
                    </Form.Item>
                </Col>
                <Col className="p-0 m-0">
                    {ch && <Col>
                        <Form.Item
                            hasFeedback
                            layout="vertical"
                            validateTrigger="onBlur"

                            
                        >
                            <Switch onChange={ChMujmalChange} checkedChildren={`${t("overallcommongoals")}`} unCheckedChildren={`${t("unoverallcommongoals")}`} />
                        </Form.Item>
                    </Col>
                    }
                </Col>
                <Col className="p-0 m-0">
                    <Form.Item
                        validateTrigger="onBlur"
                        layout="vertical"
                      
                        
                    >
                        <Select options={years} onChange={YearChange} placeholder={t('year')} />
                    </Form.Item>



                </Col>

                
                    <Space className="w-100 " size='small'
                    style={{ display: 'felx', justifyContent: 'space-between',marginTop: '-20px' }}  >
                    <h6 className="text-muted">{t('targetfollow')}</h6>
                    <Button
                        ghost={false}
                        iconPosition={"end"} 
                        shape="default"
                        size="small"
                        type="primary"
                        onClick={addSpniAttitude}  >
                        <span> {t('add')}</span>
                            <PlusOutlined />
                        </Button>

                    </Space>
               

            
            </Row>
          
            <Row className="mt-3" style={{ marginBottom: '200px', overflowX: 'auto' }}>
                <Col span={24}>
                    <Table 
                       
                        size="small"
                        bordered
                    
                        dataSource={spiAttitude}
                        columns={columns}
                        rowKey="id"
                        expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0']}}
                    />
                </Col>
            </Row>

        </>
    )
};
export default ListspiAttitude;


