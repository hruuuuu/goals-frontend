import React, { Component } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import NativeSelect from '@mui/material/NativeSelect';

class BMR extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: '',
      weightp: '',
      weightkg: '',
      age: '',
      heightFeet: '',
      heightInches: '',
      heightcenti: '',
      bmr: '',
      activity: '',
      error: '',
      calories: '',
      unit: '',
    };
  }
  handleAgeChange = (event) => {
    this.setState({ age: event.target.value });
  };
  handleweightpChange = (event) => {
    this.setState({ weightp: event.target.value });
  };
  handleweightkgChange = (event) => {
    this.setState({ weightkg: event.target.value });
  };
  handleheightFeetChange = (event) => {
    this.setState({ heightFeet: event.target.value });
  };
  handleheightInchesChange = (event) => {
    this.setState({ heightInches: event.target.value });
  };
  handleheightcentiChange = (event) => {
    this.setState({ heightcenti: event.target.value });
  };
  handlegenderChange = (event) => {
    this.setState({ gender: event.target.value });
  };
  handleactivityChange = (event) => {
    this.setState({ activity: event.target.value });
  };
  handleunitChange = (event) => {
    this.setState({ unit: event.target.value });
    this.setState({ bmr: '' });
    this.setState({ calories: '' });
    // let unit = this.state.unit;

    // if (unit == '0') {
    //   this.setState({ error: '請選擇量測單位' });
    //   return;
    // }
    // if (unit == '1' || unit == '2') {
    //   this.setState();
    //   return;
    // }
  };
  calculateBMR() {
    let age = this.state.age;
    let gender = this.state.gender;
    let weightp = this.state.weightp;
    let weightkg = this.state.weightkg;
    let heightFeet = this.state.heightFeet;
    let heightcenti = this.state.heightcenti;
    let heightInches = this.state.heightInches;
    let unit = this.state.unit;

    var bmrCalc = '';
    let height = heightFeet * 30.48 + heightInches * 2.54;

    if (unit == '1') {
      if (
        age == '' ||
        weightp === '' ||
        gender == '' ||
        heightFeet == '' ||
        heightInches == ''
      ) {
        this.setState({ error: '請填寫所有欄位' });
        return;
      }
      if (gender == '2') {
        bmrCalc = 66 + 6.2 * weightp + 12.7 * height - 6.76 * age;
      } else if (gender == '1') {
        bmrCalc = 655.1 + 4.35 * weightp + 4.7 * height - 4.7 * age;
      }
    }
    if (unit == '2')
      if (age == '' || weightkg === '' || gender == '' || heightcenti == '') {
        this.setState({ error: '請填寫所有欄位' });
        return;
      }
    {
      if (gender == '2') {
        bmrCalc = 66.5 + 13.75 * weightkg + 5.003 * heightcenti - 6.755 * age;
      } else if (gender == '1') {
        bmrCalc = 655 + 9.563 * weightkg + 1.85 * heightcenti - 4.676 * age;
      }
    }
    this.setState({ bmr: bmrCalc });

    this.setState({ error: '' });
  }

  calActivity() {
    let act = this.state.activity;
    let bmr = this.state.bmr;
    let cal;

    if (act == '1.2') {
      cal = bmr * 1.2;
    } else if (act == '1.375') {
      cal = bmr * 1.375;
    } else if (act == '1.55') {
      cal = bmr * 1.55;
    } else if (act == '1.725') {
      cal = bmr * 1.725;
    } else if (act == '1.9') {
      cal = bmr * 1.9;
    }
    this.setState({ calories: cal });
    this.props.setCalories(cal);
  }

  render() {
    let error;
    if (this.state.error) {
      error = <div className="error">{this.state.error}</div>;
    }
    let unit = this.state.unit;
    let resultbmr;
    if (this.state.bmr) {
      resultbmr = (
        <div className="result">
          {this.state.bmr}
          <span>卡</span>
        </div>
      );
      document.getElementById('workout').style.display = 'block';
    }
    let resultcal;

    if (this.state.calories) {
      resultcal = (
        <div className="result">
          {this.state.calories}
          <span>卡</span>
        </div>
      );
    }
    var imperial = document.getElementsByClassName('imperial');
    var metric = document.getElementsByClassName('metric');
    if (this.state.unit == '2') {
      for (var i = 0; i < imperial.length; i += 1) {
        imperial[i].style.display = 'none';
      }
      for (var i = 0; i < metric.length; i += 1) {
        metric[i].style.display = 'block';
      }
    } else if (this.state.unit == '1') {
      for (var i = 0; i < imperial.length; i += 1) {
        imperial[i].style.display = 'block';
      }
      for (var i = 0; i < metric.length; i += 1) {
        metric[i].style.display = 'none';
      }
    }

    return (
      <div id="bmrcalc" className="calculator__form">
        <div className="form row">
          {error}
          <div className="col-xl-6 col-md-12">
            <div className="form-group">
              <div className="inputwrap">
                <label className="form-label">量測單位</label>
                <select
                  className="activity c-form__input form-control"
                  name="activity"
                  value={this.state.unit}
                  onChange={this.handleunitChange}
                >
                  <option value="0">請選擇</option>
                  <option value="1">英制</option>
                  <option value="2">公制</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-md-12">
            <div className="form-group">
              <FormControl>
                <label className="form-label">性別</label>
                <RadioGroup
                  row
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="2"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="2"
                    control={<Radio />}
                    label="男性"
                    className="genderM"
                    name="gender"
                    checked={this.state.gender === '2'}
                    onChange={this.handlegenderChange}
                  />
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="女性"
                    className="genderF"
                    name="gender"
                    checked={this.state.gender === '1'}
                    onChange={this.handlegenderChange}
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
          <div className="col-xl-12 col-md-12">
            <div className="form-group imperial">
              <label className="form-label">體重(磅)</label>
              <input
                type="number"
                name="weight"
                value={this.state.weightp}
                onChange={this.handleweightpChange}
                className="weight form-control c-form__input"
                min="0"
                max="999"
              />
            </div>
          </div>
          <div className="col-xl-12 col-md-12">
            <div className="form-group metric">
              <label className="form-label">體重(公斤)</label>
              <input
                type="number"
                name="weight"
                value={this.state.weightkg}
                onChange={this.handleweightkgChange}
                className="weight form-control c-form__input"
                min="0"
                max="999"
              />
            </div>
          </div>
          <div className="col-xl-12 col-md-12">
            <div className="form-group imperial">
              <label className="form-label">身高(英吋)</label>
              <input
                type="number"
                name="heightFeet"
                value={this.state.heightFeet}
                onChange={this.handleheightFeetChange}
                className="heightFeet form-control c-form__input"
                min="0"
                max="8"
              />
              <input
                type="number"
                name="heightInches"
                value={this.state.heightInches}
                onChange={this.handleheightInchesChange}
                className="heightInches form-control c-form__input"
                min="0"
                max="11"
              />
            </div>
            <div className="form-group metric">
              <label className="form-label">身高(公分)</label>
              <input
                type="number"
                name="heightInches"
                value={this.state.heightcenti}
                onChange={this.handleheightcentiChange}
                className="heightInches form-control c-form__input"
                min="0"
                max="11"
              />
            </div>
          </div>
          <div className="col-xl-12 col-md-12">
            <div className="form-group">
              <label className="form-label">年齡</label>
              <input
                type="number"
                value={this.state.age}
                onChange={this.handleAgeChange}
                className="age form-control c-form__input"
                name="age"
                min="0"
                max="120"
              />
            </div>
          </div>
          <div className="col-sm-12 calculator__form--btn">
            <button
              type="button"
              className="e-btn--primary e-btn--medium"
              onClick={() => this.calculateBMR()}
            >
              計算BMR
            </button>
          </div>
          {resultbmr}
          <div id="workout">
            <div className="form-group tdee-block">
              <label className="form-label">每週運動強度</label>
              <select
                className="activity c-form__input form-control"
                name="activity"
                value={this.state.activity}
                onChange={this.handleactivityChange}
              >
                <option value="">請選擇</option>
                <option value="1.2">久坐/沒在運動</option>
                <option value="1.375">
                  每週輕量運動/一個星期運動 1 ~ 3 天
                </option>
                <option value="1.55">每週中量運動/一個星期運動 3 ~ 5 天</option>
                <option value="1.725">
                  每週高強運動/一個星期運動 5 ~ 7 天
                </option>
                <option value="1.9">每天運動訓練 2 次、勞力工作者F</option>
              </select>
            </div>
            <div className="col-sm-12 calculator__form--btn">
              <button
                type="button"
                className="e-btn--primary e-btn--medium"
                onClick={() => this.calActivity()}
              >
                計算TDEE
              </button>
            </div>
            {resultcal}
          </div>
        </div>
      </div>
    );
  }
}
export default BMR;
