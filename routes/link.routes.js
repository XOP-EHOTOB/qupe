const { Router } = require('express')
const Link = require('../data/Link')
const router = Router()
const shortid = require('shortid');
const {check, validationResult} = require('express-validator')

router.post('/generate',  [
  check('from', 'Некорректная ссылка').isURL()
], async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Недоступный URL'
      })
    }

    const baseUrl = process.env.BASE_URL
    const { from } = req.body

    const existing = await Link.findOne({ from: from.toLowerCase() })

    if (existing) return res.json({ link: existing })
    
    let code = shortid()
    const to = baseUrl + '/' + code

    const link = new Link({ code, to, from: from.toLowerCase() })
    await link.save()

    res.status(201).json({ link })
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

module.exports = router