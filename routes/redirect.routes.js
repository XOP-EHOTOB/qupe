const { Router } = require('express')
const Link = require('../data/Link')
const router = Router()


router.post('/get_link', async (req, res) => {
  try {
    const { from } = req.body

    const existing = await Link.findOne({ code: from })
    if (existing) return res.json({ link: existing })
    
    res.status(200).json({ link: ''})
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.get('/:code', async (req, res) => {
  try {
    const link = await Link.findOne({ code: req.params.code })

    if (link) return res.redirect(link.from)

    res.status(404).json('Ссылка не найдена')
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})


module.exports = router
