import React from 'react';
import Header from '../Header';
import CalculatorForm from './CalculatorForm';
import RecGood from './RecGood';

import desImg from '../../img/calculator/description.jpg';
import logoOriginal from '../../img/common/logo--original.svg';

const MainContent = () => {
  return (
    <>
      <div className="main-content">
        <Header />
        <section className="l-guide">
          <div className="container">
            <div className="right_cont model">
              <div className="right_cont__pic">
                <img
                  className="img-responsive"
                  src={require('../../img/calculator/guide.jpg')}
                  alt="Guide"
                />
              </div>
              <div className="right_cont__text-box">
                <div className="model__head">
                  <div className="model__head--deco-text">GUIDE</div>
                  <div className="model__head--title">
                    打造易瘦體質！
                    <br class="model_br" />
                    由計算TDEE開始
                  </div>
                  <div className="model__head--subtitle">
                    果實帶您了解TDEE與BMR的不同
                  </div>
                </div>
                <div className="right_cont__text-box--text">
                  <p>
                    減重幾乎是現代人永遠的課題，明明認真運動了，卻看不到體重、體脂的改變。明明吃的東西變清淡、健康了，卻還是瘦不下來呢？你可能忽略每日總熱量消耗(TDEE)、基礎代謝率(BMR)。健身教練Candice曾與我們分享，在接觸運動前有過的迷思:「以為健康的東西，就可以吃很多。卻沒有注意到有些健康的食物也是高熱量的，沒有注意熱量的後果就是減肥不成，越吃越胖。」
                  </p>
                </div>
              </div>
            </div>
            <div className="clearfix"></div>
          </div>
        </section>
        <section className="l-description">
          <div className="container">
            <div className="des-left">
              <div className="des-left__top model">
                <div className="model__head">
                  <div className="model__head--title">
                    TDEE、BMR與減脂的關係
                  </div>
                  <div className="model__head--subtitle">
                    減脂之前你需要先了解什麼是TDEE和BMR
                    <br />
                    懂了這兩個觀念，減脂成功7成靠飲食就搞定啦！
                  </div>
                </div>
                <div className="des-left__top--text">
                  <p>
                    不管你是要增肌、減脂或是維持目前的體重，都可以透過BMR跟TDEE來了解你一天需要的熱量為多少！在這裡就讓果實一起來帶大家了解什麼是每日總熱量消耗(TDEE)、基礎代謝率(BMR)，以及該如何計算與如何提升代謝率。
                  </p>
                </div>
              </div>
              <div className="des-left__bottom model">
                <div className="text-box">
                  <div className="model__head">
                    <div className="model__head--title">基礎代謝率 BMR</div>
                    <div className="model__head--subtitle">
                      一整天不需要移動也能消耗的熱量
                    </div>
                  </div>
                  <div className="des-left__top--text">
                    <p>
                      你可能曾經聽過有些人呼吸就會胖、有些人卻躺著也能瘦？這其實跟基礎代謝率(BMR)很有關係。即為身體需要維持運作、休息、維持生命所消耗的最低能量，這也是為什麼要有充足的睡眠，因為睡覺時也是會消耗熱量的！
                    </p>
                    <p>
                      年齡、體重、肌肉量、賀爾蒙都是影響基礎代謝率的關鍵。我們可以這麼說，當年紀越大時，基礎代謝率即會逐年下降；當肌肉量增加時，基礎代謝率則會隨之增加、體重減輕也會使基礎代謝率下降。
                    </p>
                  </div>
                </div>
                <div className="text-box">
                  <div className="model__head">
                    <div className="model__head--title">
                      每日總熱量消耗 TDEE
                    </div>
                    <div className="model__head--subtitle">
                      維持體重所需的每日總熱量
                    </div>
                  </div>
                  <div className="des-left__top--text">
                    <p>
                      TDEE是根據一天的活動量、吃東西消耗的熱量總和，產生出的每日總熱量消耗。TDEE其中包括佔據65%-75%的基礎代謝率(BMR)＋體力活動能量消耗(TEA)
                      )＋食物熱效應 (TEF)。
                    </p>
                    <p>
                      可以利用粗估活動量參考的方式來計算自己的TDEE。
                      熱量攝取與TDEE建議量持平的話，只會讓體重維持。如果是想增肌或減脂的人，建議一天減少或增加10%的每日消耗熱量，通常建議為TDEE增減300大卡為廣泛建議。
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="des-right">
              <div className="des-right__deco">
                <img className="img-responsive" src={logoOriginal} alt="logo" />
              </div>
              <div className="des-right__img">
                <img src={desImg} alt="description" />
              </div>
            </div>
          </div>
        </section>
        <section className="l-calculator">
          <div className="model__head model__head--sec">
            <div className="model__head--deco-text">GOALS CALCULATOR</div>
            <div className="model__head--title">TDEE/ BMR 計算機</div>
            <div className="model__head--subtitle">
              果實帶您了解TDEE與BMR的不同
            </div>
          </div>
          <div className="container">
            <CalculatorForm />
          </div>
          <div className="explan">
            <div className="container">
              <div className="row">
                <div className="col-xl-6 col-lg-12">
                  <div className="explan__title">
                    <h4>
                      利用算出來的TDEE當作參考值
                      <br />
                      之後的熱量攝取可以參考下面的方式做調整
                    </h4>
                    <p>
                      維持體重：每天吃到TDEE的熱量
                      <br />
                      增加肌肉：每天吃到TDEE+300卡路里的熱量
                      <br />
                      減少脂肪：每天吃到TDEE-300卡路里的熱量
                    </p>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-12">
                  <div className="explan__text">
                    <p>
                      假設你您的目標是減重，少吃300大卡以後體重還是沒有變化，建議增加活動量，例如原先自己很少運動，就改成一個禮拜運動2~3天，慢慢循序漸進，以重量訓練搭配有氧以及飲食控制，才是比較好的方式喔～
                      另外，若您的目標是增肌減脂，我們推薦提高蛋白質的攝取，因為蛋白質的食物產熱消耗比碳水化合物及脂質高，所以拉高蛋白質比例、降低碳水化合物攝取，是高cp值的做法喔!
                    </p>
                    <span>
                      ※以上資訊僅供參考，建議依自身身體狀況諮詢專業營養師或健身教練
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="l-recommenedGood">
          <div className="model__head model__head--sec">
            <div className="model__head--deco-text">RECOMMENED GOODS</div>
            <div className="model__head--title">果實推薦三餐組合</div>
            <div className="model__head--subtitle">
              依照您的TDEE計算結果量身打造的餐食組合
            </div>
          </div>
          <div className="container">
            <RecGood />
          </div>
        </section>
      </div>
    </>
  );
};

export default MainContent;
