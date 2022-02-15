import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const CalculatorForm = () => {
  return (
    <>
      <form className="calculator__form">
        <div className="row">
          <div className="col-xl-6 col-md-12">
            <div className="form-group ">
              <FormControl>
                <label for="exampleFormControlInput1" className="form-label">
                  性別
                </label>
                <RadioGroup
                  row
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
          <div className="col-xl-6 col-md-12">
            <div className="form-group ">
              <label for="exampleFormControlInput1" className="form-label">
                年齡
              </label>
              <input
                type="number"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder=""
              />
            </div>
          </div>
          <div className="col-xl-6 col-md-12">
            <div className="form-group ">
              <label for="exampleFormControlInput1" className="form-label">
                身高(公分)
              </label>
              <input
                type="number"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder=""
              />
            </div>
          </div>
          <div className="col-xl-6 col-md-12">
            <div className="form-group ">
              <label for="exampleFormControlInput1" className="form-label">
                體重(公斤)
              </label>
              <input
                type="number"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder=""
              />
            </div>
          </div>
          <div className="col-sm-12">
            <div className="form-group ">
              <FormControl>
                <label for="exampleFormControlInput1" className="form-label">
                  每週運動強度
                </label>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="久坐/沒在運動"
                    control={<Radio />}
                    label="久坐/沒在運動"
                  />
                  <FormControlLabel
                    value="每週輕量運動/一個星期運動 1 ~ 3 天"
                    control={<Radio />}
                    label="每週輕量運動/一個星期運動 1 ~ 3 天"
                  />
                  <FormControlLabel
                    value="每週中量運動/一個星期運動 3 ~ 5 天"
                    control={<Radio />}
                    label="每週中量運動/一個星期運動 3 ~ 5 天"
                  />
                  <FormControlLabel
                    value="每週高強運動/一個星期運動 5 ~ 7 天"
                    control={<Radio />}
                    label="每週高強運動/一個星期運動 5 ~ 7 天"
                  />
                  <FormControlLabel
                    value="每天運動訓練 2 次、勞力工作者"
                    control={<Radio />}
                    label="每天運動訓練 2 次、勞力工作者"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
          <div className="col-sm-12 calculator__form--btn">
            <button type="submit" class="e-btn--primary e-btn--medium">
              送出
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CalculatorForm;
