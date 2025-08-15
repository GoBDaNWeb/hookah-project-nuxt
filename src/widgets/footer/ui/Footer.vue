<template>
  <footer>
    <div class="footer-inner">
      <div
        class="footer-item"
        v-for="(_, index) in [...Array(10)]"
        :key="index"
      >
        <p>Минздрав предупреждает</p>
        <span
          >Курение вредит <br />
          вашему здоровью</span
        >
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@use "@/shared/styles/vars" as *;

footer {
  background: var(--text-color);
  padding: 50px 0;
  overflow: hidden;
  .footer-inner {
    display: flex;
    gap: 100px;
    animation: scroll 35s linear infinite;
    @media (max-width: $tab) {
      animation: scroll 15s linear infinite;
    }
    @media (max-width: $tab-sm) {
      animation: scroll 15s linear infinite;
    }
    .footer-item {
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
      span {
        font-weight: 400;
        font-size: 28px;
        line-height: 23px;
        text-transform: uppercase;
        color: var(--bg-color);
        white-space: nowrap;
        @media (max-width: $tab-sm) {
          white-space: normal;
          font-size: 15px;
          line-height: 12px;
          width: 140px;
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
