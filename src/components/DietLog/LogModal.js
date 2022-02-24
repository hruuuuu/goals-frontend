import React from 'react';

function LogModal() {
  return (
    <>
      <form action="">
        <input type="file" name="" id="" />
        <select name="" id="">
          <option value="">早餐</option>
          <option value="">午餐</option>
          <option value="">晚餐</option>
          <option value="">其他</option>
        </select>
        <h4>營養成分</h4>
        <label htmlFor="">熱量</label>
        <input type="number" />
        <label htmlFor="">蛋白質</label>
        <input type="number" />
        <label htmlFor="">脂肪</label>
        <input type="number" />
        <label htmlFor="">飽和脂肪</label>
        <input type="number" />
        <label htmlFor="">反式脂肪</label>
        <input type="number" />
        <label htmlFor="">碳水化合物</label>
        <input type="number" />
        <label htmlFor="">糖</label>
        <input type="number" />
        <label htmlFor="">鈉</label>
        <input type="number" />
        <input type="datetime-local" name="" id="" />
        <textarea name="" id="" cols="30" rows="10" />
        <button>清空</button>
        <button>送出</button>
      </form>
    </>
  );
}

export default LogModal;
