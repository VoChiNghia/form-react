import React, { Component } from "react";
import TableInfoStudent from "./TableInfoStudent";
import removeVietnameseTones from "../util/convertVIE";
import Swal from 'sweetalert2'

export default class AddStudent extends Component {
  state = {
    formValue: {
      maSV: "",
      hoTen: "",
      sdt: "",
      email: "",
    },
    formErr: {
      maSV: "",
      hoTen: "",
      sdt: "",
      email: "",
    },
    arrSV: [
      {
        maSV: "1",
        hoTen: "Võ Chí Nghĩa",
        sdt: "012345678",
        email: "nghiakg11234@gmail.com",
      },
    ],
    searchValue: "",
    isValid: false,
  };

  handleInput = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    const dataType = e.target.getAttribute("data-type");
    const arrSV = this.state.arrSV


    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let rexgexString = /[a-zA-Z]+$/;

    let message = "";
    if (value.trim() === "") {
      message = name + " " + "can't be blank'";
    }
    if (dataType === "string") {
      if (!rexgexString.test(value.trim())) {
        message = name + " " + "require string";
      }
    }
    if (dataType === "email") {
      if (!regexEmail.test(value.trim())) {
        message = "invalid" + " " + name;
      }
    }

    for(let student of arrSV){
             if(student.maSV === value){
            message = 'Ma sinh vien' + " " + " already exist"
        }
    }

    this.state.formErr[name] = message;
    let newFormValue = this.state.formValue;
    newFormValue[name] = value;

    this.setState(
      {
        formValue:newFormValue,
      },
      () => {
        this.setState({
          isValid: this.checkValid(),
        });
      }
    );
  };
  handleSubmit = (e) => {
    e.preventDefault();

    let arr = this.state.arrSV;
    arr.push({ ...this.state.formValue });
    this.setState({ arrSV: [...arr] },()=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Thêm Sinh Viên Thành công',
        showConfirmButton: true,
        timer: 1000
      })
    });
  };
  editStudent = ({ ...value }) => {
    this.setState({ formValue: value });
  };
  updateStudent = () => {
    const value = this.state.formValue;
    let arrSV = this.state.arrSV;
    let studentUpdate = arrSV.find((arrSV) => value.maSV === arrSV.maSV);

    if (studentUpdate) {
      for (let key in studentUpdate) {
        if (key !== "maSV") studentUpdate[key] = value[key];
      }
    }

    this.setState({ arrSV: [...arrSV] },()=>{
      this.setState({isValid:this.checkValid()})
      if(this.checkValid()){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Cập nhập Sinh Viên Thành công',
          showConfirmButton: true,
          timer: 1000
        })
      }
    });
  };

  deleteStudent = (maSV) => {
    let arr = this.state.arrSV;
    const newArr = arr.filter((item) => item.maSV !== maSV);

    this.setState({ arrSV: newArr },()=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Xóa Sinh Viên Thành công',
        showConfirmButton: true,
        timer: 1000
      })
    });
  };
  checkValid = () => {
    let { formErr, formValue } = this.state;

    for (let key in formValue) {
      if (formErr[key] !== "" || formValue[key] === "") {
        return false;
      }
    }
    return true;
  };
  handleSearch = () => {
    const { searchValue, arrSV } = this.state;
    const result = arrSV.filter((search) => {
      const removeTones = removeVietnameseTones(searchValue);

      return (
        removeVietnameseTones(search.hoTen.toLocaleLowerCase()).includes(
          removeTones
        ) ||
        removeVietnameseTones(search.email.toLocaleLowerCase()).includes(
          removeTones
        ) ||
        removeVietnameseTones(search.maSV.toLocaleLowerCase()).includes(
          removeTones
        ) ||
        removeVietnameseTones(search.hoTen.toLocaleLowerCase()).includes(
          removeTones
        )
      );
    });
    this.setState(
      {
        arrSV: result,
      }
    );
  };

  render() {
    return (
      <div className="mt-5">
        <h1 className="bg-dark text-light p-2">Thêm Sinh Viên</h1>
        <form className="form mt-5 " onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-6">
              <div className="form-group mb-2 ">
                <p className="" name="maSV">
                  Mã Sinh Viên
                </p>
                <input
                  type="text"
                  name="maSV"
                  value={this.state.formValue.maSV}
                  className="w-100 outline-none"
                  placeholder="Sã sinh viên"
                  onInput={this.handleInput}
                />
                <span className="err">{this.state.formErr.maSV}</span>
              </div>
              <div className="form-group mb-2">
                <p className="" name="sdt">
                  Số Điện Thoại
                </p>
                <input
                  type="number"
                  name="sdt"
                  className="w-100"
                  value={this.state.formValue.sdt}
                  placeholder="Số điện thoại "
                  onInput={this.handleInput}
                />
                <span className="err">{this.state.formErr.sdt}</span>
              </div>
            </div>
            <div className="col-6">
              <div className="form-group mb-2">
                <p className="" name="hoTen">
                  Họ Tên
                </p>
                <input
                  type="text"
                  name="hoTen"
                  data-type="string"
                  className="w-100"
                  value={this.state.formValue.hoTen}
                  placeholder="Họ tên"
                  onInput={this.handleInput}
                />
                <span className="err">{this.state.formErr.hoTen}</span>
              </div>
              <div className="form-group mb-2">
                <p className="" name="email">
                  Email
                </p>
                <input
                  type="text"
                  name="email"
                  data-type="email"
                  className="w-100"
                  value={this.state.formValue.email}
                  placeholder="email"
                  onInput={this.handleInput}
                />
                <span className="err">{this.state.formErr.email}</span>
              </div>
            </div>
          </div>

          <button
            disabled={!this.state.isValid}
            type="submit"
            className="btn btn-primary mt-5 mx-2"
          >
            Thêm Sinh Viên
          </button>
          <button
            type="button"
            className="btn btn-success mt-5"
            onClick={this.updateStudent}
          >
            Cập Nhập
          </button>
        </form>
        <div class="input-group my-3 w-25">
          <input
          disabled={!this.state.isValid}
            type="text"
            class="form-control"
            placeholder="search"
            onInput={(e) => this.setState({ searchValue: e.target.value })}
          />
          <button
            class="btn btn-outline-secondary"
            type="button"
            onClick={this.handleSearch}
          >
            Tim Kiem
          </button>
        </div>
        <div>
          <TableInfoStudent
            deleteStudent={this.deleteStudent}
            arrSV={this.state.arrSV}
            editStudent={this.editStudent}
          />
        </div>
      </div>
    );
  }
}
