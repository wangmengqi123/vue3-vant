<template>
  <div class="" id="rose"></div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import * as echarts from 'echarts'
import 'echarts-gl'
import { on } from 'events'
var ROOT_PATH = 'https://echarts.apache.org/examples'
var option

var sin = Math.sin
var cos = Math.cos
var pow = Math.pow
var sqrt = Math.sqrt
var cosh = Math.cosh
var sinh = Math.sinh
var exp = Math.exp
var PI = Math.PI
var square = function (x) {
  return x * x
}
var mod2 = function (a, b) {
  var c = a % b
  return c > 0 ? c : c + b
}
var theta1 = -(20 / 9) * PI
var theta2 = 15 * PI
function getParametricEquation() {
  return {
    u: {
      min: 0,
      max: 1,
      step: 1 / 24
    },
    v: {
      min: theta1,
      max: theta2,
      step: (theta2 - theta1) / 575
    },
    x: function (x1, theta) {
      var phi = (PI / 2) * exp(-theta / (8 * PI))
      var y1 = 1.9565284531299512 * square(x1) * square(1.2768869870150188 * x1 - 1) * sin(phi)
      var X = 1 - square(1.25 * square(1 - mod2(3.6 * theta, 2 * PI) / PI) - 0.25) / 2
      var r = X * (x1 * sin(phi) + y1 * cos(phi))
      return r * sin(theta)
    },
    y: function (x1, theta) {
      var phi = (PI / 2) * exp(-theta / (8 * PI))
      var y1 = 1.9565284531299512 * square(x1) * square(1.2768869870150188 * x1 - 1) * sin(phi)
      var X = 1 - square(1.25 * square(1 - mod2(3.6 * theta, 2 * PI) / PI) - 0.25) / 2
      var r = X * (x1 * sin(phi) + y1 * cos(phi))
      return r * cos(theta)
    },
    z: function (x1, theta) {
      var phi = (PI / 2) * exp(-theta / (8 * PI))
      var y1 = 1.9565284531299512 * square(x1) * square(1.2768869870150188 * x1 - 1) * sin(phi)
      var X = 1 - square(1.25 * square(1 - mod2(3.6 * theta, 2 * PI) / PI) - 0.25) / 2
      var r = X * (x1 * sin(phi) + y1 * cos(phi))
      return X * (x1 * cos(phi) - y1 * sin(phi))
    }
  }
}
const chartinit = () => {
  const mychart = echarts.init(document.getElementById('rose'))
  const option = {
    toolbox: {
      feature: {
        saveAsImage: {
          backgroundColor: '#111'
        }
      },
      iconStyle: {
        normal: {
          borderColor: '#fff'
        }
      },
      left: 0
    },
    xAxis3D: {
      type: 'value'
    },
    yAxis3D: {
      type: 'value'
    },
    zAxis3D: {
      type: 'value'
    },
    grid3D: {
      show: false,
      axisPointer: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: '#fff'
        }
      },
      postEffect: {
        enable: true,
        SSAO: {
          enable: true,
          radius: 10,
          intensity: 2
        },
        edge: {
          enable: true
        }
      },
      temporalSuperSampling: {
        enable: true
      },
      light: {
        main: {
          intensity: 3,
          shadow: true
        },
        ambient: {
          intensity: 0
        },
        ambientCubemap: {
          texture: ROOT_PATH + '/data-gl/asset/canyon.hdr',
          exposure: 0,
          diffuseIntensity: 1,
          specularIntensity: 0.5
        }
      },
      viewControl: {
        // projection: 'orthographic'
      }
    },
    series: [
      {
        type: 'surface',
        parametric: true,
        shading: 'realistic',
        silent: true,
        wireframe: {
          show: false
        },
        realisticMaterial: {
          baseTexture: ROOT_PATH + '/asset/get/s/data-1494250104909-SkZtfeAyZ.jpg',
          roughness: 0.7,
          metalness: 0,
          textureTiling: [200, 20]
        },
        itemStyle: {
          color: '#fff'
        },
        parametricEquation: getParametricEquation()
      }
    ]
  }
  option && mychart.setOption(option)
}
onMounted(() => {
  chartinit()
})
</script>
<style lang="scss" scoped>
.rose {
  width: 500px;
  height: 500px;
}
</style>
