window.onload = function() {

  function scrapeAndStoreInfo() {
      const vehicleElements = document.querySelectorAll(".rating-header-title");
      const vehicles = [];

      vehicleElements.forEach(vehicleElement => {
          if (vehicleElement && vehicleElement.textContent.includes("Vehicle")) {
              const year = vehicleElement.querySelector('.year') ? vehicleElement.querySelector('.year').textContent : 'unknown';
        
              const make = vehicleElement.querySelector('.make') ? vehicleElement.querySelector('.make').textContent : 'unknown';
              const model = vehicleElement.querySelector('.model') ? vehicleElement.querySelector('.model').textContent : 'unknown';

              // 创建按钮并插入到元素之后
              const button = document.createElement("button");
              button.innerText = "Click me1";
              vehicleElement.insertAdjacentElement("afterend", button);

              // 为按钮添加点击事件
              button.addEventListener("click", function() {
                  const url = `https://staging.moxaprotection.com/?year=${year}&make=${make}&model=${model}`;
                  window.open(url, "_blank");

                  // 保存数据到 Chrome 存储空间
                  chrome.storage.local.set({ year, make,model }, function() {
                      console.log('Data saved.');
                  });
              });

              // 保存元素信息到数组
              vehicles.push({ year, make, model, text: vehicleElement.textContent });
          }
      });

      // 保存数据到 localStorage
      localStorage.setItem('vehicles', JSON.stringify(vehicles));
      console.log('Vehicles data saved to localStorage:', vehicles);
  }

  // 初次加载时进行抓取和存储
  scrapeAndStoreInfo();

  // 使用 MutationObserver 监控 DOM 变化
  const observer = new MutationObserver(scrapeAndStoreInfo);
  observer.observe(document.body, { childList: true, subtree: true });


  chrome.storage.local.get(['year', 'make', 'model'], function(result) {
      console.log('Stored year:', result.year);
      console.log('Stored make:', result.make);
  
      console.log('Stored model:', result.model);
  });
};
