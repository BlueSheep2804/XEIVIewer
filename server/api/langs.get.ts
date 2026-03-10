import path from 'node:path'
import fs from 'node:fs'

export default eventHandler((_) => {
  const dir = path.resolve(process.cwd(), 'public/assets/lang')

  try {
    if (!fs.existsSync(dir)) {
      throw createError({
        status: 404,
        statusMessage: 'Directory not found'
      })
    }

    const files = fs.readdirSync(dir)

    const fileList = files.filter((file) => {
      const stats = fs.statSync(path.join(dir, file))
      return stats.isFile()
    }).map(file => file.split('.')[0])

    return {
      langs: fileList
    }
  } catch (error: unknown) {
    throw createError({
      status: 500,
      statusText: 'Unknown error'
    })
  }
})
