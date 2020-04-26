import React from 'react'

import ReactVirtulizeSearchTable from './components/index'

import './App.css'

const App = () => {

    const demo =     {
        title: '門診紀錄列表',
        columns:  [
            { dataKey: 'name',        width: 100, label: 'name' },
            { dataKey: 'description', width: 100, label: 'description' },
            { dataKey: 'danger',      width: 200, label: '危機值危機值危機值危' },
        ],
        data: [
            { 
                name  : {
                    element     : ( <div>20190423</div> ),
                    searchKey   : '20190423',
                    orderKey    : '20190423'
                }, 
                description: {
                    element     : ( <div>1234</div> ),
                    searchKey   : '12343',
                    orderKey    : 'Software engineer'
                },
                danger: {
                    element     : ( <div>o</div> ),
                    searchKey   : true,
                    orderKey    : 1
                }
            },
            { 
                name  : {
                    element     : ( <div>12343</div> ),
                    searchKey   : '1234',
                    orderKey    : 'Brian Vaughn2'
                }, 
                description: {
                    element     : ( <div>1234</div> ),
                    searchKey   : '1234',
                    orderKey    : 'Software engineer2'
                },
                danger: {
                    element     : ( <div></div> ),
                    searchKey   : false,
                    orderKey    : 0
                }
            },
            { 
                name  : {
                    element     : ( <div>Brian Vaughn3</div> ),
                    searchKey   : 'Brian Vaughn',
                    orderKey    : 'Brian Vaughn'
                }, 
                description: {
                    element     : ( <div>xxxxx</div> ),
                    searchKey   : 'Software engineer3',
                    orderKey    : 'Software engineer3'
                },
                danger: {
                    element     : ( <div></div> ),
                    searchKey   : false,
                    orderKey    : 0
                }
            },
            { 
                name  : {
                    element     : ( <div>Describe555</div> ),
                    searchKey   : 'Describe555',
                    orderKey    : 'Brian Vaughn3'
                }, 
                description: {
                    element     : ( <div>xxxxx</div> ),
                    searchKey   : '555',
                    orderKey    : 'Software engineer3'
                },
                danger: {
                    element     : ( <div></div> ),
                    searchKey   : false,
                    orderKey    : 0
                }
            },
            { 
                name  : {
                    element     : ( <div></div> ),
                    searchKey   : 'Brian Vaughn3',
                    orderKey    : 'Brian Vaughn3'
                }, 
                description: {
                    element     : ( <div>xxxxx</div> ),
                    searchKey   : 'Software engineer3',
                    orderKey    : 'Software engineer3'
                },
                danger: {
                    element     : ( <div></div> ),
                    searchKey   : false,
                    orderKey    : 0
                }
            },
            { 
                name  : {
                    element     : ( <div></div> ),
                    searchKey   : 'Brian Vaughn3',
                    orderKey    : 'Brian Vaughn3'
                }, 
                description: {
                    element     : ( <div>xxxxx</div> ),
                    searchKey   : 'Software engineer3',
                    orderKey    : 'Software engineer3'
                },
                danger: {
                    element     : ( <div></div> ),
                    searchKey   : false,
                    orderKey    : 0
                }
            },
            { 
                name  : {
                    element     : ( <div></div> ),
                    searchKey   : 'Brian Vaughn3',
                    orderKey    : 'Brian Vaughn3'
                }, 
                description: {
                    element     : ( <div>xxxxx</div> ),
                    searchKey   : 'Software engineer3',
                    orderKey    : 'Software engineer3'
                },
                danger: {
                    element     : ( <div></div> ),
                    searchKey   : false,
                    orderKey    : 0
                }
            },
            { 
                name  : {
                    element     : ( <div></div> ),
                    searchKey   : 'Brian Vaughn3',
                    orderKey    : 'Brian Vaughn3'
                }, 
                description: {
                    element     : ( <div>xxxxx</div> ),
                    searchKey   : 'Software engineer3',
                    orderKey    : 'Software engineer3'
                },
                danger: {
                    element     : ( <div></div> ),
                    searchKey   : false,
                    orderKey    : 0
                }
            },
            { 
                name  : {
                    element     : ( <div></div> ),
                    searchKey   : 'Brian Vaughn3',
                    orderKey    : 'Brian Vaughn3'
                }, 
                description: {
                    element     : ( <div>xxxxx</div> ),
                    searchKey   : 'Software engineer3',
                    orderKey    : 'Software engineer3'
                },
                danger: {
                    element     : ( <div></div> ),
                    searchKey   : false,
                    orderKey    : 0
                }
            },
            { 
                name  : {
                    element     : ( <div></div> ),
                    searchKey   : 'Brian Vaughn3',
                    orderKey    : 'Brian Vaughn3'
                }, 
                description: {
                    element     : ( <div>xxxxx</div> ),
                    searchKey   : 'Software engineer3',
                    orderKey    : 'Software engineer3'
                },
                danger: {
                    element     : ( <div></div> ),
                    searchKey   : false,
                    orderKey    : 0
                }
            }
        ]
    }

    return (
        <div style={{ height: '100%' }}>
            <ReactVirtulizeSearchTable {...demo} tableClassName='test' />
        </div>
    )
}

export default App
