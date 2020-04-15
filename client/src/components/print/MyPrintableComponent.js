
import React from 'react'

export default class MyPrintableComponent extends React.Component {
    render () {
        return (
            <div id={this.props.printableId}>
                <h1>IM GUNNA PRINT</h1>
            </div>
        )
    }
}