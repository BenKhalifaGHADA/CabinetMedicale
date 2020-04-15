import React from 'react'
import MyPrintableComponent from './MyPrintableComponent'
// import 'styles.scss'

export default class OrderComponent extends React.Component {
    printOrder = () => {
        const printableElements = document.getElementById('printme').innerHTML;
        const orderHTML = '<html><head><title></title></head><body>' + printableElements + '</body></html>'
        const oldPage = document.body.innerHTML;
        document.body.innerHTML = orderHTML;
        window.print();
        document.body.innerHTML = oldPage
    }
    render () {
        return (
            <div className='container'>
                <div onClick={() => this.printOrder()}>
                    Print Order
                </div>
                <MyPrintableComponent printableId='printme'/>
            </div>
        )
    }
}