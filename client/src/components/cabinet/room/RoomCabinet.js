import React from 'react';
import './RoomCabinet.css';
import {Collapse, Card, Form, Breadcrumb} from 'bootstrap-4-react';
import {Link} from "react-router-dom";

const RoomCabinet = () => {
    return (
        <div className="rooms-cabinet">
            <div className="serve-info">
                <nav aria-label="breadcrumb">
                    <Breadcrumb>
                        <Breadcrumb.Item><Link to="/cabinet">Cabinet</Link></Breadcrumb.Item>
                        <Breadcrumb.Item active aria-current="page">Create room</Breadcrumb.Item>
                    </Breadcrumb>
                </nav>

                <div id="accordionExample">
                <Card>
                    <Card.Header mb="0">
                        <Collapse.Button link target="#collapseOne" id="headingOne" aria-expanded="true">
                            Read regulations
                        </Collapse.Button>
                    </Card.Header>
                    <Collapse id="collapseOne" aria-labelledby="headingOne" data-parent="#accordionExample">
                        <Card.Body>
                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                        </Card.Body>
                    </Collapse>
                </Card>
                </div>
            </div>
            <div className="work-block">
                <div className="first-player">
                    <div>
                        1
                    </div>
                </div>
                <div className="center-area">
                    <div className="center-area-top">
                        <div className="center-area-top-left">
                            <div>
                                2
                            </div>
                        </div>
                        <div className="center-area-top-right">
                            <div>
                                3
                            </div>
                        </div>
                    </div>
                    <div className="center-area-center">
                        <div className="main-chat">

                        </div>
                    </div>
                    <div className="center-area-bottom">
                        <div className="center-area-bottom-left">
                            <div>
                                6
                            </div>
                        </div>
                        <div className="center-area-bottom-right">
                            <div>
                                5
                            </div>
                        </div>
                    </div>
                </div>
                <div className="fourth-player">
                    <div>
                        4
                    </div>
                </div>
            </div>
            <div className="input-block">
                <Form.Input type="text" id="text" placeholder="Enter text" />
            </div>
        </div>
    )
}

export default RoomCabinet;