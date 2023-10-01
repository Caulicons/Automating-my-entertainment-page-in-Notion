const sleep = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms))

export default sleep;