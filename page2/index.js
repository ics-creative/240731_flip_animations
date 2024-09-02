// 並び替えのデモ
const colorCheckBoxes = document.querySelectorAll("input[name=color]")
const boxes = document.querySelectorAll(".box")

colorCheckBoxes.forEach(input => {
  input.addEventListener("change", () => {
    flip()
  })
})

const flip = () => {
  // 選択中の色を取得
  // 例：["red", "blue"]
  const colors = [...colorCheckBoxes]
    .filter(checkbox => checkbox.checked)
    .map(input => input.value);

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
    box.classList.toggle("hidden", !colors.includes(box.dataset.color));
  });

  boxes.forEach(box => {
    // 3. スタイルを取得
    const next = box.getBoundingClientRect()
    const prev = prevMap.get(box.dataset.id)
    // 出現するboxはFLIPさせずにふわっと表示
    if (prev.width === 0) {
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
}
