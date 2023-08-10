import React, { Component } from 'react'
import { Col, Row, Card, Tabs, Timeline } from 'antd';
import * as echarts from 'echarts';

export default class Index extends Component {
    state = {
        xDate: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        yDate: [120, 200, 150, 80, 70, 110, 130],
        timelist:[
            {content: 'BB 吃饱了', 
            time: '2015-09-01',
            color: 'green'},
            {content: 'BB 睡好了', 
            time: '2016-09-01',
            color: 'red'},
            {content: 'BB 很开心', 
            time: '2021-09-01',
            color: 'blue'},
            {content: 'BB 大天才', 
            time: '2022-09-01',
            color: 'orange'},
        ]
    }
    
    drawBar = ()=>{
        var myChart = echarts.init(this.barRef);
        myChart.setOption({
                xAxis: {
                    type: 'category',
                    data: this.state.xDate
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                    data: this.state.yDate,
                    type: 'bar'
                    }
                ]
            });
    }

    drawLine = ()=>{
        var myChart = echarts.init(this.lineRef);
        myChart.setOption({
            color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
            title: {
              text: 'Gradient Stacked Area Chart'
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                label: {
                  backgroundColor: '#6a7985'
                }
              }
            },
            legend: {
              data: ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5']
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [
              {
                type: 'category',
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
              }
            ],
            yAxis: [
              {
                type: 'value'
              }
            ],
            series: [
              {
                name: 'Line 1',
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                  width: 0
                },
                showSymbol: false,
                areaStyle: {
                  opacity: 0.8,
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: 'rgb(128, 255, 165)'
                    },
                    {
                      offset: 1,
                      color: 'rgb(1, 191, 236)'
                    }
                  ])
                },
                emphasis: {
                  focus: 'series'
                },
                data: [140, 232, 101, 264, 90, 340, 250]
              },
              {
                name: 'Line 2',
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                  width: 0
                },
                showSymbol: false,
                areaStyle: {
                  opacity: 0.8,
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: 'rgb(0, 221, 255)'
                    },
                    {
                      offset: 1,
                      color: 'rgb(77, 119, 255)'
                    }
                  ])
                },
                emphasis: {
                  focus: 'series'
                },
                data: [120, 282, 111, 234, 220, 340, 310]
              },
              {
                name: 'Line 3',
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                  width: 0
                },
                showSymbol: false,
                areaStyle: {
                  opacity: 0.8,
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: 'rgb(55, 162, 255)'
                    },
                    {
                      offset: 1,
                      color: 'rgb(116, 21, 219)'
                    }
                  ])
                },
                emphasis: {
                  focus: 'series'
                },
                data: [320, 132, 201, 334, 190, 130, 220]
              },
              {
                name: 'Line 4',
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                  width: 0
                },
                showSymbol: false,
                areaStyle: {
                  opacity: 0.8,
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: 'rgb(255, 0, 135)'
                    },
                    {
                      offset: 1,
                      color: 'rgb(135, 0, 157)'
                    }
                  ])
                },
                emphasis: {
                  focus: 'series'
                },
                data: [220, 402, 231, 134, 190, 230, 120]
              },
              {
                name: 'Line 5',
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                  width: 0
                },
                showSymbol: false,
                label: {
                  show: true,
                  position: 'top'
                },
                areaStyle: {
                  opacity: 0.8,
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: 'rgb(255, 191, 0)'
                    },
                    {
                      offset: 1,
                      color: 'rgb(224, 62, 76)'
                    }
                  ])
                },
                emphasis: {
                  focus: 'series'
                },
                data: [220, 302, 181, 234, 210, 290, 150]
              }
            ]
    })
}

    drawPie = ()=>{
        var myChart = echarts.init(this.pieRef);
        myChart.setOption({
            legend: {
                top: 'bottom'
              },
              toolbox: {
                show: true,
                feature: {
                  mark: { show: true },
                  dataView: { show: true, readOnly: false },
                  restore: { show: true },
                  saveAsImage: { show: true }
                }
              },
              series: [
                {
                  name: 'Nightingale Chart',
                  type: 'pie',
                  radius: [10, 150],
                  center: ['50%', '50%'],
                  roseType: 'area',
                  itemStyle: {
                    borderRadius: 8
                  },
                  data: [
                    { value: 40, name: 'rose 1' },
                    { value: 38, name: 'rose 2' },
                    { value: 32, name: 'rose 3' },
                    { value: 30, name: 'rose 4' },
                    { value: 28, name: 'rose 5' },
                    { value: 26, name: 'rose 6' },
                    { value: 22, name: 'rose 7' },
                    { value: 18, name: 'rose 8' }
                  ]
                }
              ]
            });
    }

    componentDidMount(){
        // this.drawBar(); 
        this.drawLine();
        //如何画第二个切换的Tab图
        this.drawPie();
    }

    //Tabs切换的dom是lazy加载的，所以需要forceRender='true'，否则无法找到dom实例，tab切换用onChange，activeKey
    /*
      这里的关键点是，当你写 onChange={this.callback} 时，你实际上是在告诉 React：当 onChange 事件发生时，
      调用 this.callback 函数。而当这个事件真正发生时，React 或其他库/组件会自动将某些参数传递给这个回调函数。
      例如，如果你使用的是一个常见的 UI 库或组件库（如 Ant Design、Material-UI 等），
      那么它们的组件可能已经定义了当 onChange 事件发生时应该传递什么参数。在很多情况下，
      这些参数通常是与该事件相关的信息，如事件对象、当前的值或其他相关数据。
      在你的例子中，activeKey 很可能是由触发 onChange 事件的组件自动传递的。
      你的 callback 函数定义了一个名为 activeKey 的参数来接收这个传递的值。
    */
    callback=(activeKey)=>{
        if(activeKey==='2'){
            console.log('2');
            //echart渲染比dom实例快所以没有办法找到dom实例,异步渲染慢于dom实例
            setTimeout(()=>{this.drawBar()}, 0);
        }
    }

    render() {
        return (
            <div>
                <Row>
                    <Col span={6}>
                        <Card style={{width: 300, marginLeft: 5}}>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card style={{width: 300, marginLeft: 5}}>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card style={{width: 300, marginLeft: 5}}>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card style={{width: 300, marginLeft: 5}}>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                        </Card>
                    </Col>

                </Row>
                <Row style={{marginTop: 5}}>
                    <Col span={24}>
                        <Card style={{width: 1215, marginLeft: 5}}>
                        <Tabs defaultActiveKey="1" onChange={this.callback}>
                            <Tabs.TabPane tab="销售额" key="1" >
                                <Row>
                                    <Col span={16}>
                                        <div style={{height:"300px"}} ref={a=>this.lineRef=a}>
                                        </div>
                                    </Col>
                                    <Col span={8}></Col>
                                </Row>
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="访问量" key="2" forceRender='true'>
                            <Row>
                                <Col span={16}>
                                    <div style={{height:"300px"}} ref={a=>this.barRef=a}>
                                    </div>
                                </Col>
                                <Col span={8}></Col>
                            </Row>
                            </Tabs.TabPane>
                        </Tabs>
                        </Card>
                    </Col>
                </Row>
                <Row style={{marginTop: 5}}>
                    <Col span={12}>
                        <Card style={{width: 605, marginLeft: 5}}>
                            <div style={{height:"300px"}}>
                                <Timeline mode="alternate" style={{overflow:'auto'}}>
                                    {this.state.timelist.map((item,index)=>{
                                        return (
                                            <Timeline.Item style={{
                                                fontSize: '12px',
                                                lineHeight: '20px',
                                                marginTop:'10px'
                                              }} color={item.color} key={index}>
                                                <p>{item.content}</p>
                                                <p>{item.time}</p>
                                            </Timeline.Item>
                                        )
                                    })}
                                </Timeline>
                            </div>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card style={{width: 605, marginLeft: 5}}>
                            <div  style={{height:"300px", overflow:"auto"}} ref={a=>this.pieRef=a}>
                            </div>
                        </Card>
                    </Col>
                    <Col span={6}></Col>
                </Row>
            </div>
        )
    }
}
