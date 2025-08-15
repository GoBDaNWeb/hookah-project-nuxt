<script setup>
import { Button } from "@/shared/ui/button";
const reviewData = ref([]);

defineProps(["reviewData"]);
</script>

<template>
  <div class="reviews">
    <div class="container">
      <div class="reviews-inner">
        <div class="top">
          <h3>{{ reviewData["Отзывы Заголовок"] }}</h3>
        </div>
        <div class="review-content">
          <div class="review-content-wrapper" style="">
            <iframe
              style="
                width: 100%;
                height: 100%;
                border: 1px solid #e6e6e6;
                border-radius: 8px;
                box-sizing: border-box;
              "
              src="https://yandex.ru/maps-reviews-widget/144955178324?comments"
            ></iframe>
            <div class="yandex-mob">
              <img src="@/shared/assets/images/yandex.png" alt="" />
              <a
                href="https://yandex.com.ge/maps/org/kalyan_na_dom/144955178324/"
                target="_blank"
                >Смотреть</a
              >
            </div>
            <a
              href="https://yandex.com.ge/maps/org/kalyan_na_dom/144955178324/"
              target="_blank"
              class="link"
              style="
                box-sizing: border-box;
                text-decoration: none;
                color: #b3b3b3;
                font-size: 10px;
                font-family: YS Text, sans-serif;
                padding: 0 20px;
                position: absolute;
                bottom: 8px;
                width: 100%;
                text-align: center;
                left: 0;
                overflow: hidden;
                text-overflow: ellipsis;
                display: block;
                max-height: 14px;
                white-space: nowrap;
                padding: 0 16px;
                box-sizing: border-box;
              "
              >Кальян на дом на карте Москвы — Яндекс Карты</a
            >
          </div>

          <div
            id="circle_bw"
            data-length="29"
            onclick="if(event.target.nodeName.toLowerCase() != 'a') {window.open(this.querySelector('.circle_bw_link').href);return 0;}"
          >
            <p class="circle_bw_year">2024</p>
            <div class="circle_bw_name">
              <a
                class="circle_bw_link"
                target="_blank"
                href="https://restaurantguru.com/Kalyan-na-dom-Moscow"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  width="178px"
                  height="178px"
                  viewBox="0 0 178 178"
                >
                  <defs>
                    <path
                      id="circle_bw_name-arc"
                      d="M 12 89 a 77 77 0 0 0 154 0"
                    ></path>
                  </defs>
                  <text
                    class="circle_bw_name_txt"
                    fill="#000"
                    text-anchor="middle"
                  >
                    <textPath
                      startOffset="50%"
                      xlink:href="#circle_bw_name-arc"
                    >
                      Кальян на дом
                    </textPath>
                  </text>
                </svg>
              </a>
            </div>
            <div class="circle_bw_nom">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="200px"
                height="200px"
                viewBox="0 0 200 200"
              >
                <defs>
                  <path
                    id="circle_bw_nom-arc1"
                    d="M 30 100 a 70 70 0 1 1 140 0"
                  ></path>
                </defs>
                <text
                  class="circle_bw_nom_txt"
                  fill="#000"
                  text-anchor="middle"
                >
                  <textPath startOffset="50%" xlink:href="#circle_bw_nom-arc1">
                    Recommended
                  </textPath>
                </text>
              </svg>
            </div>
            <a
              class="circle_bw_home"
              style="font-size: 0"
              href="https://restaurantguru.com"
              target="_blank"
              >Restaurant Guru</a
            >
          </div>
          <div class="scroll-line">
            <div
              class="scroll-item"
              v-for="(_, index) in [...Array(10)]"
              :key="index"
            >
              <p>отзывы</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.reviews {
  .review-content {
    iframe {
    }
  }
}
</style>
<style lang="scss" scoped>
@use "@/shared/styles/vars" as *;

.reviews {
  background: var(--white-color);
  .reviews-inner {
    padding-bottom: 130px;

    .top {
      padding-top: 30px;
      padding-bottom: 30px;
      border-top: 1px solid var(--text-color);
      border-bottom: 1px solid var(--text-color);
      h3 {
        font-weight: 400;
        font-size: 64px;
        line-height: 54px;
        color: var(--text-color);
        position: relative;
        padding-left: 70px;
        text-transform: uppercase;
        @media (max-width: $tab) {
          font-size: 35px;
          line-height: 29px;
          padding-left: 40px;
        }
        &:before {
          content: "";
          position: absolute;
          background: var(--text-color);
          width: 45px;
          height: 45px;
          left: 0;
          top: 0;
          bottom: 0;
          margin: auto;
          border-radius: 999px;
          @media (max-width: $tab) {
            width: 30px;
            height: 30px;
          }
        }
      }
    }

    .review-content {
      position: relative;
      overflow: hidden;
      margin-top: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-image: url("@/shared/assets/images/reviews-bg.jpg");
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      padding: 20px 0;
      @media (max-width: $tab) {
        background-image: none;
      }
      .review-content-wrapper {
        z-index: 3;
        width: 560px;
        height: 800px;
        overflow: hidden;
        position: relative;
        @media (max-width: $tab) {
          width: auto;
          height: auto;
        }
        iframe {
          @media (max-width: $tab) {
            display: none;
          }
        }
        .link {
          @media (max-width: $tab) {
            display: none !important;
          }
        }
        .yandex-mob {
          display: none;
          @media (max-width: $tab) {
            display: flex;
            flex-direction: column;
            gap: 10px;
            align-items: center;
          }
          img {
            width: 200px;
            height: 150px;
            object-fit: contain;
            @media (max-width: $mob) {
              width: 150px;
              height: 100px;
            }
          }
          a {
            max-width: 110px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #45403d;
            text-transform: uppercase;
            transition: var(--trs-300);
            border-radius: 99px;
            height: 35px;
            padding: 0 20px;
            font-weight: 500;
            font-size: 14px;
            letter-spacing: -7%;
            color: #45403d;
            &:hover {
              color: var(--hover-color);
              border-color: var(--hover-color);
            }
          }
        }
      }
      #circle_bw {
        position: absolute;
        top: 20px;
        right: 180px;
        @media (max-width: 1360px) {
          right: 120px;
        }
        @media (max-width: 1230px) {
          right: 20px;
        }
        @media (max-width: $tab) {
          position: relative;
          right: auto;
          top: auto;
          box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.25);
        }
      }
      .scroll-line {
        position: absolute;
        bottom: 83px;
        right: 0;
        left: 0;
        display: flex;
        z-index: 2;
        gap: 100px;
        animation: scroll 35s linear infinite;
        @media (max-width: $tab) {
          display: none;
        }

        .scroll-item {
          display: flex;
          gap: 27px;
          align-items: flex-end;
          p {
            font-weight: 400;
            font-size: 64px;
            line-height: 54px;
            text-transform: uppercase;
            color: var(--bg-color);
            white-space: nowrap;
            position: relative;
            @media (max-width: $tab-sm) {
              font-size: 24px;
              line-height: 20px;
              max-width: 200px;
              white-space: normal;
            }
            &:before {
              content: "";
              position: absolute;
              width: 45px;
              height: 45px;
              background: var(--bg-color);
              top: 0;
              bottom: 0;
              margin: auto;
              left: -70px;
              border-radius: 999px;
              @media (max-width: $tab-sm) {
                width: 40px;
                height: 40px;
              }
            }
          }
        }
      }
    }
  }
}

@keyframes scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(calc(-100% - 20px));
  }
}
</style>
