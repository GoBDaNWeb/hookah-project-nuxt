<script setup>
import { onMounted } from "vue";
onMounted(() => {
  let center = [55.738819, 37.540686];

  if (!window.ymaps) {
    const script = document.createElement("script");
    script.src =
      "https://api-maps.yandex.ru/2.1/?apikey=ВАШ_API_КЛЮЧ&lang=ru_RU";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      ymaps.ready(init);
    };
    document.head.appendChild(script);
  } else {
    ymaps.ready(init);
  }
  function init() {
    let map = new window.ymaps.Map("map", {
      center: center,
      zoom: 15,
    });

    let placemark = new window.ymaps.Placemark(
      center,
      {
        balloonContentHeader: "Адрес",
        balloonContentBody: "Офис, Студенческая, 35",
      },
      {}
    );

    map.controls.remove("geolocationControl"); // удаляем геолокацию
    map.controls.remove("searchControl"); // удаляем поиск
    map.controls.remove("trafficControl"); // удаляем контроль трафика
    map.controls.remove("typeSelector"); // удаляем тип
    map.controls.remove("fullscreenControl"); // удаляем кнопку перехода в полноэкранный режим
    map.controls.remove("zoomControl"); // удаляем контрол зуммирования
    map.controls.remove("rulerControl"); // удаляем контрол правил
    map.behaviors.disable(["scrollZoom"]); // отключаем скролл карты (опционально)

    map.geoObjects.add(placemark);
    // map.geoObjects.add(placemark2);
  }
});
</script>

<template>
  <div id="map" class="map"></div>
</template>

<style lang="scss">
@use "@/shared/styles/vars" as *;

.map {
  width: 100%;
  height: 100%;
  background-color: var(--bg-color);
  filter: grayscale(1);
  & > * {
    width: 100% !important;
    height: 100% !important;
    & > * {
      width: 100% !important;
      height: 100% !important;
    }
  }
}
</style>
