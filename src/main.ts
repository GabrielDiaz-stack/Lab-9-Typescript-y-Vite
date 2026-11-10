const json = '{"id":1,"name":"Hermione","scores":[95, 100, 98]}'
const invalidJson = '{"id":"uno","name":42,"scores":[95, 100]}'

function safeParse(json: string): unknown {
  try {
    return JSON.parse(json)
  } catch {
    return null
  }
}

type Student = {
  id: number
  name: string
  scores: number[]
}

function isStudent(x: unknown): x is Student {
  return (
    typeof x === "object" &&
    x !== null &&
    "id" in x &&
    typeof x.id === "number" &&
    "name" in x &&
    typeof x.name === "string" &&
    "scores" in x &&
    Array.isArray(x.scores) &&
    x.scores.every((n) => typeof n === "number")
  )
}

function average(nums: number[]): number {
  if (nums.length === 0) return 0
  return nums.reduce((sum, n) => sum + n, 0) / nums.length
}

function render(data: unknown): void {
  const app = document.getElementById("app")
  if (app === null) return

  if (isStudent(data)) {
    const title = document.createElement("h1")
    title.textContent = data.name

    const paragraph = document.createElement("p")
    paragraph.textContent = `Promedio: ${average(data.scores).toFixed(2)}`

    app.append(title, paragraph)
  } else {
    const error = document.createElement("p")
    error.className = "error"
    error.textContent = "Error: la respuesta de la API no es un Student válido"
    app.append(error)
  }
}

render(safeParse(json))
render(safeParse(invalidJson))
