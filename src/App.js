import React from 'react'

import ReactVirtulizeSearchTable from './components/index'

import './App.css'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            columns: [],
            data: []
        }
    }

    render() {
        return (
            <div style={{ height: '100%' }}>
                <ReactVirtulizeSearchTable />
            </div>
        )
    }

}

export default App
