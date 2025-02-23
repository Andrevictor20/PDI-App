/*jshint esversion:6*/

$(function () {
  const { InferenceEngine, CVImage } = inferencejs;
  const inferEngine = new InferenceEngine();

  const video = $("video")[0];

  var workerId;
  var cameraMode = "environment"; // or "user"

  const startVideoStreamPromise = navigator.mediaDevices
      .getUserMedia({
          audio: false,
          video: {
              facingMode: cameraMode
          }
      })
      .then(function (stream) {
          return new Promise(function (resolve) {
              video.srcObject = stream;
              video.onloadeddata = function () {
                  video.play();
                  resolve();
              };
          });
      });

  const loadModelPromise = new Promise(function (resolve, reject) {
      inferEngine
          .startWorker("poluicao-dos-mares", "11", "rf_YgMgiMtPYJPxUsDTSWDvuz9ZRXE3")
          .then(function (id) {
              workerId = id;
              resolve();
          })
          .catch(reject);
  });

  Promise.all([startVideoStreamPromise, loadModelPromise]).then(function () {
      $("body").removeClass("loading");
      resizeCanvas();
      detectFrame();
  });

  var canvas, ctx;
  const font = "16px sans-serif";

  function videoDimensions(video) {
      // Ratio of the video's intrinsic dimensions
      var videoRatio = video.videoWidth / video.videoHeight;

      // The width and height of the video element
      var width = video.offsetWidth,
          height = video.offsetHeight;

      // The ratio of the element's width to its height
      var elementRatio = width / height;

      // If the video element is short and wide
      if (elementRatio > videoRatio) {
          width = height * videoRatio;
      } else {
          // It must be tall and thin, or exactly equal to the original ratio
          height = width / videoRatio;
      }

      return {
          width: width,
          height: height
      };
  }

  $(window).resize(function () {
      resizeCanvas();
  });

  const resizeCanvas = function () {
      $("canvas").remove();

      canvas = $("<canvas/>");

      ctx = canvas[0].getContext("2d");

      var dimensions = videoDimensions(video);

      console.log(
          video.videoWidth,
          video.videoHeight,
          video.offsetWidth,
          video.offsetHeight,
          dimensions
      );

      canvas[0].width = video.videoWidth;
      canvas[0].height = video.videoHeight;

      canvas.css({
          width: dimensions.width,
          height: dimensions.height,
          left: ($(window).width() - dimensions.width) / 2,
          top: ($(window).height - dimensions.height) / 2
      });

      $("body").append(canvas);
  };

  // Function to get specific text for each class
  function getClassText(objectClass) {
      const classTextMap = {
          'sacola': 'As sacolas plásticas representam uma parcela significativa dos 3,44 milhões de toneladas de lixo plástico que o Brasil descarta no ambiente anualmente. Esses resíduos ameaçam a vida marinha, causando asfixia e intoxicação em animais como tartarugas e peixes, além de prejudicar a flora aquática ao bloquear a luz solar e comprometer ecossistemas costeiros.',
      
          'calcado': 'Estima-se que cada par de calçados possa levar até 1.000 anos para se decompor. No Brasil, foram encontradas 3,6 toneladas de chinelos e sandálias de plástico e borracha nos mares e manguezais em um período de seis meses, evidenciando o impacto significativo desses resíduos nos ecossistemas marinhos.',
      
          'copo descartavel': 'Embora tenha havido uma redução na presença de copos descartáveis no mar brasileiro em 2020, esses itens ainda contribuem para a poluição marinha. Feitos de materiais como plástico e isopor, eles se fragmentam em microplásticos que contaminam a cadeia alimentar marinha e afetam a saúde dos ecossistemas aquáticos.',
      
          'garrafa de vidro': 'As garrafas de vidro, embora não liberem toxinas, podem quebrar e representar riscos físicos para a fauna marinha e banhistas. Seu descarte inadequado contribui para a poluição costeira, e o vidro pode levar milhares de anos para se decompor naturalmente, persistindo no ambiente marinho por longos períodos.',
      
          'garrafa plastica': 'As garrafas plásticas são uma das principais fontes de poluição dos oceanos, contribuindo para os 325 mil toneladas de plástico que o Brasil despeja no mar anualmente. Elas se degradam lentamente, liberando microplásticos que afetam a fauna marinha, com muitos animais confundindo esses fragmentos com alimento, o que pode ser fatal.',
      
          'lata de aluminio': 'As latas de alumínio podem levar até 200 anos para se decompor no ambiente marinho. Quando descartadas inadequadamente, elas poluem os oceanos e podem liberar metais que afetam organismos marinhos. Além disso, representam uma perda significativa de recursos que poderiam ser reciclados.',
      
          'papelao': 'Embora o papelão se decomponha mais rapidamente que outros materiais, seu descarte no mar pode comprometer habitats marinhos e introduzir tintas e produtos químicos na água. A presença de papelão e outros resíduos sólidos pode afetar a qualidade da água e a saúde dos ecossistemas costeiros.',
      
          'pneu': 'Pneus descartados no mar liberam substâncias tóxicas que afetam a fauna e a flora marinhas. Além disso, o desgaste de pneus é uma fonte significativa de microplásticos, que representam uma ameaça crescente aos ecossistemas aquáticos e à saúde humana devido à sua persistência e capacidade de acumular poluentes.'
      };
      
      return classTextMap[objectClass] || 'Não encontrada ou classe indefinida.';
  }

  const renderPredictions = function (predictions) {
      var scale = 1;

      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      // Contador de objetos por classe
      const objectCount = {};

      predictions.forEach(function (prediction) {
          const x = prediction.bbox.x;
          const y = prediction.bbox.y;

          const width = prediction.bbox.width;
          const height = prediction.bbox.height;

          // Incrementar o contador da classe
          if (!objectCount[prediction.class]) {
              objectCount[prediction.class] = 0;
          }
          objectCount[prediction.class] += 1;
          //EXIBIÇÂO NO CONSOLE ABAIXO
          console.log(prediction);
         //EXIBIÇÂO NO CONSOLE ACIMA


          // Draw the bounding box.
          ctx.strokeStyle = prediction.color;
          ctx.lineWidth = 4;
          ctx.strokeRect(
              (x - width / 2) / scale,
              (y - height / 2) / scale,
              width / scale,
              height / scale
          );

          // Draw the label background.
          ctx.fillStyle = prediction.color;
          const textWidth = ctx.measureText(prediction.class).width;
          const textHeight = parseInt(font, 10); // base 10
          ctx.fillRect(
              (x - width / 2) / scale,
              (y - height / 2) / scale,
              textWidth + 8,
              textHeight + 4
          );
      });

      predictions.forEach(function (prediction) {
          const x = prediction.bbox.x;
          const y = prediction.bbox.y;

          const width = prediction.bbox.width;
          const height = prediction.bbox.height;

          // Draw the text last to ensure it's on top.
          ctx.font = font;
          ctx.textBaseline = "top";
          ctx.fillStyle = "#000000";
          ctx.fillText(
              `${prediction.class} (${objectCount[prediction.class]}) Precisão: ${Math.round(prediction.confidence*100)}%`,
              (x - width / 2) / scale + 4,
              (y - height / 2) / scale + 1
          );
      });

      // Atualizar o conteúdo do elemento #object-info
      const objectInfo = $("#object-info");
      objectInfo.empty();
      for (const [key, value] of Object.entries(objectCount)) {
          objectInfo.append(`<div>${key}: ${value}</div>`);
          objectInfo.append(`<div>${getClassText(key)}</div>`);
      }
  };

  var prevTime;
  var pastFrameTimes = [];
  const detectFrame = function () {
      if (!workerId) return requestAnimationFrame(detectFrame);

      const image = new CVImage(video);
      inferEngine
          .infer(workerId, image)
          .then(function (predictions) {
              requestAnimationFrame(detectFrame);
              renderPredictions(predictions);

              if (prevTime) {
                  pastFrameTimes.push(Date.now() - prevTime);
                  if (pastFrameTimes.length > 30) pastFrameTimes.shift();

                  var total = 0;
                  _.each(pastFrameTimes, function (t) {
                      total += t / 1000;
                  });

                  var fps = pastFrameTimes.length / total;
                  $("#fps").text(Math.round(fps));
              }
              prevTime = Date.now();
          })
          .catch(function (e) {
              console.log("CAUGHT", e);
              requestAnimationFrame(detectFrame);
          });
  };
});
