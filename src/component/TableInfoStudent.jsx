import React, { PureComponent } from 'react'


export default class TableInfoStudent extends PureComponent {
    
    componentDidUpdate(){
        console.log("componrnt did update")
    }

  render() {
    const {arrSV,deleteStudent,editStudent} = this.props

  
    return (
        <table className="table mt-5">
        <thead>
            <tr className="bg-dark text-light">
                <th>Mã SV</th>
                <th>Họ Tên</th>
                <th>Số Điện Thoại</th>
                <th>Email</th>
                <th>Chỉnh Sữa</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
               {
                arrSV.map((arrSV,index)=>(
                    <tr key={index}>
                    <td>{arrSV.maSV}</td>
                    <td>{arrSV.hoTen}</td>
                    <td>{arrSV.sdt}</td>
                    <td>{arrSV.email}</td>
                    <td >
                        <i className="fa-regular fa-trash-can me-3 table-trash" onClick={() => deleteStudent(arrSV.maSV)}></i>
                        <i className="fa-regular fa-pen-to-square table-edit" onClick={() => editStudent(arrSV)}></i>
                        </td>
                  
                    </tr>
                   ))
               }
        </tbody>
    </table>
    )
  }
}
