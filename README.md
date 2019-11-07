react-virtualize-search-table
===

Table powered by react-virtualized table with search and sort.

demo: https://flyingpath.github.io/react-virtualize-search-table

### Prop Types
| Property | Type   | Required? | Description|
| :------- | :----- | :-------: | :--------- |
| title | element or string  |    | table title  |
| columns | array  |  Y  | Array of data object with dataKey and label [Example](#Columns)  |
| data | array  |  Y  | Array of data object with element, searchKey and orderKey. [Example](#dataExample) 
| rowHeight | number  |  N  | Height of row, default: 60 


### <a name="Columns"></a>columns

```
[
    { 
        dataKey: 'name',        
        label: 'name' 
    },
    { 
        dataKey: 'description', 
        label: 'description' 
    },
    { 
        dataKey: 'danger',      
        label: '危機值危機值危機值危' 
    }
]
```


### <a name="dataExample"></a>data


The keys in the object is linked to the dataKeys in columns.

SearchKey is used for search.
OrderKey  is used for sort.

```
[
    { 
        name  : {
            element     : ( <div>Brian Vaughn</div> ),
            searchKey   : 'Brian Vaughn',
            orderKey    : 'Brian Vaughn'
        }, 
        description: {
            element     : ( <div>xxxxx</div> ),
            searchKey   : 'Software engineer',
            orderKey    : 'Software engineer'
        },
        danger: {
            element     : ( <div>0</div> ),
            searchKey   : false,
            orderKey    : 0
        }
    },
    { 
        name  : {
            element     : ( <div></div> ),
            searchKey   : 'Brian Vaughn2',
            orderKey    : 'Brian Vaughn2'
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
    }, ...
]
```

### Example

```
import React from 'react'
import ReactVirtulizeSearchTable from './components/index'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            columns: [],
            data: []
        }
    }

    render() {
        const demo =     {
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
                }
            ]
        }

        return (
            <div style={{ height: '100%' }}>
                <ReactVirtulizeSearchTable {...demo} />
            </div>
        )
    }

}

export default App
```
