/* セクション1：transformのデモ */
(() => {
  const section1 = document.getElementById("section1")
  if(!section1){
    return
  }
  const box = section1.querySelector(".box")
  const button = section1.querySelector(".anim-button")

  button.addEventListener("click", () => {
    // 1. スタイルを取得
    const prev = box.getBoundingClientRect()
    // 2. スタイルを変更
    box.classList.toggle("active")
    // 3. スタイルを取得
    const next = box.getBoundingClientRect()
    // 4. アニメーションを適用
    box.animate([
        {
          translate: `${prev.x - next.x}px ${prev.y - next.y}px`,
        },
        {
          translate: "0 0",
        },
      ], {

        duration: 400,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)"

      }
    )
  })
})();


/* セクション2：flex-directionのデモ */
(() => {
  const section2 = document.getElementById("section2")
  if(!section2){
    return
  }
  const container = section2.querySelector(".container")
  const boxes = section2.querySelectorAll(".box")
  const button = section2.querySelector(".anim-button")

  button.addEventListener("click", () => {

    const prevMap = new Map();
    boxes.forEach((box) => {
      const id = box.dataset.id
      const style = box.getBoundingClientRect()
      prevMap.set(id, style)
    })

    // 2. スタイルを変更
    container.classList.toggle("active")

    // すべてのboxに対してアニメーションを適用する
    boxes.forEach((box) => {
      // 3. スタイルを取得
      const next = box.getBoundingClientRect()
      const id = box.dataset.id
      const prev = prevMap.get(id)
      // 4. アニメーションを適用
      box.animate([
          {
            translate: `${prev.x - next.x}px ${prev.y - next.y}px`,
          },
          {
            translate: "0 0",
          },
        ], {
          duration: 400,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)"
        }
      )
    })
  })
})();

/* セクション3：ネストしたオブジェクト */
(() => {
  const section3 = document.getElementById("section3")
  if(!section3){
    return
  }
  const button = section3.querySelector(".anim-button")
  const card = section3.querySelector(".card")
  const image = card.querySelector(".img")
  const name = card.querySelector(".name")
  const text = card.querySelector(".text")

  /**
   * Animates an element with the given properties.
   *
   * @param {Element} el - The element to animate.
   * @param {Object} prev - The previous properties of the element.
   * @param {Object} next - The new properties of the element.
   * @returns {void}
   *
   * @example
   * animate(element, { x: 100, y: 100, width: 200, height: 200 }, { x: 200, y: 200, width: 300, height: 300 });
   */
  const animate = (el, prev, next) => {
    el.animate([
        {
          translate: `${prev.x - next.x}px ${prev.y - next.y}px`,
          width: `${prev.width}px`,
          height: `${prev.height}px`
        },
        {
          translate: "0 0",
          width: `${next.width}px`,
          height: `${next.height}px`
        },
      ], {
        duration: 300,
        easing: "cubic-bezier(0.33, 1, 0.68, 1)"
      }
    )
  }

  button.addEventListener("click", () => {
    // 1. スタイルを取得
    const prevCard = card.getBoundingClientRect()
    const prevImage = image.getBoundingClientRect()
    const prevName = name.getBoundingClientRect()
    // 2. スタイルを変更
    card.classList.toggle("active")
    // 3. スタイルを取得
    const nextCard = card.getBoundingClientRect()
    const nextImage = image.getBoundingClientRect()
    const nextName = name.getBoundingClientRect()
    // 4. アニメーションを適用
    animate(card, prevCard, nextCard)
    animate(image, prevImage, nextImage)
    animate(name, prevName, nextName)
    text.animate([{opacity: 0}, {opacity: 1}], {duration: 200})
  })
})();

/* セクション4：リストのデモ */
(() => {


  const section4 = document.getElementById("section4")
  if(!section4){
    return
  }
  const inputs = section4.querySelectorAll("input[name=color]")
  inputs.forEach(input => {
    input.addEventListener("change", () => {
      const boxes = section4.querySelectorAll(".box")
      // 選択中の色を取得
      const colors  = [...inputs].filter(input => input.checked).map(input => input.value)

      // 1. スタイルを取得
      const prevMap = new Map()
      boxes.forEach((box) => {
          const id = box.dataset.id
          const style = box.getBoundingClientRect()
          prevMap.set(id, style)
        }
      )
      // 2. スタイルを変更
      boxes.forEach(box => {
        const color = box.dataset.color
        if (colors.includes(color)) {
          box.classList.remove("hidden")
        } else {
          box.classList.add("hidden")
        }
      })

      boxes.forEach(box => {
        // 3. スタイルを取得
        const next = box.getBoundingClientRect()
        const prev = prevMap.get(box.dataset.id)
        // 出現するboxはFLIPさせずにふわっと表示
        if(prev.width === 0){
          box.animate([{opacity: 0}, {opacity: 1}], {duration: 200})
          return
        }
        // 4. アニメーションを適用
        box.animate([{
          translate: `${prev.x - next.x}px ${prev.y - next.y}px`,
        },
          {
            translate: "0 0",
          },
        ], {
          duration: 400,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)"
        })
      })
    })
  })



})()
