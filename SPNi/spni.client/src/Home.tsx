 
import {  Card, Carousel,   Col,   Row, } from 'antd';
import Marquee from 'react-fast-marquee';
 
 
 
import { useEffect, useState } from 'react';
 
import {    Images, NewsDto } from './Interfaces/GeneralInterface';
import axios from '../src/api';
 
import { Link,   } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { DataIndexValue } from './Interfaces/functions';
import { useTranslation } from 'react-i18next';



 
const Home = () => {
    const [Image, SetImages] = useState<Images[]>();
    const [newss, SetNewss] = useState<NewsDto[]>();
    const { arlang } = useSelector((state: RootState) => state.setting);
    const { t } = useTranslation();
    useEffect(() => {
        axios.get("/News/GetAllNews")
            .then(res =>
                SetNewss(res.data));
    }, []);
   

    useEffect(() => {
        axios.get("/Images").then(res => { SetImages(res.data) })
         
    }, [])
     

    return (


 <>
              
        <Carousel autoplay className="c-img-container "   >
                    {Image?.map(i =>
                         <img src={`${i.imageFileName}`} className="c-img" key={ i.id} />
                      )}
           
            </Carousel>
            <Row className="sticky-top box-sh mt-3" >
                <Marquee speed={70} gradient={false} pauseOnHover={true} style={arlang ? { direction: 'rtl' } : {direction:'ltr'}} direction={arlang?"right":"left"}>
            {newss?.map(i => i.can ?
                        <p key={i.id} className="mt-3">
                    <span className="news-span news-title"> {DataIndexValue(arlang, "applicationUserId", i)} </span>
                    <span className="news-span news-content"> {DataIndexValue(arlang,"details",i)}           </span>
                            <span className="news-span news-logo">  <img src="/Raj1.png" alt="logo" /> </span>
                        </p>
                                : null)
            }
                </Marquee>
            </Row >

            <div>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}  >
                    <Col className="col-sm-12 col-md-6 col-lg-4 mt-2">
                       
                            <Link to="/ListspiAttitude"  >
                            <Card style={{ backgroundColor: "#9DAB86" }} hoverable={true} title={t('targetfollow')} > </Card>
                            </Link>
                        
                    </Col>
                    <Col className="col-sm-12 col-md-6 col-lg-4 mt-2">
                       
                            <Link to="/ListTarget"  >
                            <Card style={{ backgroundColor: "#D8C292" }} hoverable={true} title={t('targets')}  >
                            </Card>
                            </Link>
                   
                    </Col>
                    <Col className="col-sm-12 col-md-6 col-lg-4 mt-2">
                       
                        <Link to="/ListofficerInfo"  >
                            <Card style={{ backgroundColor: "#84D2C5" }} hoverable={true} title={t('nmpresentatives') }  >  </Card>
                        </Link>
                      
                    </Col>
                    <Col className="col-sm-12 col-md-6 col-lg-4 mt-2">
                      
                        <Link to="/ListSubMangeMinistry"  >
                            <Card style={{ backgroundColor: "steelblue" }} hoverable={true} title={t('modpresentatives') }  >    </Card>

                        </Link>
                
                </Col>
          
                    <Col className="col-sm-12 col-md-6 col-lg-4 mt-2">
                       
                        <Link to="/ListSpniUnit"  >
                            <Card style={{ backgroundColor: "#804674" }} hoverable={true} title={t('commonunitsinthesystem') }  >
                            </Card>
                        </Link>
                 
                </Col>
                    <Col className="col-sm-12 col-md-6 col-lg-4 mt-2">
                       
                        <Link to="/ListISpniPdf"  >
                            <Card hoverable={true} style={{ backgroundColor: "lightblue" }} title={t('sustainingcontexts') }  >    </Card>
                        </Link>
                
                </Col>
                    <Col className="col-sm-12 col-md-6 col-lg-4 mt-2">
                       
                        <Link to="/ListImage"  >
                            <Card hoverable={true} style={{ backgroundColor: "#795757", }} title={t('maintainthephotogallery') }  >   </Card>
                        </Link>
                 
                </Col>
                    <Col className="col-sm-12 col-md-6 col-lg-4 mt-2">
                       
                        <Link to="/ListNews"  >
                            <Card hoverable={true} style={{ backgroundColor: "#A94438" }} title={t('maintainnotifications') }  >  </Card>
                        </Link>
                  
                </Col>
                    <Col className="col-sm-12 col-md-6 col-lg-4 mt-2">

                        <Link to="/ListImage"  >
                            <Card hoverable={true} style={{ backgroundColor: "#795757", }} title={t('assignunitobjectives') }  >   </Card>
                        </Link>

                    </Col>
            </Row>
            </div>


            
          
       
        </> 

    )
};
export default Home;