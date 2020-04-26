import React from 'react' 
import _ from 'lodash' 
import PropTypes from 'prop-types'

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

const ReactVirtualizedSearchTable = (props) => {
    
    const [ columns, columnsSet ]           = React.useState(props.columns)
    const [ data,    dataSet    ]           = React.useState(props.data)
    const [ filteredData, filteredDataSet ] = React.useState(props.data)
    
    let filterDict = {} // 目前搜尋狀態
    let orderDict  = {} // 目前排序狀態

    React.useEffect( ()=>{
        columnsSet(props.columns)
        dataSet(props.data)
        filteredDataSet(props.data)
    }, [ props.data, props.columns ] )

    const onSortEnd = ({oldIndex, newIndex}) => {
        columnsSet( arrayMove(columns, oldIndex, newIndex) )
    }

    const filterData = () => {
        let newData = data.slice()

        _.forIn( filterDict, ( value, key ) => {
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
        filteredDataSet(newData)
    }

    const onChangeSearchFilter = ( key ) => {
        return (e) => {
            const value = e.target.value 
            filterDict[ key ] = value
            filterData()
        }
    }

    const orderData = (key) => {
        return ()=>{
            let newData = filteredData.slice()

            if ( !orderDict[ key ] ) {
                orderDict[ key ] = 'desc'
            } else {
                if( orderDict[ key ] === 'desc' ) {
                    orderDict[ key ] = 'asc'
                } else {
                    orderDict[ key ] = 'desc'
                }
            }
    
            newData = _.orderBy( newData, [ (d)=> (d[ key ].orderKey) ], [ orderDict[ key ] ] )

            filteredDataSet(newData)
        }
    }

    // 加工 header 以增加搜尋功能
    const headerColumnMaker = (param) => {
        return (
            param.columns.map( (d, idx) => {
                const column = columns[ idx ]

                let newProps = Object.assign( {}, d.props )

                newProps.className = 'header-column'

                delete newProps.title
                delete newProps.children

                return ( 
                    <div { ...newProps } key = {idx} className = { style.headerTd + ' header-td'}>
                        <div className = 'input-parent' >
                            <input onChange = { onChangeSearchFilter( column.dataKey ) } />
                        </div>
                        <div className='label' onClick = { orderData( column.dataKey ) } >
                            { column.label }
                        </div>
                    </div> 
                )
            } )
        )
    }

    const renderHeaderRow = (params) => {

        const newColumns = headerColumnMaker( params )

        params.columns = newColumns
        delete params.style.paddingRight
        delete params.style.height
        delete params.className

        return (
            <React.Fragment >
                <SortableHeaderRowRenderer
                    {...params}
                    className = {style.headerRow + (props.headerClassName? (' ' + props.headerClassName): '' )  }
                    axis      = "x"
                    lockAxis  = "x"
                    onSortEnd = {onSortEnd}
                    distance  = {1} 
                />
            </React.Fragment>
        )
    }

    const rowColumnMaker = (props) => {
        const data  = props.rowData
        return (
            props.columns.map( (d, idx) => {
                const column = columns[ idx ]

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

    const rowRenderer = (props) => {
        const columns = rowColumnMaker( props )
        props.columns = columns
        props.className += (' ' + style.tableRow)

        if(props.rowClassName){
            props.className += (' ' + props.rowClassName)
        }

        return defaultTableRowRenderer(props)
    }

    let widthAverage = false

    columns.forEach( d => {
        if (!d.width) {
            widthAverage = true
        }
    } )

    const minWidth = columns.length * 80

    return (
        <div className = { style.main } style = {{ minWidth: minWidth }} >
            <AutoSizer className = { style.autoSizer } style={ { height: '100%', width: '100%' } } >
            {({ height, width }) => {
                return (
                    <React.Fragment>
                        { props.title &&
                            <div className = { typeof props.title === 'object'? '' : style.tableTitle }  >
                                {props.title}
                            </div>
                        } 
                        <Table
                            width       = { width - 2 }
                            height      = { height - 100 }
                            headerHeight= { 70 }
                            rowHeight   = { props.rowHeight || 60 }
                            rowCount    = { filteredData.length }
                            rowRenderer = { rowRenderer }
                            rowGetter   = { ({ index }) => filteredData[index] }
                            headerRowRenderer = { renderHeaderRow }
                            className   = { style.table + ( props.tableClassName? ` ${props.tableClassName}`: '' ) }
                            style       = {{
                                borderRadius: '5px'
                            }}
                            onRowClick  = { props.onRowClick }
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

ReactVirtualizedSearchTable.propTypes = {
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
    ]),
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            dataKey: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired
        })
    ).isRequired,
    data: PropTypes.arrayOf(
        PropTypes.objectOf(
            PropTypes.shape({
                element: PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.element,
                ]).isRequired,
                searchKey: PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.bool
                ]).isRequired,
                orderKey: PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.number,
                    PropTypes.bool
                ]).isRequired,
            })
        )
    ).isRequired,
    rowHeight: PropTypes.number,
    onRowClick: PropTypes.func,
    rowClassName: PropTypes.string,
    headerClassName: PropTypes.string,
    tableClassName: PropTypes.string,
}

export default ReactVirtualizedSearchTable  