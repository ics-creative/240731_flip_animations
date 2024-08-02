/* セクション1：transformのデモ */
(() => {
  const section1 = document.getElementById("section1")
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
  const container = section2.querySelector(".container")
  const boxes = section2.querySelectorAll(".box")
  const button = section2.querySelector(".anim-button")

  button.addEventListener("click", () => {

    const prev = [...boxes].map(box => {
      // 1. スタイルを取得
      const prev = box.getBoundingClientRect()
      return prev
    })
    // 2. スタイルを変更
    container.classList.toggle("active")

    // すべてのboxに対してアニメーションを適用する
    boxes.forEach((box, index) => {
      // 3. スタイルを取得
      const next = box.getBoundingClientRect()
      // 4. アニメーションを適用
      box.animate([
          {
            translate: `${prev[index].x - next.x}px ${prev[index].y - next.y}px`,
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

let data = [
  {id: 1, color: "red"},
  {id: 2, color: "blue"},
  {id: 3, color: "green"},
  {id: 4, color: "red"},
  {id: 5, color: "blue"},
  {id: 6, color: "green"}
]
  const section4 = document.getElementById("section4")
  const addButton = section4.querySelector(".add-button")
  const container = section4.querySelector(".container")
  const inputs = section4.querySelectorAll("input[name=color]")
  inputs.forEach(input => {
    input.addEventListener("change", () => {
      const boxes = section4.querySelectorAll(".box")
      const copy = [...boxes]
      const activeColors = [...inputs].map(input => {
        if (input.checked) {
          return input.value
        }
      })
      const filtered = data.filter(d => activeColors.includes(d.color))

      // 1. スタイルを取得
      const prev = filtered.map((d, index) => {
          const id = d.id.toString()
          const box = copy.find(el => el.dataset.id === id.toString())
          if (!box) {
            return
          }
          return {
            id,
            style: box.getBoundingClientRect()
          }
        }
      ).filter(d => !!d)
      // 2. スタイルを変更
      boxes.forEach(box => {
        box.remove()
      })

      filtered.forEach(d => {
        // boxの追加 TODO 処理を切り出す
        const box = document.createElement("div")
        box.classList.add("box")
        box.setAttribute("data-color", d.color)
        box.setAttribute("data-id", d.id)
        container.appendChild(box)

        const next = box.getBoundingClientRect()
        const currentPrev = prev.find(data => data.id === d.id.toString())
        if (!currentPrev) {
          return
        }
        box.animate([{
          translate: `${currentPrev.style.x - next.x}px ${currentPrev.style.y - next.y}px`,
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

  addButton.addEventListener("click", () => {
    const boxes = section4.querySelectorAll(".box")
    const copy = [...boxes]
    // 1. スタイルを取得
    const prev = data.map((d, index) => {
        const id = d.id.toString()
        const box = copy.find(el => el.dataset.id === id)
        return {
          id,
          style: box.getBoundingClientRect()
        }
      }
    )
    // 2. スタイルを変更
    boxes.forEach(box => {
      box.remove()
    })
    // 色を設定
    const colors = ["red", "blue", "green"]
    const color = colors[Math.floor(Math.random() * colors.length)]
    const ids = data.map(d => d.id)
    const maxId = Math.max(...ids)
    data.unshift({
      id: maxId + 1,
      color
    })
    data.forEach(d => {
      // boxの追加 TODO 処理を切り出す
      const box = document.createElement("div")
      box.classList.add("box")
      box.setAttribute("data-color", d.color)
      box.setAttribute("data-id", d.id)
      container.appendChild(box)
    })
    // 3. スタイルを取得
    data.forEach((d, index) => {
        const id = d.id.toString()
        const box = [...section4.querySelectorAll(".box")].find(el => el.dataset.id === id)
        const next = box.getBoundingClientRect()
        const currentPrev = prev.find(data => data.id === id)
        if (!currentPrev) {
          return
        }
        box.animate([{
          translate: `${currentPrev.style.x - next.x}px ${currentPrev.style.y - next.y}px`,
        },
          {
            translate: "0 0",
          },
        ], {
          duration: 400,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)"
        })
      }
    )

  })
})()
