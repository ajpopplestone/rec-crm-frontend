import React, { Component } from 'react'
// import { observer, inject } from "mobx-react"
import { withApollo } from 'react-apollo'
// import { Carousel, Typography } from 'antd';

import '../../../../node_modules/react-vis/dist/style.css'
// import '../../../node_modules/react-vis/dist/style.css';
// import {XYPlot, VerticalBarSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, RadialChart} from 'react-vis';

// const { Title } = Typography;


class Home extends Component {

    tickFormat(value, index, scale, tickTotal) {
        if(value % 1 === 0) {
            return value
        } else {
            return null
        } 
      }


    render() {
        return (
            <div>Test</div>
        // <div >
        //     {
        //         !this.props.analyticalStore.displayCandByRole && !this.props.analyticalStore.displayBookByRole && 
        //         <Title>Welcome</Title>
        //     }
        //     <Carousel autoplay>
        //     { this.props.analyticalStore.displayCandByRole &&
        //     <div>
        //         <Title level={2}>Candidates by Role</Title>
        //         <XYPlot height={400} width={500} xType="ordinal">
        //             <VerticalGridLines />
        //             <HorizontalGridLines />
        //             <XAxis title={"Candidate Roles"}/>
        //             <YAxis tickFormat={this.tickFormat}/>
        //             <VerticalBarSeries data={this.props.analyticalStore.displayCandByRole} />
        //         </XYPlot>
        //     </div>
        //     }
        //     { this.props.analyticalStore.displayBookByRole &&
        //         <div>
        //             <Title level={2}>Bookings by Role</Title>
        //             <XYPlot height={400} width={500} xType="ordinal">
        //                 <VerticalGridLines />
        //                 <HorizontalGridLines />
        //                 <XAxis title={"Booking Roles"}/>
        //                 <YAxis tickFormat={this.tickFormat}/>
        //                 <VerticalBarSeries data={this.props.analyticalStore.displayBookByRole} />
        //             </XYPlot>
        //         </div>
        //         }
        //     </Carousel>
        // </div>
        );
      }
}

export default withApollo(Home)