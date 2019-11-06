import React from 'react' 
import _ from 'lodash' 

import arrayMove from 'array-move'
import { AutoSizer } from 'react-virtualized'
import { sortableContainer, sortableElement } from 'react-sortable-hoc'
import { defaultTableRowRenderer, Table, Column } from 'react-virtualized'

import 'react-virtualized/styles.css'
import style from './style.module.scss'

const SortableHeader = sortableElement(({children, ...props}) =>
    React.cloneElement(children, props)
)

const SortableHeaderRowRenderer = sortableContainer(
    ({className, columns, style}) => (
        <div className={className} role="row" style={style} >
            {React.Children.map(columns, (column, index) => (
                <SortableHeader index={index}>{column}</SortableHeader>
            ))}
        </div>
    )
)

class VirtulizeTableSearch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            columns: this.props.columns,
            data   : this.props.data,
            filterdData: this.props.data
        }

        this.filterDict = {} // 目前搜尋狀態
        this.orderDict  = {}  // 目前排序狀態
    }


    componentDidUpdate(prevProps) {
        if ( prevProps.data !== this.props.data || prevProps.columns !== this.props.columns ) {
            if ( this.props.data !== this.state.data || this.props.columns !== this.state.columns ) {
                this.setState({
                    columns: this.props.columns,
                    data: this.props.data,
                    filterdData: this.props.data
                })
            }
        }
    }

    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState(({columns}) => ({
            columns: arrayMove(columns, oldIndex, newIndex)
        }))
    }

    filterData = () => {
        let newData = this.state.data

        _.forIn( this.filterDict, ( value, key ) => {
            newData = _.filter( newData, d => {
                const searchString = d[ key ].searchKey
                if ( value === '' ){
                    return true
                } else {
                    if ( searchString === true ) {
                        return true
                    } else if ( searchString === false ) {
                        return false
                    } else {
                        if ( String(searchString).toLowerCase().indexOf(value.toLowerCase()) > -1 ){
                            return true
                        } else {
                            return false
                        }
                    }
                }
            } )
        } )
        this.setState( { 
            filterdData: newData
        } )
    }

    onChangeSearchFilter = ( key ) => {

        return (e) => {
            
            const value = e.target.value 
            this.filterDict[ key ] = value
            this.filterData()
        }
    }

    orderData = (key) => {
        return ()=>{
            let newData = this.state.filterdData.slice()

            if ( !this.orderDict[ key ] ) {
                this.orderDict[ key ] = 'desc'
            } else {
                if( this.orderDict[ key ] === 'desc' ) {
                    this.orderDict[ key ] = 'asc'
                } else {
                    this.orderDict[ key ] = 'desc'
                }
            }
    
            newData = _.orderBy( newData, [ (d)=> (d[ key ].orderKey) ], [ this.orderDict[ key ] ] )

            this.setState( { 
                filterdData: newData
            } )
        }
    }

    // 加工 header 以增加搜尋功能
    headerColumnMaker = (props) => {
        return (
            props.columns.map( (d, idx) => {
                const column = this.state.columns[ idx ]

                let newProps = Object.assign( {}, d.props )

                newProps.className = 'header-column'

                delete newProps.title
                delete newProps.children

                return ( 
                    <div { ...newProps } key = {idx} className = { style.headerTd + ' header-td'}>
                        <div className = 'input-parent' >
                            <input onChange = { this.onChangeSearchFilter( column.dataKey ) } />
                        </div>
                        <div className='label' onClick = { this.orderData( column.dataKey ) } >
                            { column.label }
                        </div>
                    </div> 
                )
            } )
        )
    }

    renderHeaderRow = (params) => {

        const columns = this.headerColumnMaker( params )

        params.columns = columns
        delete params.style.paddingRight
        delete params.style.height
        delete params.className

        return (
            <React.Fragment >
                <SortableHeaderRowRenderer
                    {...params}
                    className = {style.headerRow + ' header-row'}
                    axis      = "x"
                    lockAxis  = "x"
                    onSortEnd = {this.onSortEnd}
                    distance  = {1} 
                />
            </React.Fragment>
        )
    }
  

    rowColumnMaker = (props) => {
        const data  = props.rowData
        return (
            props.columns.map( (d, idx) => {
                const column = this.state.columns[ idx ]

                let newProps = Object.assign( {}, d.props )

                delete newProps.title
                delete newProps.children

                return ( 
                    <div { ...newProps } key = {idx} >
                        { data[ column.dataKey ].element }
                    </div> 
                )
            } )
        )
    }

    rowRenderer = (props) => {
        const columns = this.rowColumnMaker( props )
        props.columns = columns

        return defaultTableRowRenderer(props)
    }

    render() {

        const filterdData = this.state.filterdData

        const columns = this.state.columns

        let widthAverage = false
        columns.forEach( d => {
            if (!d.width) {
                widthAverage = true
            }
        } )

        return (
            <div className = { style.main } >
                <AutoSizer className = { style.autoSizer } style={ { height: '100%', width: '100%' } } >
                {({ height, width }) => {
                    return (
                        <React.Fragment>
                            <div className = { style.tableTitle }  >
                                {this.props.title}
                            </div>
                            <Table
                                width       = { width - 2 }
                                height      = { height - 100 }
                                headerHeight= { 70 }
                                rowHeight   = { 40 }
                                rowCount    = { filterdData.length }
                                rowRenderer = { this.rowRenderer }
                                rowGetter   = { ({ index }) => filterdData[index] }
                                headerRowRenderer = { this.renderHeaderRow }
                                className   = { style.table }
                                style       = {{
                                    borderRadius: '5px'
                                }}
                            >
                                {   columns.map( (d, idx) => (
                                    <Column
                                        { ...d } 
                                        key      = { idx } 
                                        flexGrow = {1}
                                        width    = { widthAverage? 100 : (d.width) }
                                    />
                                ) )}
                            </Table>
                        </React.Fragment>
                    )
                }}
                </AutoSizer>
            </div>
        )
    }
}

VirtulizeTableSearch.defaultProps = {
    title: '門診紀錄列表',
    columns:  [
        { dataKey: 'name',        label: 'name' },
        { dataKey: 'description', label: 'description' },
        { dataKey: 'danger',      label: '危機值危機值危機值危' },
    ],
    data: [
        { 
            name  : {
                element     : ( <div>1234</div> ),
                searchKey   : '12343',
                orderKey    : 'Brian Vaughn1'
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

export default VirtulizeTableSearch  