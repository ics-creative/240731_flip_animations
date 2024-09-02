const container = document.querySelector(".container")
const images = container.querySelectorAll("img")
const card = document.querySelector(".card")
const cardImg = card.querySelector("img")
const popoverText = card.querySelector(".popover-text")

let currentId = null

images.forEach(image => {
  image.addEventListener("click",
    async () => {
      popoverText.classList.remove("hidden")
      currentId = image.dataset.id
      // 1. スタイルを取得
      const prev = image.getBoundingClientRect()
      // 2. スタイルを変更
      cardImg.src = image.src
      cardImg.onload = () => {
        card.classList.remove("hidden")
        // 3. スタイルを取得
        const next = cardImg.getBoundingClientRect()
        // 4. アニメーションを適用
        cardImg.animate([
          {
            translate: `${prev.x - next.x}px ${prev.y - next.y}px`,
            scale: `${prev.width / next.width} ${prev.height / next.height}`
          },
          {
            translate: `0 0`,
            scale: `1 1`
          }
        ], {
          duration: 600,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)"
        })
      }
    })
})

const close = card.querySelector(".close")
close.addEventListener("click", () => {
  popoverText.classList.add("hidden")
  // 1. スタイルを取得
  const img = [...images].find(image => image.dataset.id === currentId);
  const prev = cardImg.getBoundingClientRect()
  // 3. スタイルを取得（変更先のスタイルが確定しているので、2は省略）
  const next = img.getBoundingClientRect()
  // 4. アニメーションを適用
  const animation = cardImg.animate([
    {
      scale: `${next.width / prev.width} ${next.height / prev.height}`,
      translate: `${next.x - prev.x}px ${next.y - prev.y}px`,
    }
  ], {
    duration: 600,
    easing: "cubic-bezier(0.25, 1, 0.5, 1)"
  })
  animation.onfinish = () => {
    card.classList.add("hidden")
    cardImg.src = ""
  }
})
